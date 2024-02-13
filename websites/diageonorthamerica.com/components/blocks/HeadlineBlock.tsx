import { type THeadline, Headline, Container } from '@diageo/designsystem'
import React from 'react'

const HeadlineBlock = ({ ...props }: THeadline) => {
	return (
		<Container>
			<Container.Col>
				<Headline {...props} />
			</Container.Col>
		</Container>
	)
}

export default HeadlineBlock
