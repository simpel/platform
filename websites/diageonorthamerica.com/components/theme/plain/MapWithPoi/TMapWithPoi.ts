import { type TStateId, type TPoi, type TStateInfo } from '@diageo/designsystem'

export type TMapWithPoiPayload = {
	stateId: TStateId
	supplyPlantName: string
}

export type TMapWithPoi = {
	pois?: TPoi[]
	stateInfos?: TStateInfo[]
	states?: TStateId[]
	heading?: string
	headingRichText?: string
	defaultData?: TStateInfo
}
