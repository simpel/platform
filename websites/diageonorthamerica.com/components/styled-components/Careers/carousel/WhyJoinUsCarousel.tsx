import Carousel from 'components/styled-components/Common/Carousel'
import { type IWhyJoinUsCardProps } from './carousel-cards/why-join-us/WhyJoinUsCard'

type TWhyJoinUsCarouselProps = {
	cards: IWhyJoinUsCardProps[]
	richTextTitle: string
}
function WhyJoinUsCarousel(props: TWhyJoinUsCarouselProps) {
	const { cards, richTextTitle } = props
	return <Carousel cards={cards} richTextTitle={richTextTitle} />
}

export default WhyJoinUsCarousel
