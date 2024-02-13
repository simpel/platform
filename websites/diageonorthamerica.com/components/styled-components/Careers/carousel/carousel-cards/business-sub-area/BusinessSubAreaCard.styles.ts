import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: transparent;
`

export const TitleContainer = styled.div`
	display: flex;
	padding-bottom: 16px;
`

export const Title = styled.h3`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 26px;
	font-weight: 600;
	line-height: 32px;
	text-align: left;
`

export const DescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	a {
		display: flex;
		span {
			span {
				font-size: 18px;
			}
		}
	}
`

export const Description = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
	font-weight: 400;
	line-height: 25px;
	text-align: left;
`
