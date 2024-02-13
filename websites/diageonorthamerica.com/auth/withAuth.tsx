import { Login } from 'components/login/Login'
import { useLogin } from 'hooks/useLogin/useLogin'

export const withAuth = (BaseComponent) => {
	const Component = (props) => {
		const { isLoggedIn } = useLogin()

		const isAuthEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED
			? process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'
			: true

		if (isAuthEnabled) {
			return isLoggedIn ? <BaseComponent {...props} /> : <Login />
		}

		return <BaseComponent {...props} />
	}

	return Component
}
