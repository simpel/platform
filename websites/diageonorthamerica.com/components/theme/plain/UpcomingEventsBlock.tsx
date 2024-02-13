import React from 'react'
import { getBaseDateFormat } from 'utilities/dateFormatting'
import { UpcomingEventsBlockProps } from '../../../components/propTypes'
import LinkHelper from './custom/LinkHelper'

export default function UpcomingEventsBlock({
	title,
	blockTheme,
	link,
	events,
}: UpcomingEventsBlockProps) {
	const cleanTheme = blockTheme ? blockTheme : ''
	const divClass = 'rich-text-editor p--l rte-themed ' + cleanTheme
	// let blanktarget = false
	// if (link && link.target) {
	//   if (link.target === '_blank') {
	//     // blanktarget = true
	//   }
	// }

	return (
		<section className="flex-container-wrapper -mt-7 -mb-3">
			<div className="flex-row -mb-2">
				<div className="flex-col-md-12">{title && <h2>{title}</h2>}</div>
			</div>
			<div className="flex-row">
				{events &&
					events.map((item, index) => {
						return (
							<div className="flex-col-md-6" key={index}>
								<div className={divClass}>
									<p>{getBaseDateFormat(item.eventDate)}</p>
									<h5>{item.name}</h5>
									<p className="mt--m">
										<a
											href={`/api/calendar/${item.kkey}`}
											className="btn btn-outline"
										>
											<span className="icon_calendar"></span> Add to calendar
										</a>
									</p>
								</div>
							</div>
						)
					})}
			</div>
			{link && (
				<LinkHelper
					name={link.name}
					url={link.url}
					contentId={link.contentId}
					mediaId={link.mediaId}
					target={link.target}
				></LinkHelper>
			)}
		</section>
	)
}
