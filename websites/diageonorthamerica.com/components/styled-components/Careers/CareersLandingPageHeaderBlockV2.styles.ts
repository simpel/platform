import styled from 'styled-components'

export const SearchContainer = styled.div`
	position: relative;
	top: 50px;
	margin-bottom: 60px;
`

export const Wrapper = styled.div`
	/* height: 60vh; */
	@media (min-width: 768px) {
		/* padding-top: 100px; */
	}
`

export const UpperWrapper = styled.div`
	display: flex;
	height: 100%;
	gap: 16px;
`

export const TextsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* width: 50%; */
	padding: 16px 0;
`

export const TextTitleContainer = styled.div`
	margin-bottom: 28px;
`

export const TextTitle = styled.h1`
	margin: 0;
	font-family: 'URWGeometric';
	font-size: 60px;
	font-weight: 600;
	line-height: 60px;
	letter-spacing: -0.02em;
	text-align: left;
	color: black;
	@media (min-width: 768px) {
		line-height: 94px;
		font-size: 90px;
	}
`

export const MiddleTextContainer = styled.div`
	display: flex;
`

export const TextIntroContainer = styled.div`
	max-width: 394px;
	margin-bottom: 22px;
`

export const TextIntro = styled.span`
	font-family: 'URWGeometric';
	font-size: 28px;
	font-weight: 300;
	line-height: 36px;
	letter-spacing: 0px;
	text-align: left;
	color: black;
`

export const TextHashContainer = styled.div`
	display: flex;
`

export const TextHash = styled.span`
	font-family: 'URWGeometric';
	font-size: 20px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: -0.20000000298023224px;
	text-align: left;
	font-style: italic;
`

export const TextCompany = styled.span`
	font-family: 'URWGeometric';
	font-size: 20px;
	font-weight: 700;
	line-height: 24px;
	letter-spacing: -0.20000000298023224px;
	text-align: left;
`

export const MediaWrapper = styled.div`
	display: flex;
	padding-bottom: 55px;
	/* width: 50%; */
`

export const MediaContainer = styled.div`
	display: flex;
	margin: auto;
	/* max-width: 726px; */
	width: 100%;
	height: 100%;
	max-height: 410px;
	position: relative;
	.video {
		object-fit: cover;
		max-width: 726px !important;
	}
`
