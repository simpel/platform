import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`

export const MediaWrapper = styled.div`
	position: relative;
	height: 308px;
	overflow: hidden;
`

export const Media = styled(Image)`
	object-fit: cover;
	&:hover {
		transform: scale(1.1);
	}

	transition: transform 0.3s ease-in-out;
	cursor: pointer;
`

export const DateContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`

export const Date = styled.div``

export const Separator = styled.div`
	width: 1px;
	height: 22px;
	background-color: black;
`

export const Type = styled.div``

export const TagWrapper = styled.div`
	display: flex;
	gap: 4px;
	flex-wrap: wrap;
`

export const TextContainer = styled.div`
	display: flex;
`

export const Text = styled.span`
	font-family: 'URWGeometric';
	font-size: 26px;
	font-weight: 600;
	line-height: 32px;
	text-align: left;
`

export const TagContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(252, 249, 238, 0.7);
	padding: 8px;
`

export const Tag = styled.span`
	font-family: 'URWGeometric';
	font-size: 12px;
	font-weight: 600;
	line-height: 12px;
	letter-spacing: 0.05em;
	text-align: left;
	text-transform: uppercase;
`

export const StyledLink = styled(Link)`
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`
