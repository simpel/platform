import styled from 'styled-components'

export const EntryTextWrapper = styled.div`
	margin-bottom: 56px;
`

export const EntryText = styled.span`
	font-family: 'URWGeometric';
	font-size: 20px;
	font-weight: 400;
	line-height: 28px;
	text-align: left;
`

export const QuestionsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 44px;
`

export const SingleQuestionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`
export const SingleQuestionContainer = styled.div<{ gradient: string }>`
	display: flex;
	background: ${({ gradient }) => gradient};
	padding: 8px 16px;
`

export const QContainer = styled.div`
	padding-right: 16px;
	font-family: 'URWGeometric';
	font-size: 26px;
	font-weight: 600;
	line-height: 32px;
	letter-spacing: 0px;
	text-align: left;
`

export const Question = styled.span`
	font-family: 'URWGeometric';
	font-size: 26px;
	font-weight: 600;
	line-height: 32px;
	text-align: left;
`

export const AnswerContainer = styled.div`
	margin-bottom: 56px;
`
export const Answer = styled.span`
	font-family: 'URWGeometric';
	font-size: 20px;
	font-weight: 400;
	line-height: 28px;
	text-align: left;
`

export const QuoteContainer = styled.div``

export const Quote = styled.span`
	font-family: 'FSBrabo';
	font-size: 26px;
	font-style: italic;
	font-weight: 400;
	line-height: 32px;
	text-align: left;
`

export const Wrapper = styled.div`
	display: flex;
	margin-top: 8px;
`
export const CenterColumn = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin: 0 56px;
	@media (min-width: 1024px) {
		margin: 0;
		flex: 5;
	}
`

export const SideColumn = styled.div`
	@media (min-width: 1024px) {
		flex: 3;
	}
`
