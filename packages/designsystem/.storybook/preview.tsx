import React from 'react'
import { Preview } from '@storybook/react'


export const decorators = [
	(Story) => (

			<Story />

	),
]

export const preview: Preview = {
	parameters: {
		layout: "fullscreen",
		controls: { expanded: true },
	},
}
