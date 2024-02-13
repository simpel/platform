import styled from 'styled-components'
import Image from 'next/image'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	@media (min-width: 1024px) {
		flex-direction: row;
	}
`

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	margin-bottom: 16px;
	flex: 1;
`
export const CardImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 240px;
	overflow: hidden;
`
export const CardContent = styled.div<{ gradient: string }>`
	display: flex;
	flex-direction: column;
	padding: 32px 24px;
	min-height: 270px;
	flex-grow: 1;
	background: ${({ gradient }) => (gradient ? gradient : '#fff')};
`
export const CardImage = styled(Image)`
	object-fit: cover;

	&:hover {
		transform: scale(1.1);
	}
	transition: transform 0.25s;
	/* transition: transform 0.3s ease-in-out; */
`
export const Title = styled.div`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 42px;
	font-weight: 600;
	line-height: 48px;
`

export const TitleContainer = styled.div`
	display: flex;
	width: 80%;
`

export const CardTitle = styled.h3`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 26px;
	font-weight: 600;
	line-height: 32px;
`

export const CardTitleContainer = styled.div`
	display: flex;
	padding-bottom: 8px;
`

export const CardDescriptionContainer = styled.div`
	display: flex;
	flex: 1;
`

export const CardDescription = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
`

export const CardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	@media (min-width: 768px) {
		flex-direction: row;
	}
`
