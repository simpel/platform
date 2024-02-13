import styled from 'styled-components'
import Image from 'next/image'

export const Wrapper = styled.div`
	display: flex;
	width: 100%;
	margin: 0 auto;
	flex-direction: column;
	max-width: 1440px;
	@media (min-width: 1024px) {
		padding: 0 100px;
	}
`

export const StepContainer = styled.div`
	position: absolute;
	height: 100%;
	left: 20px;
	@media (min-width: 768px) {
		left: 50%;
	}
`
export const StepLine = styled.div`
	width: 1px;
	min-height: 100%;
	background-color: black;
`

export const StepWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	border: 1px solid black;
	position: absolute;
	top: 0;
	left: -20px;
	width: 40px;
	height: 40px;
	background-color: white;
	z-index: 2;
	@media (min-width: 768px) {
		left: -40px;
		width: 80px;
		height: 80px;
	}
`

export const StepNumber = styled.span`
	font-family: 'URWGeometric';
	font-size: 32px;
	font-weight: 600;
	letter-spacing: 0px;
	text-align: center;
	/* line-height: 36px; */
	padding-bottom: 5px;
	@media (min-width: 768px) {
		line-height: 60px;
		font-size: 54px;
		padding-bottom: 8px;
	}
`

export const SectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* border-left: 1px solid black; */
	position: relative;
	z-index: 1;
	@media (min-width: 768px) {
		width: 50%;
	}
`

export const SectionContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 0 36px 72px;
`

export const SectionTitleContainer = styled.div`
	padding-bottom: 26px;
`

export const SectionTitle = styled.h3`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 54px;
	font-weight: 600;
	line-height: 60px;
	letter-spacing: 0px;
	text-align: left;
`

export const SectionBodyContainer = styled.div`
	padding-bottom: 40px;
`

export const SectionBody = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	letter-spacing: 0em;
	text-align: left;
`

export const MediaContainer = styled.div`
	position: relative;
	height: 380px;
`

export const StyledImage = styled(Image)`
	object-fit: cover;
`

export const QuoteWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 0 0 36px 72px;
	@media (min-width: 768px) {
		width: 50%;
		padding: 86px 70px 70px 0;
	}
`

export const QuoteContainer = styled.div`
	padding-bottom: 32px;
`

export const Quote = styled.span`
	font-family: 'FSBrabo';
	font-size: 26px;
	/* font-style: italic; */
	font-weight: 400;
	line-height: 32px;
	letter-spacing: 0px;
	text-align: left;
`

export const HumanContainer = styled.div`
	display: flex;
`

export const HumanAvatarContainer = styled.div`
	position: relative;
	height: 46px;
	min-width: 46px;
	margin-right: 24px;
`

export const HumanAvatar = styled(Image)`
	border-radius: 50%;
`

export const HumanDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

export const HumanNameContainer = styled.div`
	p {
		margin: 0;
	}
`

export const HumanName = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	letter-spacing: 0em;
	text-align: left;
`

export const HumanSurname = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	/* font-style: italic; */
	font-weight: 400;
	line-height: 25px;
	letter-spacing: 0em;
	text-align: left;
`

export const HumanPositionContainer = styled.div``

export const HumanPosition = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	letter-spacing: 0em;
	text-align: left;
`

export const VerticalContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100px;
	width: 100%;
	position: relative;
	@media (min-width: 768px) {
		flex-direction: row;
	}
`

export const MediaTextContainer = styled.div`
	background-color: black;
	padding: 16px;
`

export const MediaText = styled.div`
	font-family: 'URWGeometric';
	font-size: 15px;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: 0em;
	text-align: left;
	color: white;

	p {
		margin: 0;
	}
`
