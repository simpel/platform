import React from 'react'
import { Icons as EnumsIcon } from '../../../enumsIcon'
import IcoMoonIcon from '../plain/IcoMoonIcon'

type DSocietyTargetProps = {
	_id?: string
	text: string
	track?: string
}

function DSocietyTarget({ text, track = 'on track' }: DSocietyTargetProps) {
	return (
		<div className="society-target theme-green">
			<div className="society-target__border"></div>
			<div className="society-target__body">
				<div
					className="society-target__text"
					dangerouslySetInnerHTML={{ __html: text }}
				></div>
				<div className="society-target__track-wrapper flex flex-align-center">
					<div className="society-target__track-icon">
						<IcoMoonIcon icon={EnumsIcon.Checkmark} size={20} />
					</div>
					<div className="society-target__track-text text-uppercase font-semibold">
						{track}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DSocietyTarget
