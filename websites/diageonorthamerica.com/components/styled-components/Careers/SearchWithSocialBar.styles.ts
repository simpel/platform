import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

export const Wrapper = styled.div<{ gradient: string }>`
	width: 100%;
	background: ${({ gradient }) => (gradient ? gradient : 'white')};
`

export const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1140px;
	margin: 0 auto;
`

export const SectionTitleContainer = styled.div`
	margin-bottom: 48px;
	padding-left: 32px;
`

export const SectionTitle = styled.h3`
	margin: 0;
`

export const SearchBarContainer = styled.div`
	margin-bottom: 74px;
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	padding: 0 32px;
	align-items: center;
`

export const IconsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	max-width: 856px;
	gap: 8px;
	@media (min-width: 768px) {
		flex-direction: row;
		align-items: center;
	}
`

export const ButtonContainer = styled.div<{ gradient: string }>`
	display: flex;
	position: relative;
	margin-left: auto;
	max-width: 174px;
	width: 100%;
	height: 100%;
	justify-content: center;
	background: ${({ gradient }) => gradient};
	transition: 1s;
	&:hover {
		background: ${({ gradient }) => (gradient ? gradient : 'white')};
	}
`

export const StyledAnchor = styled.a<{ isColoured: boolean; gradient: string }>`
	cursor: pointer;
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 600;
	letter-spacing: 0.2px;
	border: 2px solid black;
	padding: 16px 4px;
	max-width: 174px;
	width: 100%;
	z-index: 2;
	background-color: ${({ isVisible }) => (isVisible ? 'transparent' : 'white')};
	transition: background-color 1s;
	text-decoration: none;
	text-align: center;
`

export const TextHashContainer = styled.div`
	display: flex;
	font-family: 'URWGeometric';
`

export const TextHash = styled.span`
	font-family: 'URWGeometric';
	font-size: 32px;
	font-weight: 600;
	text-align: left;
`
export const TextWithLogoContainer = styled(Link)`
	display: flex;
	align-items: center;
	cursor: pointer;
	text-decoration: none;
`

export const Logo = styled(Image)`
	margin-right: 8px;
`

export const LogoText = styled.span`
	font-family: 'FS Brabo';
	font-size: 22px;
	font-style: italic;
	font-weight: 400;
	line-height: 26px;
	letter-spacing: 0px;
	text-align: left;
`

export const BoldedLogoText = styled(LogoText)`
	font-family: 'URWGeometric';
	font-weight: 600;
	line-height: 26px;
	font-size: 22px;
`
