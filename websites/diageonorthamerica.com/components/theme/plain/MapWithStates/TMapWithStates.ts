import { type TStateId, type TPoi, type TStateInfo } from '@diageo/designsystem'

export type TMapWithStates = {
	pois?: TPoi[]
	stateInfos?: TStateInfo[]
	states?: TStateId[]
	heading?: string
	headingRichText?: string
	defaultData?: TStateInfo
}
