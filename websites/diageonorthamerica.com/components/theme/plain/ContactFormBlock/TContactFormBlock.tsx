import { type ReactElement } from 'react'

export type TFormWrapper = {
	children: ReactElement<HTMLDivElement>
	completedText: string
	isSent: boolean
}

export type TContactFormTargetItem = {
	option: string
	emailTargets: string
}

export type TContactFormBlock = {
	introText: string
	completedText: string
	targets: TContactFormTargetItem[]
	csrfToken: string
}

type TFieldStatus = {
	isValid: boolean

	value: string | undefined
}

export type TFieldValidator = {
	contactName: TFieldStatus
	areaOfInterest: TFieldStatus
	fromEmail: TFieldStatus
	subject: TFieldStatus
	message: TFieldStatus
}
