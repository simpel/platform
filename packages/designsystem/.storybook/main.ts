import { dirname, join, resolve } from 'path'

function getAbsolutePath(value) {
	return dirname(require.resolve(join(value, 'package.json')))
}

const config = {
	stories: ['../**/*.stories.tsx', '../**/*.stories.ts'],
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('storybook-addon-pseudo-states'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-console'),
		getAbsolutePath('@storybook/preset-scss'),
	],
	docs: {
		autodocs: 'tag',
		defaultName: 'Documentation',
	},
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},

	core: {},

	async viteFinal(config, { configType }) {
		// customize the Vite config here
		return {
			...config,
			define: { 'process.env': {} },
		}
	},
}

export default config
