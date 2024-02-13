import process from 'process'
import { withIronSessionApiRoute } from 'iron-session/next'
import { type IronSessionOptions } from 'iron-session'
import { type NextApiHandler } from 'next'

const options: IronSessionOptions = {
	cookieName: 'csrf',
	password: process.env.NEXT_SESSION_SECRET!,
	ttl: 3600,
	// Secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	cookieOptions: {
		secure: true, // Use HTTPS only
		httpOnly: true, // Prevent client-side access to cookie
		sameSite: 'strict', // Prevent cross-site request forgery
	},
}

export function withSession(handler: NextApiHandler) {
	return withIronSessionApiRoute(handler, options)
}

declare module 'iron-session' {
	// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/consistent-type-definitions
	interface IronSessionData {
		csrfToken: string
	}
}
