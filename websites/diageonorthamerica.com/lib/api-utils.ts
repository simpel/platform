import { NextApiRequest, NextApiResponse } from 'next'

export function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: (...args: unknown[]) => unknown,
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: unknown) => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}
