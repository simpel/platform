import * as S from './QuestionPanel.styles'
import * as C from '../../Common/Layout/Layout.styles'
import { getGradient } from 'components/styled-components/utils'

export interface ISingleQuestionProps {
	question: string
	answer: string
	quote?: string
	gradient: string
}

const SingleQuestion = (props: ISingleQuestionProps) => {
	const { question, answer, quote, gradient } = props
	const properGradient = getGradient(gradient)
	return (
		<S.SingleQuestionWrapper>
			<S.SingleQuestionContainer gradient={properGradient}>
				<S.QContainer>Q.</S.QContainer>
				<S.Question>{question}</S.Question>
			</S.SingleQuestionContainer>
			<S.AnswerContainer>
				<S.Answer>{answer}</S.Answer>
			</S.AnswerContainer>
			{quote && (
				<S.QuoteContainer>
					<S.Quote>{quote}</S.Quote>
				</S.QuoteContainer>
			)}
		</S.SingleQuestionWrapper>
	)
}

export default SingleQuestion
