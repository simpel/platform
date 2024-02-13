import { DateTime } from 'luxon'
import { VipObject } from './types'

const cache: Map<
	string,
	{
		data: string
		timestamp: Date
	}
> = new Map()

export function setCache(key: string, data: VipObject[]) {
	cache.set(key, {
		data: JSON.stringify(data),
		timestamp: new Date(),
	})
}

export function getCache(key: string) {
	const saved = cache.get(key)

	if (!saved || !saved.timestamp) {
		console.info('No cache for', key)
		return null
	}

	const savedAt = DateTime.fromJSDate(saved.timestamp)
	const { days } = DateTime.now().diff(savedAt, 'days').toObject()

	if (!days || days > 1) {
		console.info('Cache expired for', key)
		return null
	}

	return JSON.parse(saved.data) as VipObject[]
}
