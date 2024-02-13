import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSwiper } from 'swiper/react'
import { Controller } from 'swiper'
import FeaturesCard, {
	IFeaturesCardProps,
} from '../Careers/carousel/carousel-cards/features/FeaturesCards'
import * as S from './FeaturesCarousel.styles'

interface IFeaturesCarouselProps {
	cards: IFeaturesCardProps[]
}

const FeaturesCarousel = (props: IFeaturesCarouselProps) => {
	const { cards } = props
	const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
	const isTablet = useMediaQuery({ query: '(min-width: 600px)' })
	const slidesPerView = isDesktop ? 3.2 : isTablet ? 2 : 1.1
	const pagination = {
		clickable: false,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>'
		},
	}
	const swiperRef = useRef<any>(null)

	useEffect(() => {
		swiperRef.current?.swiper.slideTo(0)
		setIsLeftVisible(false)
		if (isDesktop) {
			setIsRightVisible(cards.length > 3)
		} else if (isTablet) {
			setIsRightVisible(cards.length > 2)
		}
	}, [isDesktop, isTablet])

	const [isLeftVisible, setIsLeftVisible] = useState(false)
	const [isRightVisible, setIsRightVisible] = useState(true)

	const Nav = () => {
		const swiper = useSwiper()

		useEffect(() => {
			setIsLeftVisible(swiper.activeIndex > 0)
		}, [swiper])

		const handleNextSlide = () => {
			if (swiper.snapGrid.length - 2 === swiper.activeIndex) {
				setIsRightVisible(false)
				setIsLeftVisible(true)
				swiper.slideNext()
			} else {
				setIsLeftVisible(true)
				swiper.slideNext()
			}
		}
		const handlePrevSlide = () => {
			if (swiper.activeIndex === 1) {
				setIsLeftVisible(false)
				setIsRightVisible(true)
				swiper.slidePrev()
			} else {
				swiper.slidePrev()
				setIsRightVisible(true)
			}
		}
		return (
			<>
				{isLeftVisible && (
					<S.LeftNavWrapper>
						<S.ArrowIconContainerLeft2 onClick={() => handlePrevSlide()}>
							<S.ArrowIcon2
								src={'/images/arrow-icon-small.svg'}
								width={24}
								height={24}
								alt="arrow icon"
							/>
						</S.ArrowIconContainerLeft2>
					</S.LeftNavWrapper>
				)}
				{isRightVisible && (
					<S.RightNavWrapper>
						<S.ArrowIconContainerRight2 onClick={() => handleNextSlide()}>
							<S.ArrowIcon2
								src={'/images/arrow-icon-small.svg'}
								width={24}
								height={24}
								alt="arrow icon"
							/>
						</S.ArrowIconContainerRight2>
					</S.RightNavWrapper>
				)}
			</>
		)
	}

	return (
		<S.Wrapper>
			<Swiper
				slidesPerView={slidesPerView}
				spaceBetween={16}
				pagination={pagination}
				// loop={true}
				modules={[Pagination, Controller]}
				className="mySwiper"
				ref={swiperRef}
				speed={800}
				// modules={[Controller]} controller={{ control: controlledSwiper }}
			>
				{cards.map((card, index: number) => (
					<SwiperSlide key={index}>
						<FeaturesCard {...card} />
					</SwiperSlide>
				))}
				{isTablet && <Nav />}
			</Swiper>
		</S.Wrapper>
	)
}

export default FeaturesCarousel
