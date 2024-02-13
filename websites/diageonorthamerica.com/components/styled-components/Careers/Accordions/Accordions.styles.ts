import styled from 'styled-components'
import Collapsible from 'react-collapsible'
import Image from 'next/image'
import Link from 'next/link'

export const Wrapper = styled.div`
	display: flex;
`

export const TitleWrapper = styled.div`
	padding-bottom: 44px;
`

export const Title = styled.h2`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 54px;
	font-weight: 600;
	line-height: 48px;
`

export const StyledCollapsible = styled(Collapsible)`
	width: 100% !important;
	.Collapsible {
		background-color: red;
	}
`

export const ProgrammeColoredContainer = styled.div`
	display: flex;
	/* background-color: #ffe8cf; */
	justify-content: space-between;
	align-items: center;
	padding: 32px;
`
export const StyledLocationIcon = styled(Image)`
	min-width: 12px;
	max-width: 12px;
	height: 15px;
	margin-right: 6px;
	width: 100%;
`

export const LocationContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 6px;
`

export const Location = styled.div`
	font-size: 18px;
	font-family: 'URWGeometric';
	line-height: 25px;
`

export const ProgrammeTitleContainer = styled.div`
	display: flex;
	align-items: center;
`

export const ProgrameeTitle = styled.div`
	font-family: 'URWGeometric';
	font-size: 22px;
	line-height: 26px;
	font-weight: 600;
`

export const LeftContainer = styled.div``

export const RightContainer = styled.div``

export const IconContainer = styled.div``

export const StyledIcon = styled(Image)``

export const ApplicationAccesibilityWrapper = styled.div`
	border-bottom: 1px solid black;
`

export const ApplicationAccesibilityContainer = styled.div`
	display: flex;
	padding: 8px 32px;
	align-items: center;
`
export const AccesibilityCircleContainer = styled.div`
	display: flex;
	margin-right: 8px;
`
export const AccesibilityCircle = styled.div<{ isOpen: boolean }>`
	min-width: 11px;
	height: 11px;
	border-radius: 50%;
	background-color: ${({ isOpen }) => (isOpen ? 'green' : 'white')};
	border: ${({ isOpen }) => (isOpen ? 'none' : '1px solid black')};
`

export const Accesibility = styled.span`
	p {
		margin: 0 !important;
	}
`

export const BoldedText = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	line-height: 25px;
	font-weight: 600;
`

export const Text = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	line-height: 25px;
`

export const ExpandedWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 32px;
	@media (min-width: 1028px) {
		flex-direction: row;
	}
`

export const ExpandedLeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const ExpandedRightContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`

export const ExpandedImageContainer = styled.div`
	display: flex;
	max-height: 300px;
	height: 300px;
	width: 100%;
	position: relative;
`

export const ExpandedImage = styled(Image)`
	object-fit: contain;

	/* @media (min-width: 1028px) {
    object-fit: cover;
  } */
`

export const ExpandedTextContainer = styled.div``

export const ExpandedBoldText = styled.span`
	font-family: 'URWGeometric';
	font-size: 22px;
	line-height: 26px;
	font-weight: 600;
`

export const ExpandedText = styled.span`
	font-size: 18px;
	font-family: 'URWGeometric';
	line-height: 25px;
`

export const ProgrammesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 36px;
`

export const ButtonContainer = styled.div<{ gradient: string }>`
	display: flex;
	width: 100%;
	height: 100%;
	position: relative;
	background: ${({ gradient }) => gradient};
	&:hover {
		background: ${({ gradient }) => (gradient ? gradient : 'white')};
	}
`
export const Opacity = styled.div<{ isVisible: boolean }>`
	width: 100%;
	height: 100%;
	background-color: white;
	position: absolute;
	opacity: ${({ isVisible }) => (isVisible ? '0' : '1')};
	transition: opacity 1s;
`

export const StyledButton = styled.a`
	width: 100%;
	padding: 8px 0;
	font-family: 'URWGeometric';
	font-size: 18px;
	line-height: 25px;
	border: 2px solid black;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
	margin-bottom: 16px;
	font-weight: 600;
	z-index: 2;
	@media (min-width: 768px) {
		margin-bottom: 0;
	}
`
export const PlusMinus = styled.div`
	position: relative;
	width: 25px;
	height: 25px;
	cursor: pointer;
	&.active {
		&:before {
			transform: translatey(-50%) rotate(-90deg);
			opacity: 0;
		}
		&:after {
			transform: translatey(-50%) rotate(0);
		}
	}

	&:before,
	&:after {
		content: '';
		display: block;
		background-color: #333;
		position: absolute;
		top: 50%;
		left: 0;
		transition: 0.35s;
		width: 100%;
		height: 3px;
	}

	&:before {
		transform: translatey(-50%);
	}

	&:after {
		transform: translatey(-50%) rotate(90deg);
	}
`
