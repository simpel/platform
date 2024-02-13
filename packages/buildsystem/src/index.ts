
import {glob} from "glob"
import { extname, relative } from 'path'
import { InputOption } from "rollup"
import gradient from 'gradient-string'
import { BuildOptions, CSSOptions, PluginOption } from "vite"
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import postcssNested from 'postcss-nested'


/**
 * Retrieves the entry points for Rollup based on the provided path.
 * 
 * @param absolutePath - The path to search for entry points.
 * @param sourceFolder - The folder to use as the root for the entry points.
 * @returns An array of entry points, where each entry point is represented by an array containing the relative path and the resolved file path.
 */

const truncatedString = (str: string, length: number = 30) => {
  return str.length > length ? '....' + str.slice(-length) : str;
}

export const getBuildOptions = (absolutePath: string, sourceFolder: string = "src"): BuildOptions => {

	//doing replace here to prevent non POSIX paths from breaking glob
	const indexFiles = glob.sync(absolutePath.replace(/\\/g, '/'))
	const entries: InputOption = {}
	
	indexFiles.forEach((file) => { 
		const alias = relative(sourceFolder, file.slice(0, file.length - extname(file).length))
		entries[alias] = file
	})

	console.info(gradient('red', 'orange', 'yellow', 'green', 'blue', 'purple')(`🚪 Entrypoints for ${truncatedString(absolutePath)}:`), indexFiles.length, "\n");

	return {
		minify: true,
		lib: {
			entry: entries,
			formats: ['es'],
		},
		rollupOptions: {
			output: {
				entryFileNames: '[name].js',
				assetFileNames: 'assets/[name][extname]',
			},
			external: ['react', 'react/jsx-runtime'],
		},
	}
};
	
export const getCssOptions = (): CSSOptions => { 
	return {
		postcss: {
			plugins: [postcssNested()],
		},
	}

}

export const getPluginOptions = ():PluginOption[] => { 
	return [
		react(),
		dts({ include: ['src'] }),
		libInjectCss(),
		viteStaticCopy({
			targets: [
				{
					src: './assets',
					dest: './',
				},
			],
		}),
	]
}