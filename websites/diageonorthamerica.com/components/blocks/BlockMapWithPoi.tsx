import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	type TMapSupplyPlantPayLoad,
	type BlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import {
	type TStateId,
	type TPoi,
	type TStateInfo,
	type TStat,
} from '@diageo/designsystem'
import { type ContentBlock, type Media } from 'types'
import { type TMapWithPoi } from 'components/theme/plain/MapWithPoi/TMapWithPoi'
import { usePages } from 'context/pages'

export default function BlockMapWithPoi({
	customComponent,
}: BlockProps<TMapWithPoi>) {
	const [f] = useFields()
	const [{ page }] = usePages()

	const componentIdentifier = f.text('componentIdentifier')
	const heading = f.fields.find((field) => field.alias === 'smallTitle')?.text
	const headingRichText = f.fields.find((field) => field.alias === 'title')
		?.html

	const poiRawData = f.fields.find(
		(field) => field.alias === 'pointsOfInterest',
	)?.blocks

	const statesRawData = f.fields.find((field) => field.alias === 'states')
		?.blocks

	const rawDefaultData = f.fields.find((field) => field.alias === 'defaultData')
		?.blocks

	const createDisclaimers = (disclaimersData: ContentBlock[]): string[] => {
		const disclaimers: string[] = []

		for (const disclaimerData of disclaimersData) {
			if (disclaimerData.contentType === 'mapRichText') {
				const text = disclaimerData.fields.find(
					(field) => field.alias === 'text',
				)?.html

				if (text) disclaimers.push(text)
			}
		}

		return disclaimers
	}

	const createStats = (statsData: ContentBlock[]): TStat[] | undefined => {
		const stats: TStat[] = []

		for (const statData of statsData) {
			if (statData.contentType === 'mapStatistic') {
				const prefix = statData.fields.find((field) => field.alias === 'prefix')
					?.text

				const stat = statData.fields.find((field) => field.alias === 'stat')
					?.text

				const suffix = statData.fields.find((field) => field.alias === 'suffix')
					?.text
				const description = statData.fields.find(
					(field) => field.alias === 'description',
				)?.text

				if (stat) {
					stats.push({
						stat,
						description,
						prefix,
						suffix,
					})
				}
			}
		}

		return stats.length > 0 ? stats : undefined
	}

	const createImage = (data: ContentBlock[]): Media | undefined => {
		const mediaItem = data?.find((f) => f.contentType === 'mapImage')?.fields[0]
			?.mediaList?.[0]

		const image = page.referencedMedia?.find(
			(refMedia) => refMedia._id === mediaItem?._id,
		)

		return image
	}

	const generateStates = (stateInfos: TStateInfo[]): TStateId[] => {
		const states: TStateId[] = []

		for (const state of stateInfos) {
			if (state.stateId) states.push(state.stateId)
		}

		return states
	}

	const generateInfo = (
		statesData: ContentBlock[] | undefined,
	): TStateInfo[] | undefined => {
		if (statesData === undefined) return undefined

		const statesInfo: TStateInfo[] = []

		for (const stateData of statesData) {
			const stateId = stateData.fields.find((field) => field.alias === 'state')
				?.text as TStateId

			const state = stateData.fields.find((field) => field.alias === 'title')!
				.text!

			const content = stateData.fields.find(
				(field) => field.alias === 'content',
			)!.blocks!

			const stats = createStats(content)
			const disclaimers = createDisclaimers(content)
			const image = createImage(content)

			if (stats) {
				const stateInfo: TStateInfo = {
					state,
					stats,
					disclaimers,
					stateId,
					image,
				}

				statesInfo.push(stateInfo)
			}
		}

		return statesInfo
	}

	const createPoiProps = (poiRawData: ContentBlock[] | undefined) => {
		if (poiRawData === undefined) return undefined

		const pois: Array<TPoi<TMapSupplyPlantPayLoad>> = []

		for (const [index, poiData] of poiRawData.entries()) {
			const stateId = poiData.fields.find((field) => field.alias === 'state')!
				.text as TStateId

			const supplyPlantName =
				poiData.fields.find((field) => field.alias === 'title')!.text ?? ''

			const positionX =
				poiData.fields.find((field) => field.alias === 'positionX')!.number ?? 0

			const positionY =
				poiData.fields.find((field) => field.alias === 'positionY')!.number ?? 0

			pois.push({
				id: `poi_${stateId}_${index}`,
				payload: {
					stateId,
					supplyPlantName,
				},
				position: {
					top: `${positionY}%`,
					left: `${positionX}%`,
				},
			})
		}

		return pois
	}

	const stateInfos = generateInfo(statesRawData)
	const defaultData = generateInfo(rawDefaultData)

	const props: TMapWithPoi = {
		heading,
		headingRichText,
		stateInfos,
		defaultData: defaultData ? defaultData[0] : undefined,
	}

	if (stateInfos) {
		props.states = generateStates(stateInfos)
		props.pois = createPoiProps(poiRawData)
	}

	return getComponent<TMapWithPoi>(
		Block.BlockMapWithPoi,
		props,
		componentIdentifier,
		customComponent,
	)
}
