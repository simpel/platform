import styled from 'styled-components'
import Image from 'next/image'

export const Wrapper = styled.div`
	/* display: flex;
  flex-direction: column; */
	/* width: 1200px; */
	/* background-color: green; */
	width: 100%;
`

export const Content = styled.div`
	display: flex;
	min-height: 770px;
	position: relative;

	@media (min-width: 1024px) {
		min-height: 640px;
	}

	@media (min-width: 1440px) {
		min-height: 770px;
	}
`

export const LayoutWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 1;
`

export const Columns = styled.div`
	z-index: 2;
	width: 100%;
	display: flex;
	flex-direction: column-reverse;

	@media (min-width: 1024px) {
		flex-direction: row;
	}
`
export const ColumnsInternal = styled.div`
	display: flex;
	margin-left: auto;
`
export const TopSpace = styled.div`
	/* height: 150px; */
`

export const BottomSpace = styled.div`
	/* height: 150px; */
`

export const LeftContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 220px;

	@media (min-width: 1024px) {
		margin-top: 170px;
	}

	@media (min-width: 1440px) {
		margin-top: 220px;
	}
`

export const MainTitle = styled.div`
	font-family: 'URWGeometric';
	font-size: 32px;
	font-weight: 600;
	text-align: left;
	padding-bottom: 16px;

	@media (min-width: 1024px) {
		padding-bottom: 20px;
		font-size: 56px;
		line-height: 44px;
	}

	@media (min-width: 1440px) {
		padding-bottom: 20px;
		font-size: 65px;
		line-height: 72px;
	}
`

export const MainDescription = styled.div`
	font-family: 'URWGeometric';
	font-size: 18px;
	line-height: 32px;
	letter-spacing: 0px;
	text-align: left;
	font-weight: 300;

	@media (min-width: 1024px) {
		font-size: 22px;
		line-height: 28px;
		margin-bottom: 16px;
	}

	@media (min-width: 1440px) {
		font-size: 24px;
		line-height: 32px;
		margin-bottom: 0;
	}
`

export const InnerBackground = styled.div`
	height: 650px;
	margin-top: 150px;
	/* width: 100%; */

	@media (min-width: 1024px) {
		height: 520px;
		margin-top: 110px;
	}

	@media (min-width: 1440px) {
		height: 580px;
		margin-top: 150px;
	}
`
export const RightContent = styled.div`
	z-index: 2;

	@media (min-width: 1024px) {
		margin-top: 46px;
	}

	@media (min-width: 1440px) {
		margin-top: 28px;
	}
`

export const ImageWrapper = styled.div`
	position: relative;
	margin-left: auto;
	height: 300px;
	margin: 0 20px 16px;

	@media (min-width: 1024px) {
		margin: 0 0 40px 0;
		margin-bottom: 40px;
		height: 300px;
	}

	@media (min-width: 1440px) {
		height: 400px;
	}
`

export const MainImage = styled(Image)``

export const Text = styled.div`
	font-family: 'FSBrabo';
	font-size: 22px;
	font-style: italic;
	font-weight: 400;
	line-height: 26px;
	text-align: left;
	margin-bottom: 32px;

	@media (min-width: 1024px) {
		font-size: 18px;
		line-height: 20px;
	}

	@media (min-width: 1440px) {
		font-size: 22px;
		line-height: 26px;
	}
`

export const AuthorDetails = styled.div``

export const ButtonContainer = styled.div`
	display: flex;
	text-align: justify;
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
	text-align: left;
`

export const HumanNameContainer = styled.div``

export const HumanName = styled.span`
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	letter-spacing: 0em;
	text-align: left;
	p {
		margin: 0;
	}
`

export const HumanPositionContainer = styled.div``

export const HumanPosition = styled.span`
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	letter-spacing: 0em;
	text-align: left;

	@media (min-width: 1024px) {
		font-size: 16px;
	}

	@media (min-width: 1440px) {
		font-size: 18px;
	}
`
export const LeftContentWrapper = styled.div`
	display: flex;
`

export const MobileLeftContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
`
