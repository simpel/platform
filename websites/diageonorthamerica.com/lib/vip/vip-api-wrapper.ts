/**
 * ################################################
 * ## Server-side library for VIP product finder ##
 * ################################################
 */
import fetch from 'node-fetch'
import { stringify } from 'querystring'
import { sha256 } from 'js-sha256'
import { parseStringPromise } from 'xml2js'
import { DateTime } from 'luxon'

import { VipObject, VipSearchParams } from './types'
import { getCache, setCache } from './cache'

if (typeof window !== 'undefined')
	throw new Error('VIP library must be used server side only!')

// TODO: GET custId and secret from CMS
// console.log('TODO: GET custId and secret from CMS')
const config = {
	custId: '',
	secret: '',
	brandAction: 'category3',
	variantsAction: 'category2',
	searchAction: 'results',
	searchCategory: 'category2',
}

export async function getVariants() {
	const key = 'variants'
	const cached = getCache(key)
	if (cached) return cached

	return vipRequest({
		action: config.variantsAction,
	})
		.then((res) => parseResponse(res, 'categories', 'category'))
		.then(parseVipValues)
		.then((res) => {
			setCache(key, res)
			return res
		})
		.catch((err) => {
			console.error(err)
			return []
		})
}

export async function searchVariant(params: VipSearchParams) {
	const { variant, ...rest } = params

	return vipRequest({
		action: config.searchAction,
		[config.searchCategory]: variant,
		...rest,
	}).then((res) => parseResponse(res, 'locations', 'location'))
}

/**
 * Parses the response from the VIP to extract the results data which should be an array
 * @param res response from the api
 * @param domain The domain (category or results) for extracting data from the XML response
 * @param target The target object that is the child of the domain
 * @param key custId
 * @returns An arraywith the parsed values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseResponse(res: any, domain: string, target: string, key?: string) {
	let results: string[]
	if (
		!res ||
		!res.result ||
		!res.result[domain] ||
		!res.result[domain][target]
	) {
		return []
	}

	if (Array.isArray(res.result[domain][target])) {
		results = res.result[domain][target]
	} else {
		results = [res.result[domain][target]]
	}

	if (domain === 'locations') {
		return results
	}

	if (!key) {
		return results.map((vipName) => ({ vipName }))
	} else {
		return results.map((vipName) => ({ vipName, key }))
	}
}

export function parseVipValues(
	vipNames: { vipName: string; key?: string }[],
	filterUnique?: boolean,
) {
	if (!vipNames || !Array.isArray(vipNames)) return []
	return (
		vipNames
			.filter((n) => n && n.vipName)
			.map(
				({ vipName, key }) =>
					({
						name: vipName.split(' (')[0], // format ugly strings
						vip: vipName,
						key,
						slug: '',
					}) as VipObject,
			)
			// Add slug
			.map((vipObject) =>
				Object.assign({}, vipObject, {
					slug: vipObject.name.replace(/\s/g, '-').toLowerCase(),
				}),
			)
			.map((vipObject, _i, arr) => {
				if (filterUnique) {
					const brandAlternatives = arr.filter((b) => b.slug === vipObject.slug)
					vipObject.vipBrands = brandAlternatives
						.map((b) => b.vip)
						.filter((v, i, a) => a.indexOf(v) === i) // no duplicates
				}
				return vipObject
			})
			// TODO add uniqueBy
			.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
	)
}

async function vipRequest(data: { [k: string]: string | number | undefined }) {
	const { secret, custId } = config
	// Timestamp in special format: Thu, 13 May 2021 11:57:00 GMT
	const timestamp: string =
		DateTime.now().setZone('gmt').toFormat('ccc, d MMM yyyy HH:mm:00') + ' GMT'
	const signature: string = timestamp + secret + stringify(data) + custId
	const hash: string = sha256(signature)

	const headers: { [key: string]: string } = {
		vipCustID: custId,
		vipTimestamp: timestamp,
		vipSignature: hash,
	}

	return (
		fetch(
			`https://www.vtinfo.com/PF/product_finder-service.asp?${stringify(data)}`,
			{
				method: 'post',
				headers,
			},
		)
			.then((res) => res.text())
			// .then((res) => {
			//   console.log(res)
			//   return res
			// })
			.then((res) =>
				parseStringPromise(res, {
					explicitArray: false,
					ignoreAttrs: false,
				}),
			)
	)
}
