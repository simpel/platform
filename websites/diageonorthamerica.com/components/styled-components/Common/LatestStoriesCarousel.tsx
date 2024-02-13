import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass from 'swiper/types/swiper-class'
import { Pagination } from 'swiper'
import { useEffect, useRef, useState } from 'react'
// import { mockLatestStoriesCards } from 'components/theme/plain/_mockData'
import { useMediaQuery } from 'react-responsive'
import LatestStoriesCard from '../Careers/carousel/carousel-cards/latest-stories/LatestStoriesCard'
import * as S from './LatestStoriesCarousel.styles'
import { useSwiper } from 'swiper/react'
import { Controller } from 'swiper'
import { StoriesSliderBlockProps, StoryCardProps } from 'components/propTypes'

const LatestStoriesCarousel = (props: StoriesSliderBlockProps) => {
	const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const { slides } = props
	const slidesPerView = isDesktop ? 2.3 : isTablet ? 2 : 1.1
	const pagination = {
		clickable: false,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>'
		},
	}
	const swiperRef = useRef<any>(null)

	const Nav = () => {
		const [isLeftVisible, setIsLeftVisible] = useState(false)
		const [isRightVisible, setIsRightVisible] = useState(true)

		const swiper = useSwiper()

		useEffect(() => {
			setIsLeftVisible(swiper.activeIndex > 0)
		}, [swiper])

		const handleNextSlide = () => {
			if (swiper.snapGrid.length - 2 === swiper.activeIndex) {
				setIsRightVisible(false)
				swiper.slideNext()
			} else {
				setIsLeftVisible(true)
				swiper.slideNext()
			}
		}
		const handlePrevSlide = () => {
			if (swiper.activeIndex === 1) {
				setIsLeftVisible(false)
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
				// modules={[Controller]} controller={{ control: controlledSwiper }}
				speed={800}
			>
				{Array.isArray(slides)
					? slides.map((card, index: number) => (
							<SwiperSlide key={index}>
								<LatestStoriesCard {...card} />
							</SwiperSlide>
					  ))
					: null}
				{isTablet && <Nav />}
			</Swiper>
		</S.Wrapper>
	)
}

export default LatestStoriesCarousel

// <S.NavigationWrapper>
//   <S.ArrowIconContainerLeft onClick={() => handlePrevSlide()}>
//     <S.ArrowIcon src={'/images/arrow.svg'} width={32} height={32} />
//   </S.ArrowIconContainerLeft>
//   <S.ArrowIconContainerRight onClick={() => handleNextSlide()}>
//     {/* <S.OpacityCircle /> */}
//     <S.ArrowIcon src={'/images/arrow.svg'} width={32} height={32} />
//   </S.ArrowIconContainerRight>
// </S.NavigationWrapper>
