import process from 'process'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Cookies from 'js-cookie'

import { type TCredentials, type TUseLogin } from './TUseLogin'

export const useLogin = (): TUseLogin => {
	const router = useRouter()
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>()
	const isAuthEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED
		? process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'
		: true

	const isLoggedIn = () => {
		return isAuthEnabled ? Boolean(Cookies.get('DIAGEO_ISLOGGEDIN')) : true
	}

	const authenticate = () => {
		Cookies.set('DIAGEO_ISLOGGEDIN', 'true', {
			sameSite: 'strict',
			expires: 7,
			secure: true,
		})
		setSuccess(true)
		setError(undefined)
	}

	const login = async (values: TCredentials) => {
		const user = process.env.NEXT_PUBLIC_AUTH_USER ?? 'user'
		const pass = process.env.NEXT_PUBLIC_AUTH_PASS ?? 'password'

		if (values.username === user && values.password === pass) {
			authenticate()
			await router.replace(window.location.pathname)
		} else {
			setSuccess(false)
			setError('Invalid username or password')
			Cookies.remove('DIAGEO_LOGGEDIN')
		}
	}

	return {
		error,
		success,
		login,
		isLoggedIn: isLoggedIn(),
	}
}
