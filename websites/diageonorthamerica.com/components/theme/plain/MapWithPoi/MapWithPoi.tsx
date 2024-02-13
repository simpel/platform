import { useState } from 'react'
import {
	type TStateId,
	StateInfo,
	NorthAmericaMap,
	type TNorthAmericaMapChangeEventData,
} from '@diageo/designsystem'
import { getClassName } from '@diageo/utils'
import Image from 'next/image'
import { type TMapWithPoiPayload, type TMapWithPoi } from './TMapWithPoi'
import classes from './MapWithPoi.module.scss'

const MapWithPoi = ({
	heading,
	headingRichText,
	pois,
	stateInfos,
	states,
	defaultData,
}: TMapWithPoi) => {
	const [currentStateId, setCurrentStateId] = useState<TStateId>()
	const [currentPoi, setCurrentPoi] = useState<string>()
	const hasRichTextHeading = Boolean(headingRichText)
	const currentStateInfoData =
		stateInfos?.find((stateInfo) => stateInfo.stateId === currentStateId) ??
		defaultData

	return (
		<section
			className={getClassName(
				classes.root,
				hasRichTextHeading ? classes.hasRichTextHeading : '',
			)}
		>
			<div className={classes.bg} />

			{hasRichTextHeading && (
				<div className={classes.heading}>
					<div className={classes.container}>
						<div className={getClassName(classes.headingWrapper, 'h1')}>
							{heading && <div className={classes.subHeading}>{heading}</div>}
							<div
								dangerouslySetInnerHTML={{ __html: headingRichText! }}
								className={classes.mainHeading}
							/>
						</div>
					</div>
				</div>
			)}

			<div className={getClassName(classes.container, classes.grid)}>
				<div className={classes.map}>
					<NorthAmericaMap
						selectableStates={states}
						pois={pois}
						onChange={(
							data: TNorthAmericaMapChangeEventData<TMapWithPoiPayload>,
						) => {
							setCurrentStateId(data.stateId)
							setCurrentPoi(data.payload?.supplyPlantName)
						}}
					/>
				</div>

				{currentStateInfoData && (
					<div className={classes.info}>
						<StateInfo
							{...currentStateInfoData}
							localization={currentPoi}
							showPinWithStateBadge={!currentPoi}
							imageEl={
								currentPoi &&
								currentStateInfoData.image && (
									<Image
										fill
										src={`${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${currentStateInfoData.image?.url}`} // eslint-disable-line n/prefer-global/process
										alt={currentStateInfoData.image?.alt ?? ''}
										style={{
											objectPosition: 'center',
											objectFit: 'cover',
										}}
									/>
								)
							}
						/>
					</div>
				)}
			</div>
		</section>
	)
}

export default MapWithPoi
