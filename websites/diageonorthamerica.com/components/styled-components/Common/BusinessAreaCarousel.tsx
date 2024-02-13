import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Pagination } from 'swiper'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import BusinessAreaCard from '../Careers/carousel/carousel-cards/business-area/BusinessAreaCard'
import * as S from './BusinessAreaCarousel.styles'

const BusinessAreaCarousel = (props: any) => {
	const { blocks } = props
	const isDesktop = useMediaQuery({ query: '(min-width: 1320px)' })
	const isLargeTablet = useMediaQuery({ query: '(min-width: 1150px)' })
	const isMediumTablet = useMediaQuery({ query: '(min-width: 1045px)' })
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const isMobile = useMediaQuery({ query: '(min-width: 690px)' })
	const isMini = useMediaQuery({ query: '(min-width: 540px)' })

	const pagination = {
		clickable: false,
		renderBullet: function (index, className) {
			return '<span class="' + className + '"></span>'
		},
	}
	const swiperRef = useRef<any>(null)

	const slidesPerView = isDesktop
		? 4.3
		: isLargeTablet
		? 3.7
		: isMediumTablet
		? 3.3
		: isTablet
		? 2.4
		: isMobile
		? 2.2
		: isMini
		? 1.7
		: 1.4

	const [isLeftVisible, setIsLeftVisible] = useState(false)
	const [isRightVisible, setIsRightVisible] = useState(true)
	useEffect(() => {
		swiperRef.current?.swiper.slideTo(0)
	}, [isDesktop, isTablet, isLargeTablet, isMediumTablet, isMobile, isMini])

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

		const handleNextSlide = () =>
			swiper.slideTo(swiper.activeIndex + Math.floor(slidesPerView))
		const handlePrevSlide = () =>
			swiper.slideTo(swiper.activeIndex - Math.floor(slidesPerView))

		return (
			<>
				{isLeftVisible && (
					<S.ArrowIconContainerLeft onClick={() => handlePrevSlide()}>
						<S.ArrowIcon
							src={'/images/arrow.svg'}
							width={32}
							height={32}
							alt="arrow icon"
						/>
					</S.ArrowIconContainerLeft>
				)}
				{isRightVisible ? (
					<S.ArrowIconContainerRight onClick={() => handleNextSlide()}>
						<S.ArrowIcon
							src={'/images/arrow.svg'}
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

	const groupedBlocks = blocks.reduce(
		(resultArray: any, item: any, index: number) => {
			const chunkIndex = Math.floor(index / 2)
			if (!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = []
			}
			resultArray[chunkIndex].push(item)
			return resultArray
		},
		[],
	)

	return (
		<S.Wrapper>
			<Swiper
				slidesPerView={slidesPerView}
				spaceBetween={36}
				pagination={pagination}
				modules={[Pagination]}
				// className="mySwiper"
				ref={swiperRef}
				speed={800}
			>
				{groupedBlocks.map((group, index: number) => (
					<SwiperSlide key={index}>
						<S.BusinessCardColumn>
							<BusinessAreaCard {...group[0]} />
							{group[1] && <BusinessAreaCard {...group[1]} />}
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

export default BusinessAreaCarousel
