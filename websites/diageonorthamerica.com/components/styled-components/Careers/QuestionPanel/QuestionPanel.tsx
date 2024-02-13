import * as S from './QuestionPanel.styles'
import * as C from '../../Common/Layout/Layout.styles'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import ContentBounds from 'components/styled-components/Common/ContentBounds'
import SingleQuestion, { ISingleQuestionProps } from './SingleQuestion'
import { useMediaQuery } from 'react-responsive'
import { StoryQuestionBlockProps } from 'components/propTypes'
import { getGradient } from 'components/styled-components/utils'

export interface IQuestionPanelProps {
	entryText: string
	questions: ISingleQuestionProps[]
	gradient: string
}

const QuestionPanel = (props: StoryQuestionBlockProps) => {
	const { questionRichText, gradient } = props
	const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
	const sideColumnsSize = isDesktop ? 3 : 1
	const properGradient = getGradient(gradient)
	return (
		<LayoutV2>
			{/* <ContentBounds> */}
			<S.Wrapper>
				<S.SideColumn />
				<S.CenterColumn>
					<S.SingleQuestionWrapper>
						<S.SingleQuestionContainer gradient={properGradient}>
							<S.QContainer>Q.</S.QContainer>
							<S.Question
								dangerouslySetInnerHTML={{ __html: questionRichText }}
							></S.Question>
						</S.SingleQuestionContainer>
					</S.SingleQuestionWrapper>
				</S.CenterColumn>
				<S.SideColumn />
			</S.Wrapper>
			{/* </ContentBounds> */}
		</LayoutV2>

		// <LayoutV2>
		//   <ContentBounds>
		//     <S.Wrapper>
		//       <C.Column size={sideColumnsSize} />
		//       <C.Column size={6}>
		//         <S.EntryTextWrapper>
		//           <S.EntryText>{entryText}</S.EntryText>
		//         </S.EntryTextWrapper>
		//         <S.QuestionsWrapper>
		//           {questions &&
		//             questions.length > 0 &&
		//             questions.map((q: ISingleQuestionProps, index: number) => (
		//               <SingleQuestion {...q} gradient={gradient} key={index} />
		//             ))}
		//         </S.QuestionsWrapper>
		//       </C.Column>
		//       <C.Column size={sideColumnsSize} />
		//     </S.Wrapper>
		//   </ContentBounds>
		// </LayoutV2>
	)
}

export default QuestionPanel
