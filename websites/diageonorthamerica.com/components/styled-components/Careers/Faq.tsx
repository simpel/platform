import { useState } from 'react'
// temp fix
// import plus from '../../../public/images/plus-icon.svg' // '../../../assets/plus.svg'
// import minus from '../../../public/images/plus-icon.svg' //'../../../assets/minus.svg'
import * as S from './Faq.styles'

export interface IFaq {
	question: string
	answer: string
}

interface IFaqs {
	faqs: IFaq[]
}

const Faqs = ({ faqs }: IFaqs) => {
	const [isCollapsible, setIsCollapsible] = useState(false)
	const [expandedElements, setExpandedElements] = useState<any[]>([])

	const triggerStyle = {
		cursor: 'pointer',
		width: '100%',
	}

	const triggerProps = {
		triggerStyle,
		transitionTime: 300,
		easing: 'ease-in',
		width: '100%',
	}

	const addElementToExpandedList = (key: number) => {
		setExpandedElements([...expandedElements, key])
	}

	const removeElementFromExpandedList = (key: number) => {
		setExpandedElements([...expandedElements.filter((e) => e !== key)])
	}

	const isArrowRotated = (index: number) =>
		expandedElements.find((x) => x === index)

	return (
		<S.Wrapper>
			<S.TitleWrapper>
				<S.Title>Faq</S.Title>
			</S.TitleWrapper>
			<S.FaqsWrapper>
				{faqs &&
					faqs.length > 0 &&
					faqs.map((f: IFaq, index: number) => (
						<S.FaqWrapper key={index}>
							<S.StyledCollapsible
								open={isCollapsible}
								onTriggerOpening={() => addElementToExpandedList(index)}
								onTriggerClosing={() => removeElementFromExpandedList(index)}
								{...triggerProps}
								trigger={
									<S.QuestionContainer>
										<S.Question>{f.question}</S.Question>
										<S.Icon
											src={
												isArrowRotated(index)
													? 'images/plus-icon.svg'
													: 'images/plus-icon.svg'
											}
										/>
									</S.QuestionContainer>
								}
							>
								{f.answer}
							</S.StyledCollapsible>
						</S.FaqWrapper>
					))}
			</S.FaqsWrapper>
		</S.Wrapper>
	)
}

export default Faqs
