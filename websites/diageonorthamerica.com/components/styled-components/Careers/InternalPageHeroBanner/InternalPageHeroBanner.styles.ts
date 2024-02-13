import styled from 'styled-components'
import Image from 'next/image'

export const TopWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const BreadcrumbsBox = styled.div`
	margin-bottom: 48px;
`

export const Breadcrumbs = styled.div`
	max-width: 1328px;
	margin: 0 auto;
`

export const Wrapper = styled.div<{ additionalPadding?: boolean }>`
	display: flex;
	flex-direction: column;

	@media (min-width: 768px) {
		flex-direction: row;
		padding-bottom: ${({ additionalPadding }) =>
			additionalPadding ? `100px` : '0'};
	}
`

export const UpperContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const SubTitleContainer = styled.div`
	margin-bottom: 16px;
`

export const SubTitle = styled.h3`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 600;
	line-height: 25px;
	text-align: left;
`

export const TitleContainer = styled.div`
	margin-bottom: 32px;
`

export const Title = styled.h1`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 64px;
	font-weight: 600;
	line-height: 60px;
	text-align: left;
`

export const DescriptionContainer = styled.div`
	margin-bottom: 32px;
`

export const Description = styled.span`
	font-family: 'URWGeometric';
	font-size: 26px;
	font-weight: 300;
	line-height: 25px;
	line-height: 1;
	text-align: left;
`

export const BottomContainer = styled.div``

export const ImageWrapper = styled.div`
	position: relative;
	height: 430px;
	overflow: hidden;
	margin-top: 32px;
	@media (min-width: 768px) {
		margin-top: 0;
	}
`

export const StyledImage = styled(Image)`
	object-fit: cover;
	&:hover {
		transform: scale(1.1);
	}

	transition: transform 0.3s ease-in-out;
`
