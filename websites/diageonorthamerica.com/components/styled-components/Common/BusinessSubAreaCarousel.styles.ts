import styled from 'styled-components'
import Image from 'next/image'

interface IPaginationBullet {
	active: boolean
}

export const Wrapper = styled.div`
	/* margin: 60px 0; */
	position: relative;
	.swiper-slide {
		background-color: transparent;
	}
`

export const PaginationBullet = styled.div<IPaginationBullet>`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: ${(props) => (props.active ? '#000' : '#fff')};
`

export const NavigationWrapper = styled.div`
	display: flex;
	justify-content: end;
	margin-top: 40px;
	gap: 12px;
	position: absolute;
	right: 20px;
	bottom: 20px;
	z-index: 2;
`
export const BusinessCardColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;
	margin-bottom: 64px;
`

export const ArrowIconContainerLeft = styled.div`
	display: flex;
	border: 1px solid black;
	border-radius: 50%;
	position: relative;
	width: 80px;
	height: 80px;
	align-items: center;
	justify-content: center;
	/* background: ${({ gradient }) => gradient}; */
	cursor: pointer;
	transform: rotate(-180deg);
	transition: background-color 0.5s;
`

export const ArrowIconContainerRight = styled(ArrowIconContainerLeft)`
	transform: rotate(0deg);
`

export const OpacityCircle = styled.div`
	width: 100%;
	height: 100%;
	background-color: white;
	border-radius: 50%;
	position: absolute;
	transition: opacity 1s;
`

export const ArrowIcon = styled(Image)`
	width: 32px;
	height: 32px;
	z-index: 2;
	color: red;
`

export const EmptyArrowContainer = styled.div`
	width: 80px;
`
