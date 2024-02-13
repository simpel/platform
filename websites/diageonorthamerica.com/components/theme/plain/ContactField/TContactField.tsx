export type TContactField = {
	label?: string
	name: string
	id: string
	initalValue?: string
	validation?: RegExp
	type: 'textarea' | 'text' | 'email' | 'hidden'
	isNotValidMessage?: string
	onChange: (key: string, value: string, isValid: boolean) => void
}
