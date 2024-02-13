import { DocumentNode } from 'graphql'
import { rawRequest } from 'graphql-request'

import { CmsEnv } from 'types'

const getGqlString = (doc: DocumentNode) => doc.loc && doc.loc.source.body

/**
 * Call the Realm GraphQL API
 * @param query GQL query
 * @param cmsEnv Preview vs Published/Production environment switch
 */
export default async function request<T>(
	query: DocumentNode,
	cmsEnv: CmsEnv = 'published',
	variables = {},
): Promise<T> {
	let apiUrl: string
	let apiKey = ''
	if (typeof window === 'undefined') {
		if (!process.env.API_URL || !process.env.API_KEY) {
			throw new Error(
				'Required environment variables are not found, please make sure you have the .env.locale file with the correct variables',
			)
		}
		if (
			cmsEnv === 'preview' &&
			(!process.env.API_URL_PREVIEW || !process.env.API_KEY_PREVIEW)
		) {
			throw new Error(
				'Environment variables are not found for preview environment, please make sure you have them in the .env.locale file',
			)
		}

		apiUrl =
			(cmsEnv === 'preview'
				? process.env.API_URL_PREVIEW
				: process.env.API_URL) || ''
		apiKey =
			(cmsEnv === 'preview'
				? process.env.API_KEY_PREVIEW
				: process.env.API_KEY) || ''
	} else {
		apiUrl = '/api/graphql'
	}

	const preparedQuery = getGqlString(query) || ''

	const { data, status } = await rawRequest(apiUrl, preparedQuery, undefined, {
		apiKey: apiKey,
	})
	data.httpStatus = status

	return data
}

export async function requestCorp<T>(query: DocumentNode): Promise<T> {
	let apiUrl: string
	let apiKey = ''

	if (typeof window === 'undefined') {
		apiUrl = process.env.API_CORP_URL ? process.env.API_CORP_URL : ''
		apiKey = process.env.API_CORP_KEY ? process.env.API_CORP_KEY : ''
	} else {
		apiUrl = '/api/graphqlCorp'
	}
	// console.log('requestCorp: ', apiUrl)

	const preparedQuery = getGqlString(query) || ''

	const { data, status } = await rawRequest(apiUrl, preparedQuery, undefined, {
		apiKey: apiKey,
	})
	data.httpStatus = status

	return data
}
