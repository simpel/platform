import process from 'process'
import crypto from 'crypto'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { type TCsrf } from 'lib/session/withSession/TWithSession'
import { withSession } from 'lib/session/withSession/withSession'

const handler = async (
	request: NextApiRequest,
	response: NextApiResponse<TCsrf>,
) => {
	if (request.session.csrfToken) {
		response.status(200).json({ csrfToken: request.session.csrfToken })
		return
	}

	const csrfToken = `${crypto.randomBytes(12).toString('hex')}_${process.env
		.NEXT_CSRF_SECRET!}`

	request.session.csrfToken = csrfToken
	await request.session.save()

	response.status(200).json({ csrfToken })
}

export default withSession(handler)
