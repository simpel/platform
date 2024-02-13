import styled from 'styled-components'

//1160max width
//1440max

export const Wrapper = styled.div`
	max-width: 1440px;
`

interface IColumn {
	size: number
	isCentered?: boolean
}

export const Column = styled.div<IColumn>`
	flex: ${(props) => props.size};
	display: ${(props) => (props.isCentered ? 'flex' : 'block')};
`
