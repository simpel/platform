import React, { useState } from 'react'
import Slider from 'react-slick'
import cn from 'classnames'
import IcoMoonIcon from '../plain/IcoMoonIcon'
import { Icons as EnumsIcon } from '../../../enumsIcon'
import { type DSliderType } from '../../propTypes'

type ButtonType = {
	readonly className?: string
	readonly styleBtn?: string
	readonly onClick?: () => void
}

const CarouseNextArrow = ({ className, onClick }: ButtonType) => {
	return (
		<button
			aria-label="Next"
			className={className ? className : ''}
			onClick={onClick}
		>
			<IcoMoonIcon icon={EnumsIcon.ArrowRight} size={24} />
		</button>
	)
}

const CarousePrevArrow = ({ className, onClick }: ButtonType) => {
	return (
		<button
			aria-label="Previous"
			className={className ? className : ''}
			onClick={onClick}
		>
			<IcoMoonIcon icon={EnumsIcon.ArrowLeft} size={24} />
		</button>
	)
}

const DSlider = ({
	children,
	progressSlides = true,
	alignProgressSlides,
	settings,
	className,
}: DSliderType) => {
	const [currentIndex, setCurrentIndex] = useState(1)
	const baseSettings = {
		centerPadding: '40',
		speed: 500,
		swipe: false,
		nextArrow: <CarouseNextArrow />,
		prevArrow: <CarousePrevArrow />,

		...settings,
		afterChange(current) {
			setCurrentIndex(Math.ceil(current) + 1)
			if (settings?.afterChange) settings.afterChange(current)
		},
	}

	const alignProgress = cn({
		'text-align--center': alignProgressSlides === 'center',
		'text-align--right': alignProgressSlides === 'right',
	})

	const getProgress = () =>
		`Showing ${currentIndex} of ${children && children.length}`

	return (
		<div className={`slider ${className ? className : ''}`}>
			<Slider {...baseSettings}>{children}</Slider>
			{progressSlides && (
				<div className={`slider__progress ${alignProgress}`}>
					<p>{getProgress()}</p>
				</div>
			)}
		</div>
	)
}

export default DSlider
