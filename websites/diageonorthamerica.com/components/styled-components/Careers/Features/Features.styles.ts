import styled from 'styled-components'

export const Wrapper = styled.div``

export const UpperContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 60px;
	@media (min-width: 768px) {
		flex-direction: row;
	}
`

export const TitleContainer = styled.div`
	padding-bottom: 24px;
`

export const Title = styled.h2`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 54px;
	font-weight: 600;
	line-height: 60px;
	text-align: left;
`

export const TextContainer = styled.div`
	padding-bottom: 24px;
`

export const Text = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	text-align: left;
`

export const BottomContainer = styled.div``
