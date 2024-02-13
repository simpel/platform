import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { type BlockProps } from 'components/propTypes'
import { Block } from 'enums'
import {
	type TStateId,
	type TStateInfo,
	type TStat,
} from '@diageo/designsystem'
import { type ContentBlock } from 'types'
import { type TMapWithStates } from 'components/theme/plain/MapWithStates/TMapWithStates'

export default function BlockMapWithStates({
	customComponent,
}: BlockProps<TMapWithStates>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')
	const heading = f.fields.find((field) => field.alias === 'smallTitle')?.text
	const headingRichText = f.fields.find((field) => field.alias === 'title')
		?.html

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

	const generateStates = (stateInfos: TStateInfo[]) => {
		const states: TStateId[] = []

		for (const state of stateInfos) {
			if (state.stateId) states.push(state.stateId)
		}

		return states
	}

	const generateInfo = (statesData: ContentBlock[] | undefined) => {
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

			if (stats) {
				const stateInfo: TStateInfo = {
					state,
					stats,
					disclaimers,
					stateId,
				}

				statesInfo.push(stateInfo)
			}
		}

		return statesInfo
	}

	const stateInfos = generateInfo(statesRawData)
	const defaultData = generateInfo(rawDefaultData)

	const props: TMapWithStates = {
		heading,
		headingRichText,
		stateInfos: stateInfos ?? [],
		defaultData: defaultData ? defaultData[0] : undefined,
	}

	if (stateInfos) {
		props.states = generateStates(stateInfos)
	}

	return getComponent<TMapWithStates>(
		Block.BlockMapWithStates,
		props,
		componentIdentifier,
		customComponent,
	)
}
