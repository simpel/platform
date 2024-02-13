import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'

export const Wrapper = styled.div`
	display: flex;
`

export const Header = styled.div`
	display: flex;
	margin-bottom: 40px;
`

export const Content = styled.div`
	display: flex;
`
export const HeaderContent = styled.div`
	display: flex;
	flex-direction: column;
`

export const BodyContent = styled.div`
	display: flex;
	flex-direction: column;
	@media (min-width: 870px) {
		flex-direction: row;
		gap: 16px;
	}
`
export const SingleJobVacancyContainer = styled(Link)`
	display: flex;
	cursor: pointer;
	text-decoration: none;
`

export const SingleJobVacancy = styled.div`
	height: 110px;
	padding: 16px;
	background-color: #ffffff;
	margin-bottom: 8px;
	flex: 1;
`
export const JobDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`
export const JobTitle = styled.div`
	font-size: 24px;
	line-height: 22px;
	font-weight: 600;
`

export const JobLocation = styled.div`
	font-family: FSBrabo, sans-serif;
`

export const PageTitleContainer = styled.div`
	padding-bottom: 16px;
`

export const PageTitle = styled.span`
	font-family: 'URWGeometric';
	font-size: 22px;
	font-weight: 600;
	line-height: 26px;
	letter-spacing: 0px;
	text-align: left;
`

export const TitleContainer = styled.div`
	padding-bottom: 16px;
`

export const Title = styled.h3`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 54px;
	font-weight: 600;
	line-height: 54px;
	letter-spacing: 0px;
	text-align: left;
`

export const TextContainer = styled.div`
	padding-bottom: 32px;
`

export const Text = styled.span`
	font-family: 'URWGeometric';
	font-size: 24px;
	font-weight: 300;
	line-height: 32px;
	letter-spacing: 0px;
	text-align: left;
`
export const StyledIcon = styled(Image)`
	min-width: 12px;
	max-width: 12px;
	height: 15px;
	margin-right: 6px;
	width: 100%;
`
export const JobLocationContainer = styled.div`
	display: flex;
	align-items: center;
`

export const OpacityWrapper = styled.div<{ isVisible: boolean }>`
	width: 100%;
	height: 100%;
	background-color: white;
	position: absolute;
	opacity: ${({ isVisible }) => (isVisible ? '0' : '1')};
	transition: opacity 0.7s;
`

export const ArrowWrapper = styled.div<{ gradient: string }>`
	display: flex;
	max-width: 56px;
	width: 100%;
	align-items: center;
	justify-content: center;
	background-color: white;
	height: 110px;
	position: relative;
	background: ${({ gradient }) => (gradient ? gradient : 'white')};
`

export const ArrowIconContainer = styled.div`
	display: flex;
	border: 1px solid black;
	border-radius: 50%;
	position: relative;
	min-width: 24px;
	height: 24px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 2;
`

export const ArrowIcon = styled(Image)``

export const ButtonContainer = styled.div<{ gradient: string }>`
	display: flex;
	/* width: 100%;
  height: 100%; */
	position: relative;
	background: ${({ gradient }) => gradient};
	&:hover {
		background: ${({ gradient }) => (gradient ? gradient : 'white')};
	}
`

export const Opacity = styled.div<{ isVisible: boolean }>`
	width: 100%;
	height: 100%;
	background-color: white;
	position: absolute;
	opacity: ${({ isVisible }) => (isVisible ? '0' : '1')};
	transition: opacity 1s;
`

export const StyledButton = styled.a`
	width: 100%;
	padding: 8px;
	font-family: 'URWGeometric';
	font-size: 18px;
	line-height: 25px;
	border: 2px solid black;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
	padding-bottom: 10px;
	font-weight: 600;
	z-index: 2;
	@media (min-width: 768px) {
		margin-bottom: 0;
	}
`
export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 8px;
`
