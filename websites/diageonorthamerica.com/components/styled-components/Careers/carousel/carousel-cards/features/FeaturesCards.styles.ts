import Image from 'next/image'
import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	height: 100%;
`
export const ImageWrapper = styled.div`
	position: relative;
	height: 460px;
	overflow: hidden;
`

export const StyledImage = styled(Image)`
	object-fit: cover;
	&:hover {
		transform: scale(1.1);
	}

	transition: transform 0.3s ease-in-out;
`

export const TitleContainer = styled.div``

export const Title = styled.h2`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 26px;
	font-weight: 600;
	line-height: 32px;
	text-align: left;
`

export const DescriptionContainer = styled.div`
	display: flex;
`

export const Description = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	text-align: left;
`

export const ButtonWrapper = styled.div`
	text-align: justify;
	padding: 16px 0 0 16px;
`

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 40px 26px;
	gap: 16px;
`

export const ArrowIconContainer = styled.div`
	display: flex;
	border: 1px solid black;
	border-radius: 50%;
	position: relative;
	min-width: 32px;
	max-width: 32px;
	height: 32px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`

export const ArrowIcon = styled(Image)`
	width: 14px;
	height: 14px;
	object-fit: none !important;
`
export const ButtonContainer = styled.div`
	display: flex;
	margin-right: auto;
`
