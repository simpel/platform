import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string) => {
	const getMatches = (query: string) => {
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches
		}

		return false
	}

	const [isMatching, setIsMatching] = useState(getMatches(query))
	const [isRendered, setIsRendered] = useState(false)

	const handleChange = () => {
		setIsMatching(getMatches(query))
	}

	useEffect(() => {
		const matchMedia = window.matchMedia(query)

		handleChange()

		if (!isRendered) setIsRendered(true)

		matchMedia.addEventListener('change', handleChange)

		return () => {
			matchMedia.removeEventListener('change', handleChange)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	return isRendered && isMatching
}
