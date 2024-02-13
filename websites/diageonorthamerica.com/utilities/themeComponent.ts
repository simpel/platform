type contentProps = {
	_id: string
	categoryPages: null
	contentType: string
	fields: []
	level: number
	pageId: number
	parent: any
	referencedMedia: any
	sortOrder: number
	title: string
	updateDate: string
	url: string
	urlSegment: 'blue'
}

const getCurrentThemeComponent = (
	referencedContent: any,
	contentTheme: string,
) => {
	const themeNode = referencedContent.find((m) => m._id === contentTheme)
	const tmptheme = themeNode?.fields.find((m) => m.alias === 'value')?.text
	return tmptheme
}

export default getCurrentThemeComponent
