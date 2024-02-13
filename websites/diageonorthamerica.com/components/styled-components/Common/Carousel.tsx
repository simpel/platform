import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Pagination } from 'swiper'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import WhyJoinUsCard, {
	type IWhyJoinUsCardProps,
} from '../Careers/carousel/carousel-cards/why-join-us/WhyJoinUsCard'
import ContentBounds from './ContentBounds'
import LayoutV2 from './LayoutV2'
import * as S from './Carousel.styles'

type TCarouselProps = {
	cards: IWhyJoinUsCardProps[]
	richTextTitle: string
}

function Carousel(props: TCarouselProps) {
	const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const { cards, richTextTitle } = props
	const pagination = {
		clickable: true,
		renderBullet(index, className: string) {
			return '<span class="' + className + '"></span>'
		},
	}
	const swiperRef = useRef(null)

	const slidesPerView = isDesktop ? 1.3 : isTablet ? 2 : 1.1

	function Nav() {
		const swiper = useSwiper()

		const handleNextSlide = () => {
			if (swiper.snapGrid.length - 2 === swiper.activeIndex) {
				swiper.slideNext()
			} else {
				swiper.slideNext()
			}
		}

		const handlePreviousSlide = () => {
			if (swiper.activeIndex === 1) {
				swiper.slidePrev()
			} else {
				swiper.slidePrev()
			}
		}

		return (
			<>
				<S.ArrowIconContainerLeft
					onClick={() => {
						handlePreviousSlide()
					}}
				>
					<S.OpacityCircle />
					<S.ArrowIcon
						src="/images/arrow.svg"
						width={32}
						height={32}
						alt="arrow icon"
					/>
				</S.ArrowIconContainerLeft>
				<S.ArrowIconContainerRight
					onClick={() => {
						handleNextSlide()
					}}
				>
					<S.OpacityCircle />
					<S.ArrowIcon
						src="/images/arrow.svg"
						width={32}
						height={32}
						alt="arrow icon"
					/>
				</S.ArrowIconContainerRight>
			</>
		)
	}

	return (
		<LayoutV2>
			<S.Wrapper>
				<ContentBounds>
					<S.Title dangerouslySetInnerHTML={{ __html: richTextTitle }} />
					<Swiper
						ref={swiperRef}
						slidesPerView={slidesPerView}
						spaceBetween={16}
						// CenteredSlides={true}
						className="mySwiper"
						speed={800}
						pagination={pagination}
						// Loop={true}
						modules={[Pagination]}
					>
						{cards.map((card, index: number) => (
							// eslint-disable-next-line react/no-array-index-key
							<SwiperSlide key={index}>
								<WhyJoinUsCard {...card} />
							</SwiperSlide>
						))}
						{isDesktop && (
							<S.NavigationWrapper>
								<Nav />
							</S.NavigationWrapper>
						)}
					</Swiper>
				</ContentBounds>
			</S.Wrapper>
		</LayoutV2>
	)
}

export default Carousel
