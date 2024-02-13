import styled from 'styled-components'

export const Colour = styled.div<{ gradient: string }>`
	background: ${({ gradient }) => gradient};
`
export const Filler = styled.div<{ gradient: string }>`
	/* background: ${({ gradient }) => gradient}; */
	width: 100%;
`

export const ButtonWrapper = styled.div`
	background: ${({ gradient }) => gradient};
`
