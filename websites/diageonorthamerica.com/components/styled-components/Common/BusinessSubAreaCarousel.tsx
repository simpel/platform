import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Pagination } from 'swiper'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import BusinessSubAreaCard from '../Careers/carousel/carousel-cards/business-sub-area/BusinessSubAreaCard'
import { TextCarouselBlockProps } from 'components/propTypes'
import * as S from './BusinessSubAreaCarousel.styles'

const BusinessSubAreaCarousel = (props: TextCarouselBlockProps) => {
	const isDesktop = useMediaQuery({ query: '(min-width: 1260px)' })
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const cards = props.blocks
	const pagination = {
		clickable: false,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>'
		},
	}

	const slidesPerView = isDesktop ? 3.1 : isTablet ? 2.5 : 1.1
	const showPagination = !isDesktop && cards.length >= 3
	const swiperRef = useRef<any>(null)
	const [isLeftVisible, setIsLeftVisible] = useState(false)
	const [isRightVisible, setIsRightVisible] = useState(
		cards.length > slidesPerView,
	)

	useEffect(() => {
		swiperRef.current?.swiper.slideTo(0)
	}, [isDesktop, isTablet])

	const Nav = () => {
		const swiper = useSwiper()
		swiper.on('slideChange', () => {
			handleButtonVisibility()
		})

		const handleButtonVisibility = () => {
			setIsLeftVisible(swiperRef.current?.swiper.activeIndex > 0)
			setIsRightVisible(
				swiperRef.current?.swiper.activeIndex <
					swiperRef.current?.swiper.snapGrid.length - 1,
			)
		}

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
					<S.ArrowIconContainerLeft onClick={() => handlePrevSlide()}>
						<S.ArrowIcon
							src={'/images/arrow-icon-small.svg'}
							width={32}
							height={32}
							alt="arrow icon"
						/>
					</S.ArrowIconContainerLeft>
				)}
				{isRightVisible ? (
					<S.ArrowIconContainerRight onClick={() => handleNextSlide()}>
						<S.ArrowIcon
							src={'/images/arrow-icon-small.svg'}
							width={32}
							height={32}
							alt="arrow icon"
						/>
					</S.ArrowIconContainerRight>
				) : (
					<S.EmptyArrowContainer />
				)}
			</>
		)
	}
	return (
		<S.Wrapper>
			<Swiper
				slidesPerView={slidesPerView}
				spaceBetween={36}
				pagination={showPagination ? pagination : undefined}
				modules={[Pagination]}
				className="business-sub-area-carousel"
				ref={swiperRef}
				speed={800}
			>
				{cards.map((card, index: number) => (
					<SwiperSlide key={index}>
						<S.BusinessCardColumn>
							<BusinessSubAreaCard {...card} />
						</S.BusinessCardColumn>
					</SwiperSlide>
				))}
				{isTablet && (
					<S.NavigationWrapper>
						<Nav />
					</S.NavigationWrapper>
				)}
			</Swiper>
		</S.Wrapper>
	)
}

export default BusinessSubAreaCarousel
