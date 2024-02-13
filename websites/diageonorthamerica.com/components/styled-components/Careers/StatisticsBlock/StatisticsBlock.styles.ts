import Image from 'next/image'
import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-between;
	@media (min-width: 870px) {
		flex-direction: row;
	}
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const PageTitleContainer = styled.div`
	padding-bottom: 16px;
`

export const PageTitle = styled.span`
	font-family: 'URWGeometric';
	font-size: 20px;
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
	font-size: 42px;
	font-weight: 600;
	line-height: 48px;
	letter-spacing: 0px;
	text-align: left;
`

export const StatisticsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 42px;
`

export const SingleStatisticContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 240px;
`

export const StatisticValue = styled.span`
	font-family: 'URWGeometric';
	font-weight: 600;
	line-height: 50px;
	letter-spacing: 3px;
	text-align: left;
	font-size: 46px;
	@media (min-width: 1024px) {
		font-size: 60px;
		line-height: 72px;
	}
`

export const StatisticTitle = styled.span`
	font-family: 'URWGeometric';
	font-size: 22px;
	font-weight: 400;
	line-height: 30px;
	letter-spacing: 0px;
	text-align: left;
`

export const StatisticsWithMediaContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

export const MediaWrapper = styled.div`
	display: flex;
	margin: 80px 0;
	height: 40vh;
	/* height: 360px; */
	@media (min-width: 1024px) {
		margin: 0 0 80px 0;
	}
`

export const StatisticsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
`

export const MediaContainer = styled.div`
	z-index: 3;
	flex: 1;
	position: relative;
`

export const StyledImage = styled(Image)`
	object-fit: cover;
	/* object-fit: cover; */
	width: 100%;
`
