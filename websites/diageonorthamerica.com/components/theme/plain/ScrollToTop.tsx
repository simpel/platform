import React, { useState, useEffect } from 'react'
import Icon from 'components/theme/plain/Icon'

const ScrollToTop = () => {
	const [showTopBtn, setShowTopBtn] = useState(false)
	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 400) {
				setShowTopBtn(true)
			} else {
				setShowTopBtn(false)
			}
		})
	}, [])
	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	return (
		<div className="top-to-btm">
			{' '}
			{showTopBtn && (
				<div onClick={goToTop} className="arrowUp">
					<Icon
						name="icon_angle_up"
						size="small"
						stroke={false}
						color="black"
					/>
				</div>
			)}{' '}
		</div>
	)
}
export default ScrollToTop
