import { getGradient } from '../utils'
import * as S from './LayoutV2.styles'

export interface LayoutBackground {
	gradient: string
	alignment?: 'left' | 'right'
	viewWidth?: number
	viewHeight?: number
}

interface LayoutV2Props {
	children: React.ReactNode
	background?: LayoutBackground
}

const LayoutV2 = ({
	background = {
		gradient: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
	},
	children,
}: LayoutV2Props) => {
	const gradient = getGradient(background.gradient)
	return (
		<S.Wrapper>
			<S.Background {...background} gradient={gradient} />
			<S.Content>{children}</S.Content>
		</S.Wrapper>
	)
}

export default LayoutV2
