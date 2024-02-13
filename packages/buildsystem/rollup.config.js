/**
 *
 * This file is used to build the rollup package used by, for example, the designsystem package.
 */

import terser from '@rollup/plugin-terser'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

const config = defineConfig({
	input: 'src/index.ts', // Path to your main JavaScript file
	output: {
		file: 'dist/index.js', // Output file inside the dist folder
		format: 'esm', // CommonJS format, you can change this to 'esm' for ES modules
		sourcemap: true, // Include sourcemaps for better debugging
	},
	external: ['glob', 'path', 'node:url', 'gradient-string'],
	plugins: [terser(), typescript()],
})

export default config
