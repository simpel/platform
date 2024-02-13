/* eslint-disable unicorn/prefer-module */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { getBuildOptions, getPluginOptions } from '@platform/buildsystem'

const build = getBuildOptions(resolve(__dirname, 'src/**/index.ts'))
const plugins = getPluginOptions()

export default defineConfig({
	plugins,
	mode: 'production',
	publicDir: false,
	build,
})
