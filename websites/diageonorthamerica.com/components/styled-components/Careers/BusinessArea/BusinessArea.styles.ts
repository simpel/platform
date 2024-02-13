import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const TitleWrapper = styled.div`
  flex-shrink: 0
  margin-bottom: 40px;

  @media (min-width: 768px) {
    max-width: 440px;
    margin-right: 80px;
    margin-bottom: 0;
  }
`

export const Title = styled.h2`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 54px;
	font-weight: 600;
	line-height: 60px;
	letter-spacing: 0px;
	text-align: left;
`
export const CarouselWrapper = styled.div``

export const HeaderContainer = styled.div`
	margin-bottom: 56px;
`

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 64px;

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
	}
`

export const TextWrapper = styled.div`
	max-width: 600px;
`

export const Text = styled.div`
	font-family: 'URWGeometric';
	font-size: 24px;
	font-weight: 300;
	line-height: 32px;
	p {
		margin: 0;
	}
`
