import Image from 'next/image'
import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`
export const ImageWrapper = styled.div`
	position: relative;
	height: 200px;
	width: 300px;
	overflow: hidden;
`

export const StyledImage = styled(Image)`
	object-fit: cover;
	&:hover {
		transform: scale(1.1);
	}

	transition: transform 0.3s ease-in-out;
`

export const ButtonWrapper = styled.div`
	text-align: justify;
	padding: 16px 0 0 0;
`
