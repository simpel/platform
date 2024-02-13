import styled from 'styled-components'
import Image from 'next/image'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`
export const Header = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 64px;

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
	}
`

export const BodyContent = styled.div`
	display: flex;
	gap: 16px;
`
export const TitleWrapper = styled.div`
	flex-shrink: 0;
	margin-bottom: 40px;

	@media (min-width: 768px) {
		max-width: 440px;
		margin-right: 80px;
		margin-bottom: 0;
	}
`

export const Title = styled.h3`
	font-family: 'URWGeometric';
	font-size: 54px;
	font-weight: 600;
	line-height: 60px;
	letter-spacing: 0px;
`

export const TextWrapper = styled.div`
	max-width: 600px;
`

export const Text = styled.div`
	font-family: 'URWGeometric';
	font-size: 24px;
	font-weight: 300;
	line-height: 32px;
	p {
		margin: 0;
	}
`

export const CardsList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4%;
	width: 100%;
	& > * {
		flex: 0 0 100%;
	}
	@media (min-width: 650px) {
		gap: 2%;
		& > * {
			flex: 0 0 49%;
		}
	}
	@media (min-width: 1024px) {
		gap: 1%;
		& > * {
			flex: 0 0 32.6666%;
		}
	}
`

export const Card = styled.div`
	background-color: #fff;
	margin-bottom: 16px;
`
export const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;
	padding: 32px 16px;
`
export const CardTitle = styled.div``
export const CardText = styled.div`
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	p {
		margin: 0;
	}
`

export const CardImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 240px;
	overflow: hidden;
`

export const CardImage = styled(Image)`
	object-fit: cover;

	&:hover {
		transform: scale(1.1);
	}

	transition: transform 0.3s ease-in-out;
`
