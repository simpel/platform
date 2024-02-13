/* eslint-disable unicorn/prefer-module */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import {
	getBuildOptions,
	getPluginOptions,
	getCssOptions,
} from '@diageo/buildsystem'

const build = getBuildOptions(resolve(__dirname, 'src/**/index.ts'))
const plugins = getPluginOptions()
const css = getCssOptions()

export default defineConfig({
	plugins,
	mode: 'production',
	publicDir: false,
	css,
	build,
})
