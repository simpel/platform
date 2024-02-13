import styled from 'styled-components'
import { LayoutBackground } from './LayoutV2'

export const Wrapper = styled.div`
	max-width: 100%;
	position: relative;
`

export const Content = styled.div`
	max-width: 1480px;
	position: relative;
	margin: 0 auto;
`

export const Background = styled.div<LayoutBackground>`
	background: ${({ gradient }) => (gradient ? gradient : 'white')};
	position: absolute;
	width: ${({ viewWidth }) => (viewWidth ? `${viewWidth}%` : '100%')};
	height: ${({ viewHeight }) => (viewHeight ? `${viewHeight}%` : '100%')};
	z-index: 0;
	bottom: 0;
	right: ${({ alignment }) => (alignment === 'left' ? 'initial' : '0')};
`
