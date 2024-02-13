import styled from 'styled-components'
import Image from 'next/image'

interface IWrapperProps {
	isInverted?: boolean
	isSecondaryImage?: boolean
}

export const Wrapper = styled.div<IWrapperProps>`
	display: flex;
	width: 100%;
	justify-content: space-between;
	flex-direction: ${({ isInverted }) =>
		isInverted ? 'column-reverse' : 'column'};
	padding-bottom: ${({ isSecondaryImage }) =>
		isSecondaryImage ? '113px' : '0'};
	@media (min-width: 1200px) {
		flex-direction: ${({ isInverted }) => (isInverted ? 'row-reverse' : 'row')};
	}
`

export const ImageContainer = styled.div<{ isInverted: boolean }>`
	display: flex;
	max-height: 430px;
	height: 430px;
	position: relative;
	width: 100%;
	margin: ${({ isInverted }) => (isInverted ? '32px 0 0 0' : '0 0 32px 0')};
`

export const StyledImage = styled(Image)`
	object-fit: cover;
	width: 100%;
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const PageTitleContainer = styled.div`
	padding-bottom: 16px;
`

export const PageTitle = styled.span`
	font-family: 'URWGeometric';
	font-size: 22px;
	font-weight: 600;
	line-height: 26px;
	letter-spacing: 0px;
	text-align: left;
`

export const TitleContainer = styled.div`
	padding-bottom: 16px;
`

export const Title = styled.h3`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 54px;
	font-weight: 600;
	line-height: 60px;
	letter-spacing: 0px;
	text-align: left;
`

export const TextContainer = styled.div`
	padding-bottom: 32px;
`

export const Text = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	letter-spacing: 0px;
	text-align: left;
`
export const LinkHelperContainer = styled.div`
	margin-bottom: 8px;
`
