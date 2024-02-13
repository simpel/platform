import styled from 'styled-components'
import Collapsible from 'react-collapsible'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding-bottom: 40px;
`

export const TitleWrapper = styled.div`
	display: flex;
`

export const Title = styled.h2`
	margin: 0;
	font-family: Poppins;
	font-size: 26px;
	font-weight: 600;
	line-height: 35px;
	letter-spacing: 0px;
	text-align: left;
	color: rgba(17, 36, 77, 1);
`

export const FaqsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`

export const FaqWrapper = styled.div`
	display: flex;
	background-color: rgba(254, 249, 235, 1);
	border-radius: 16px;
	padding: 16px 32px;
	.Collapsible {
		width: 100% !important;
	}
`

export const QuestionContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`

export const Icon = styled.img``

export const Question = styled.span`
	font-family: Poppins;
	font-size: 16px;
	font-weight: 600;
	line-height: 26px;
	letter-spacing: 0px;
	text-align: left;
	color: #243e39;
`

export const Answer = styled.span`
	//styleName: paragraph 16;
	font-family: Poppins;
	font-size: 16px;
	font-weight: 400;
	line-height: 26px;
	letter-spacing: 0px;
	text-align: left;
	color: rgba(17, 36, 77, 1);
`

export const StyledCollapsible = styled(Collapsible)`
	width: 100% !important;
	.Collapsible {
		width: 100% !important;
		background-color: red;
	}
`
