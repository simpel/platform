import React from 'react'
import { StoryQuestionBlockProps } from '../../../components/propTypes'
import { FixMediaPathsInHtml } from 'utilities/functions'

import QuestionPanel, {
	IQuestionPanelProps,
} from 'components/styled-components/Careers/QuestionPanel/QuestionPanel'

export default function StoryQuestionBlock(props: StoryQuestionBlockProps) {
	return <QuestionPanel {...props} />
}
