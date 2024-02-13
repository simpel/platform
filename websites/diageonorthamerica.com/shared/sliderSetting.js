export const baseSliderSetting = {
	slidesToShow: 3,
	slidesToScroll: 1,
	infinite: false,
	centerPadding: '30',
	swipe: true,
	responsive: [
		{
			breakpoint: 580,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				swipe: true,
			},
		},
		{
			breakpoint: 1280,
			settings: {
				swipe: false,
			},
		},
	],
}

export const latestStoriesSliderSetting = {
	arrows: false,
	dots: true,
	slidesToShow: 2,
	slidesToScroll: 1,
	infinite: false,
	swipe: true,
	responsive: [
		{
			breakpoint: 580,
			settings: {
				slidesToShow: 1.1,
				swipe: true,
			},
		},
		{
			breakpoint: 1280,
			settings: {
				swipe: false,
			},
		},
	],
}

export const storiesSliderSetting = {
	infinite: false,
	slidesToShow: 2,
	slidesToScroll: 1,
	swipe: true,
	responsive: [
		{
			breakpoint: 580,
			settings: {
				slidesToShow: 1.1,
				swipe: true,
			},
		},
		{
			breakpoint: 1280,
			settings: {
				swipe: false,
			},
		},
	],
}

export const explorerSliderSetting = {
	...baseSliderSetting,
	slidesToShow: 4,
}

export const brandSliderSetting = {
	infinite: true,
	slidesToShow: 3,
	centerMode: true,
	centerPadding: '0px',
	slidesToScroll: 1,
	swipe: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				swipe: true,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				centerMode: false,
				swipe: true,
			},
		},
		{
			breakpoint: 1280,
			settings: {
				slidesToShow: 1,
				swipe: false,
			},
		},
	],
}

export const simpleCenteredCarouselWithImages = {
	// infinite: true,
	infinite: false,
	slidesToShow: 1,
	centerMode: true,
	swipe: true,
	centerPadding: '0px',
	slidesToScroll: 1,
	// variableWidth: true,
}

export const quoteSlider = {
	infinite: true,
	slidesToShow: 1,
	centerMode: true,
	swipe: true,
	centerPadding: '0px',
	slidesToScroll: 1,
	adaptiveHeight: false,
}
