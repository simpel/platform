import styled from 'styled-components'
import Image from 'next/image'

interface IMediaContainerProps {
	isInverted?: boolean
	height?: string
	maxWidth?: string
}
export const MediaContainer = styled.div<IMediaContainerProps>`
	display: flex;
	margin: auto;
	padding: ${({ additionalPadding }) => (additionalPadding ? `36px` : '0')} 0;
	width: 100%;
	max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'none')};
	height: ${({ heightMobilePortrait }) =>
		heightMobilePortrait ? `${heightMobilePortrait}px` : '100%'};
	max-height: ${({ heightMobilePortrait }) =>
		heightMobilePortrait ? `${heightMobilePortrait}px` : '100%'};
	position: relative;

	@media (min-width: 768px) {
		height: ${({ height }) => (height ? `${height}px` : '100%')};
		max-height: ${({ height }) => (height ? `${height}px` : '100%')};
	}

	@media (min-width: 1024px) {
		flex-direction: ${({ isInverted }) => (isInverted ? 'row-reverse' : 'row')};
		padding: 0;
	}

	.video {
		object-fit: cover !important;
	}
`

export const StyledVideoImage = styled(Image)`
	object-fit: cover;
	width: 100%;
	height: 100%;
`

export const StyledImage = styled(Image)`
	object-fit: cover;
	width: 100%;
`

export const CarouselWrapper = styled.div`
	position: relative;
`

export const SecondaryMediaWrapper = styled.div`
	position: absolute;
	right: 46px;
	bottom: -113px;
	z-index: 2;
`

export const SeconaryMediaContainer = styled.div`
	position: relative;
	height: 226px;
	width: 226px;
`

export const VideoButtonContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 5;
`

export const VideoButton = styled.button``

export const MontageImage1 = styled.div`
	position: relative;
	height: 260px;
	width: 100%;
	z-index: 3;

	@media (min-width: 1024px) {
		height: 390px;
		width: 224px;
	}
`
export const MontageImage2 = styled.div`
	position: relative;
	height: 260px;
	width: 100%;
	transform: translate(-20px, 36px);
	z-index: 2;

	@media (min-width: 1024px) {
		height: 390px;
		width: 224px;
		transform: translate(-32px, 50px);
	}
`
export const MontageImage3 = styled.div`
	position: relative;
	height: 260px;
	width: 100%;
	transform: translate(-40px, -36px);
	z-index: 1;

	@media (min-width: 1024px) {
		height: 390px;
		width: 224px;
		transform: translate(-64px, -50px);
	}
`
