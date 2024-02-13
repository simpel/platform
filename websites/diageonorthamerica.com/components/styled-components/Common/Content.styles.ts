import styled from 'styled-components'

export const Wrapper = styled.div<{ isHeader?: boolean }>`
	padding: 50px 20px;
	@media (min-width: 768px) {
		padding: ${({ isHeader }) =>
			isHeader ? '40px 20px 100px 20px' : '100px 20px'};
	}
`
