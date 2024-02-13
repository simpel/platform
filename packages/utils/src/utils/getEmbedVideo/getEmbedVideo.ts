import { type TEmbedVideoProviders } from './TGetEmbedVideo'

export const getEmbedVideoProvider = (src: string): TEmbedVideoProviders => {
	if (src.includes('vimeo.com')) return 'vimeo'
	if (src.includes('youtu.be') || src.includes('youtube.com')) return 'youtube'

	return 'custom'
}

export const getEmbedVideoUrl = (
	src: string,
	provider: TEmbedVideoProviders,
) => {
	switch (provider) {
		case 'youtube': {
			if (src.includes('youtube.com/embed')) return src
			// https://regex101.com/r/OY96XI/1
			const regex =
				/(?:https?:)?(?:\/\/)?(?:[\da-z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/

			const id = regex.exec(src)?.[1]
			if (!id) return src

			return `https://www.youtube.com/embed/${id}`
		}

		case 'vimeo': {
			if (src.includes('player.vimeo.com')) return src
			const id = src.split('.com/')[1]

			return `https://player.vimeo.com/video/${id}`
		}

		default: {
			return src
		}
	}
}

export const getEmbedVideo = (src: string) => {
	const provider = getEmbedVideoProvider(src)
	const url = provider === 'custom' ? src : getEmbedVideoUrl(src, provider)

	return { provider, url }
}
