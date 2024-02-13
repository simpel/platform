import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

export const HigherWrapper = styled.div<{ gradient: boolean }>`
	display: flex;
	position: relative;
	max-width: 1180px;
	/* top: -55px; */
	z-index: 2;
	background-color: white;
	margin: 0 auto;
	box-shadow: 0px 10px 30px 0px #0000001a;
	border-radius: 55px;
	background: ${({ gradient }) => (gradient ? gradient : 'white')};
`
export const Wrapper = styled.div<{ isSearchingResult: boolean }>`
	display: flex;
	width: 100%;
	max-width: 1180px;
	z-index: 2;
	background-color: white;
	margin: 0 auto;
	border-radius: 55px;
	padding: 16px 16px 16px 48px;
`

export const SearchWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`

export const SearchIconContainer = styled.div`
	display: flex;
`

export const SearchIcon = styled(Image)`
	width: 20px;
	height: 20px;
	@media (min-width: 768px) {
		width: 32px;
		height: 32px;
	}
`

export const StyledInput = styled.input`
	flex: 1;
	font-family: 'URWGeometric';
	font-size: 24px;
	line-height: 26px;
	letter-spacing: 0px;
	text-align: left;
	color: black;
	border: none;
	padding-left: 10px;
	outline: none;
	min-height: 80px;
	max-width: calc(100% - 40px) !important;
	background-color: white !important;
	::placeholder {
		color: black;
	}
	::-webkit-search-cancel-button {
		cursor: pointer;
	}
	@media (min-width: 400px) {
		max-width: none;
	}
	@media (min-width: 768px) {
		padding-left: 16px;
		font-size: 30px;
	}
`

export const ArrowIconContainer = styled.div<{
	isSearchingResult: boolean
	gradient: string
}>`
	display: flex;
	border: 1px solid black;
	border-radius: 50%;
	position: relative;
	min-width: 40px;
	height: 40px;
	align-items: center;
	justify-content: center;
	background: ${({ gradient }) => gradient};
	cursor: pointer;
	&:hover {
		background: ${({ gradient }) => (gradient ? gradient : 'white')};
	}
	right: 24px;
	@media (min-width: 400px) {
		right: 0;
	}
	@media (min-width: 768px) {
		min-width: 80px;
		height: 80px;
	}
`
interface IOpacityToggle {
	isVisible: boolean
}

export const OpacityCircle = styled.div<IOpacityToggle>`
	width: 100%;
	height: 100%;
	background-color: white;
	border-radius: 50%;
	position: absolute;
	opacity: ${({ isVisible }) => (isVisible ? '0' : '1')};
	transition: opacity 1s;
`

export const ArrowIcon = styled(Image)<IOpacityToggle>`
	width: 20px;
	height: 20px;
	z-index: 2;
	@media (min-width: 768px) {
		width: 32px;
		height: 32px;
	}
`

export const LinkContainer = styled.div<{ isVisible: boolean }>`
	display: flex;
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	transition: opacity 0.6s;
`

export const StyledLink = styled(Link)`
	font-family: 'URWGeometric';
	font-size: 26px;
	line-height: 32px;
	font-weight: 500;
	color: black;
	text-decoration: none;
	margin: 0 16px;
	cursor: pointer;
`
export const ModalTitleContainer = styled.div`
	display: flex;
	margin-bottom: 32px;
`

export const ModalTitle = styled.span`
	font-family: 'URWGeometric';
	font-size: 16px;
`

export const ModalResultsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	max-height: 300px;
	overflow-y: auto;
`

export const ModalResultWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	&:hover {
		background-color: #fbfafa;
	}
`

export const JobTitleContainer = styled.div`
	display: flex;
`

export const JobTitle = styled.span`
	font-family: 'URWGeometric';
	font-size: 18px;
`

export const JobLocationContainer = styled.div<{ gradient: string }>`
	display: flex;
	text-transform: uppercase;
	background: ${({ gradient }) => gradient};
	border-radius: 8px;
	padding: 2px 6px;
	line-height: 20px;
`

export const JobLocation = styled.span`
	font-family: 'URWGeometric';
	font-size: 12px;
	letter-spacing: 0.5px;
	font-weight: 500;
`

export const ModalWrapper = styled.div<{ isModalVisible: boolean }>`
	background-color: white;
	position: absolute;
	overflow: hidden;
	width: 100%;
	padding: 28px 16px;
	left: 0;
	bottom: 46%;
	border-radius: 55px 55px 0 0;
	max-height: ${({ isModalVisible }) => (isModalVisible ? `500px` : '0px')};
	transition: max-height 0.6s ease-out;
	z-index: -1;
`

export const Content = styled.div<{ isModalVisible: boolean }>`
	padding: 32px 32px 64px;
`

export const TitleContainer = styled.div`
	max-width: 1180px;
	margin: 0 auto 28px;
`

export const Title = styled.h3`
	margin: 0;
	font-size: 32px;
	font-family: 'URWGeometric';
	line-height: 48px;
	font-weight: 600;
`

export const BreadcrumbsContainer = styled.div`
	display: flex;
	list-style: none !important;
	margin-bottom: 60px;
`

export const Breadcrumbs = styled.div`
	list-style: none !important;
`

export const BreadcrumbsList = styled.ul`
	display: flex;
	margin: 0;
	padding: 0;
	list-style: none !important;
	flex-wrap: wrap;

	h1 {
		display: inline;
	}
`
