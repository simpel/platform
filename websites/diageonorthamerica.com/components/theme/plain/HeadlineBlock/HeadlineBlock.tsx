import { Headline, Container } from '@diageo/designsystem'
import React from 'react'
import { getClassName } from '@diageo/utils'
import classes from './HeadlineBlock.module.scss'
import { type THeadlineBlock } from './THeadlineBlock'

const HeadlineBlock = (props: THeadlineBlock) => {
	return (
		<div
			className={getClassName(
				classes.headline,
				classes[`headline--bg-${props.background?.toLowerCase()}`],
			)}
		>
			<Container>
				<Container.Col>
					<Headline {...props} />
				</Container.Col>
			</Container>
		</div>
	)
}

export default HeadlineBlock
