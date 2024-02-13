import Image from 'next/image'
import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	@media (min-width: 768px) {
		flex-direction: row;
		gap: 0;
	}
`

export const LeftSide = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
`

export const BreadcrumbsContainer = styled.div`
	padding-bottom: 76px;
	font-family: 'URWGeometric';
	font-size: 15px;
	font-weight: 400;
	line-height: 23px;
	text-align: left;
`

export const BottomContainer = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const DateContainer = styled.div``

export const Date = styled.span`
	font-family: 'URWGeometric';
	font-size: 14px;
	font-weight: 400;
	line-height: 22px;
	text-align: center;
`

export const HeaderContainer = styled.div``

export const StyledHeader = styled.h2`
	font-size: 36px;
	margin: 0;
	font-family: 'URWGeometric';
	font-weight: 600;
	line-height: 40px;
	text-align: left;
	@media (min-width: 1024px) {
		font-size: 54px;
		line-height: 60px;
	}
`

export const TagWrapper = styled.div`
	display: flex;
	gap: 4px;
`

export const TagContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(255, 255, 255, 0.6);
	padding: 8px;
`

export const Tag = styled.span`
	font-family: 'URWGeometric';
	font-size: 12px;
	font-weight: 600;
	line-height: 12px;
	letter-spacing: 0.05em;
	text-align: left;
	text-transform: uppercase;
	cursor: pointer;
`

export const RightSide = styled.div``

export const ImageContainer = styled.div`
	display: flex;
	max-height: 500px;
	height: 500px;
	position: relative;
	width: 100%;
	overflow: hidden;
`

export const StyledImage = styled(Image)`
	object-fit: cover;
	width: 100%;
	&:hover {
		transform: scale(1.1);
	}
	transition: transform 0.3s ease-in-out;
`
