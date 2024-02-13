type Option = {
	label: string
	id: string
	selected: boolean
	disabled?: boolean
}

type Label = {
	text?: string
	className?: string
}

type DropdownType = {
	options: Option[]
	label?: Label
	helpText?: string
	id?: string
}

export type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> &
	DropdownType
