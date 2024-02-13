export type TCredentials = {
	username: string
	password: string
}

export type TUseLogin = {
	success: boolean
	error?: string
	login: (values: TCredentials) => void
	isLoggedIn: boolean
}
