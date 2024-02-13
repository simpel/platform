import { useState } from 'react'
import {
	StateInfo,
	NorthAmericaMap,
	type TNorthAmericaMapChangeEventData,
	RichTextTitle,
} from '@diageo/designsystem'
import { getClassName } from '@diageo/utils'
import { type TMapWithStates } from './TMapWithStates'
import classes from './MapWithStates.module.scss'

const MapWithStates = ({
	heading,
	headingRichText,
	stateInfos,
	states,
	defaultData,
}: TMapWithStates) => {
	const [currentStateId, setCurrentStateId] = useState(defaultData?.stateId)
	const currentStateInfoData =
		stateInfos?.find((stateInfo) => stateInfo.stateId === currentStateId) ??
		defaultData

	return (
		<section className={getClassName(classes.root)}>
			<div className={getClassName(classes.container, classes.grid)}>
				{headingRichText && (
					<div className={getClassName(classes.heading)}>
						<span className={classes.headingCaption}>{heading}</span>
						<RichTextTitle html={headingRichText} className="h1" />
					</div>
				)}

				<div className={classes.map}>
					<NorthAmericaMap
						selectableStates={states}
						onChange={({ stateId }: TNorthAmericaMapChangeEventData) => {
							setCurrentStateId(stateId)
						}}
					/>
				</div>

				{currentStateInfoData && (
					<div className={classes.info}>
						<StateInfo showPinWithStateBadge {...currentStateInfoData} />
					</div>
				)}
			</div>
		</section>
	)
}

export default MapWithStates
