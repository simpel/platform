import { EPageTypes } from '../pageTypes/EPageTypes'

const DEFAULT_LIFE_TIME = 30 // = 60 mins (3600s)
const customLifeTime = {
	[EPageTypes.LOCALE]: 30,
	[EPageTypes.HOMEPAGE]: 30,
	[EPageTypes.PRESSRELEASELANDINGPAGE]: 30,
	[EPageTypes.PRESSRELEASEPAGE]: 30,
	[EPageTypes.PRESSRELEASEYEARPAGE]: 30,
}

export const getRevalidateInterval = (pageType: string): number =>
	(customLifeTime[pageType] as number) || DEFAULT_LIFE_TIME
