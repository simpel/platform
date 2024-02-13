import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'
import { type TBadge } from './TBadge'

const meta: Meta<typeof Badge> = {
	component: Badge,
	tags: ['autodocs', 'nam', 'badge', 'atoms'],
	title: 'Atoms/Badge',
}

export default meta

export const Default: StoryObj<typeof Badge> = {
	render: (properties: TBadge) => <Badge {...properties} />,
	args: {
		label: 'Badge texts',
	},
}
