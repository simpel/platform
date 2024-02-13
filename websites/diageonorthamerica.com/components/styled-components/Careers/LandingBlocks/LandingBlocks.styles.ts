import Image from 'next/image'
import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	@media (min-width: 768px) {
		flex-direction: row;
	}
`

export const ImageWrapper = styled.div`
	display: flex;
	position: relative;
	max-height: 350px;
	height: 350px;
	width: 100%;
`

export const StyledImage = styled(Image)`
	object-fit: cover;
`
export const TitleContainer = styled.div`
	padding-bottom: 16px;
`

export const Title = styled.h2`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 54px;
	font-weight: 600;
	line-height: 60px;
`

export const DescriptionContainer = styled.div`
	padding-bottom: 60px;
`

export const Description = styled.span`
	font-family: 'URWGeometric';
	font-size: 24px;
	font-weight: 300;
	line-height: 32px;
`

export const LocationsWrapper = styled.div``

export const LocationTitleContainer = styled.div`
	margin-bottom: 28px;
`

export const LocationText = styled.span`
	font-family: 'URWGeometric';
	font-size: 12px;
	font-weight: 600;
	line-height: 12px;
	letter-spacing: 0.2em;
	text-transform: uppercase;
`

export const SingleLocationContainer = styled.div`
	display: flex;
	width: 49%;
	span {
		span {
			font-size: 22px;
		}
	}
`

export const LocationsContainer = styled.div`
	display: flex;
	gap: 34px 2%;
	flex-wrap: wrap;
	padding-bottom: 60px;
	@media (min-width: 768px) {
		padding-bottom: 0;
	}
`
