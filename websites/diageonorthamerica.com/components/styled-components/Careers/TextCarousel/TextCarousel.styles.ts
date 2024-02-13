import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 50px 20px;

	@media (min-width: 1440px) {
		padding: 100px 20px;
	}

	.swiper-wrapper {
		padding-bottom: 60px !important;
	}
`

export const TitleContainer = styled.div`
	padding-bottom: 48px;
`

export const Title = styled.h3`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 42px;
	font-weight: 600;
	line-height: 48px;
	text-align: left;
`
export const CarouselContainer = styled.div`
	background-color: transparent;
	display: flex;
	flex-direction: column;
`
