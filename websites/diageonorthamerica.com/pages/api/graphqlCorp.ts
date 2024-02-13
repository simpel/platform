import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'cross-fetch'

const restrictedClauses = [
	'__schema',
	'__directive',
	'__directiveLocation',
	'__type',
	'__field',
	'__inputValue',
	'__enumValue',
	'__typeKind',
	'__Schema',
	'__Directive',
	'__DirectiveLocation',
	'__Type',
	'__Field',
	'__InputValue',
	'__EnumValue',
	'__TypeKind',
]

const isForbiddenClause = (body: string) =>
	restrictedClauses.some((clause) => body.includes(clause))

export default async function handlerCorp(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { body } = req
		const stringifiedBody = JSON.stringify(body)
		const isQueryForbidden = isForbiddenClause(stringifiedBody)
		if (isQueryForbidden) {
			return res.status(400).send(null)
		}
		const gqlRes = await fetch(process.env.API_CORP_URL || '', {
			method: 'POST',
			headers: {
				apiKey: process.env.API_CORP_KEY || '',
			},
			body: stringifiedBody,
		})
		const data = await gqlRes.json()
		// data.queryInfo = { isQueryForbidden, stringifiedBody }
		res.status(200).json(data)
	} catch (err) {
		console.error(err)
		res.status(400).send(null)
	}
}
