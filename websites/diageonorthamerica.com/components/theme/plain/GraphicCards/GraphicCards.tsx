import React from 'react'
import Heading from 'components/theme/plain/Heading'
import { AnimatedBars, Container, GraphicCard } from '@diageo/designsystem'
import { HeadingLevel } from 'enums'
import { getClassName } from '@diageo/utils'
import classes from './GraphicCards.module.scss'
import { type TGraphicCards } from './TGraphicCards'

const GraphicCards = ({
	smallText,
	heading,
	top,
	middle,
	bottom,
}: TGraphicCards) => {
	return (
		<Container>
			<Container.Col>
				<div className={classes.graphicCards}>
					<div className={classes.graphicCards__headingWrapper}>
						{smallText && <h2 className="h4">{smallText}</h2>}
						<Heading heading={heading} headingLevel={HeadingLevel.H3} />
					</div>
					{top && (
						<div className={classes.graphicCards__levelTopGrid}>
							<div className={classes.graphicCards__levelTopImageWrapper}>
								<img
									className={classes.graphicCards__levelImage}
									{...top.image}
								/>
							</div>
							<div className={classes.graphicCards__levelTopCard}>
								<GraphicCard {...top?.card} />
							</div>
						</div>
					)}
					<div className={classes.graphicCards__levelMiddleGrid}>
						<AnimatedBars
							className={classes.graphicCards__barsTop}
							bars={[
								<AnimatedBars.Bar
									key={0}
									className={getClassName(
										classes.graphicCards__bar,
										classes['graphicCards__bar--wide'],
										classes['graphicCards__bar--medium'],
									)}
									background="linear-gradient(360deg, #F2D56F 10.74%, #B7E5EC 78.86%)"
								/>,
								<AnimatedBars.Bar
									key={1}
									className={getClassName(
										classes.graphicCards__bar,
										classes['graphicCards__bar--thin'],
										classes['graphicCards__bar--large'],
									)}
									background="linear-gradient(180deg, #B7E5EC 10.74%, #64B0C6 78.86%)"
								/>,
							]}
						/>
						<AnimatedBars
							className={classes.graphicCards__barsBottom}
							bars={[
								<AnimatedBars.Bar
									key={0}
									className={getClassName(
										classes.graphicCards__bar,
										classes['graphicCards__bar--thin'],
										classes['graphicCards__bar--small'],
									)}
									background="linear-gradient(180deg, #B7E5EC 10.74%, #64B0C6 78.86%)"
								/>,
								<AnimatedBars.Bar
									key={1}
									className={getClassName(
										classes.graphicCards__bar,
										classes['graphicCards__bar--wide'],
										classes['graphicCards__bar--medium'],
									)}
									background="linear-gradient(360deg, #F2D56F 10.74%, #B7E5EC 78.86%)"
								/>,
								<AnimatedBars.Bar
									key={2}
									className={getClassName(
										classes.graphicCards__bar,
										classes['graphicCards__bar--thin'],
										classes['graphicCards__bar--large'],
									)}
									background="linear-gradient(180deg, #B7E5EC 10.74%, #64B0C6 78.86%)"
								/>,
							]}
						/>
						<div className={classes.graphicCards__levelMiddleCards}>
							{middle.cards.map((card, index) => (
								<div
									key={index}
									className={classes.graphicCards__levelMiddleCard}
								>
									<GraphicCard {...card} />
								</div>
							))}
						</div>
						<div className={classes.graphicCards__levelMiddleImageWrapper}>
							<img
								className={classes.graphicCards__levelImage}
								{...middle.image}
							/>
						</div>
					</div>
					<div className={classes.graphicCards__levelBottomGrid}>
						<div className={classes.graphicCards__levelBottomImageWrapper}>
							<img
								className={classes.graphicCards__levelImage}
								{...bottom.image}
							/>
						</div>
						<p className={classes.graphicCards__levelBottomText}>
							{bottom.text}
						</p>
					</div>
				</div>
			</Container.Col>
		</Container>
	)
}

export default GraphicCards
