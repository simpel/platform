import { type TCarousel, Carousel, Container } from '@diageo/designsystem'
import React from 'react'
import { getClassName } from '@diageo/utils'
import classes from './Carousel.module.scss'

const CarouselBlock = ({ ...props }: TCarousel) => {
	return (
		<div className={classes.carousel}>
			{props.backgroundTheme ? (
				<div
					className={getClassName(
						classes['carousel--bg'],
						classes[`carousel--bg-${props.backgroundTheme.toLowerCase()}`],
					)}
				>
					<Container className={classes.container}>
						<Container.Col>
							<Carousel {...props} />
						</Container.Col>
					</Container>
				</div>
			) : (
				<Container className={classes.container}>
					<Container.Col>
						<Carousel {...props} />
					</Container.Col>
				</Container>
			)}
		</div>
	)
}

export default CarouselBlock
