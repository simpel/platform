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
`

export const RightNavWrapper = styled.div`
	display: flex;
	position: absolute;
	right: 8.5%;
	z-index: 2;
	top: 122px;
	@media (min-width: 1024px) {
		top: 94px;
	}
`

export const LeftNavWrapper = styled.div`
	display: flex;
	position: absolute;
	left: 8.5%;
	z-index: 2;
	top: 122px;
	@media (min-width: 1024px) {
		top: 94px;
	}
`

export const ArrowIconContainerLeft2 = styled.div`
	display: flex;
	border-radius: 50%;
	position: relative;
	width: 64px;
	height: 64px;
	align-items: center;
	justify-content: center;
	background-color: white;
	cursor: pointer;
	transform: rotate(-180deg);
	&:hover {
		background: linear-gradient(145.36deg, #fcf9eb 2.15%, #f6e7d7 100%);
	}
	@media (min-width: 1024px) {
		width: 120px;
		height: 120px;
	}
	border: solid 1px #8080801a;
`

export const ArrowIcon2 = styled(Image)`
	width: 24px;
	height: 24px;
	z-index: 2;
`

export const ArrowIconContainerRight2 = styled(ArrowIconContainerLeft2)`
	transform: rotate(0deg);
`
