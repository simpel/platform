import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	BlockProps,
	SharePriceBlockProps,
	SharePriceFigures,
} from 'components/propTypes'
import { Block } from 'enums'
import { usePages } from 'context/pages'
import { SharePrices, Theme } from 'types'
import { useEffect, useState } from 'react'
import { fetchShareData } from 'lib/cms/api'

export default function BlockSharePriceBlock({
	customComponent,
}: BlockProps<SharePriceBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	let tmpTheme = ''

	if (page.referencedContent) {
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	const [data, setData] = useState({} as SharePrices)

	useEffect(() => {
		fetchShareData().then((res: SharePrices) => {
			setData(res)
		})
	}, [])

	const figs = {} as SharePriceFigures

	figs.nyFigure = 0
	figs.nyPercent = 0
	figs.nyDirection = 0
	figs.lsFigure = 0
	figs.lsPercent = 0
	figs.lsDirection = 0

	if (data && data.data && data.data.length) {
		data.data.map((d) => {
			if (d.currency === 'GBX') {
				figs.lsFigure = d.last
				figs.lsPercent = d.changePercent
				if (d.changePercent > 0) {
					figs.lsDirection = 1
				} else if (d.changePercent < 0) {
					figs.lsDirection = -1
				} else {
					figs.lsDirection = 0
				}
			}
			if (d.currency === 'USD') {
				figs.nyFigure = d.last
				figs.nyPercent = d.changePercent
				if (d.changePercent > 0) {
					figs.nyDirection = 1
				} else if (d.changePercent < 0) {
					figs.nyDirection = -1
				} else {
					figs.nyDirection = 0
				}
			}
		})
	}
	const props = {
		title: f.text('title'),
		link: f.link2('link'),
		blockTheme: tmpTheme as Theme,
		figures: figs,
	}

	return getComponent<SharePriceBlockProps>(
		Block.SharePriceBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
