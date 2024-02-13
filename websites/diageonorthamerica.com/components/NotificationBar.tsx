import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { hash } from 'lib/utils'

type NotificationStore = { [hash: string]: boolean }
const KEY = 'notifications'

type Props = {
	content: string
}

export default function NotificationBar({ content }: Props) {
	const id = hash(content)

	const [visible, setVisible] = useState(false)
	const [notifications, setNotifications] = useState<NotificationStore>({})

	const handleClick = () => {
		const updatedNotifications = { ...notifications, [id]: true }
		setNotifications(updatedNotifications)
		localStorage.setItem(KEY, JSON.stringify(updatedNotifications))
		setVisible(false)
	}

	useEffect(() => {
		try {
			const saved = localStorage.getItem(KEY)
			const parsed = JSON.parse(saved || '{}')
			setNotifications(parsed)
			if (!parsed[id]) setVisible(true)
		} catch (err) {
			console.error(err.message)
			setVisible(true)
		}
	}, [id])

	if (!visible || !content) return null
	return (
		<div className="fixed z-30 flex items-center justify-between px-4 py-3 text-white bg-blue-400 rounded shadow-2xl bottom-4 left-4 right-4">
			<div
				className="text-white prose prose-lg prose-blue"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
			<FontAwesomeIcon
				className="cursor-pointer"
				//@ts-ignore
				icon={faTimesCircle}
				onClick={handleClick}
			/>
		</div>
	)
}
