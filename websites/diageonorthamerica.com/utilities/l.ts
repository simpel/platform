/* eslint-disable @typescript-eslint/no-unsafe-argument */

import process from 'process'

const time = new Date(Date.now())
const isDev = process.env.NODE_ENV === 'development'

const l = (...logs: any[]) => {
	if (!isDev) return

	console.log(...logs)
}

l.warn = (...logs: any[]) => {
	if (!isDev) return
	console.warn(...logs)
}

l.table = (...logs: any[]) => {
	if (!isDev) return
	console.table([...logs])
}

l.error = (...logs: any[]) => {
	if (!isDev) return
	console.error(...logs)
}

l.info = (...logs: any[]) => {
	if (!isDev) return
	console.info(...logs)
}

export default l
