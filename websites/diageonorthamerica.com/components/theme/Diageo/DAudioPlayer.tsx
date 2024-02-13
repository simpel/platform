import React, { useState, useRef } from 'react'
import cn from 'classnames'

import { AudioProp } from '../../propTypes'

function DAudioPlayer({ title, time, info, audioLink }: AudioProp) {
	const [isPlay, setIsPlay] = useState(false)
	const audioRef = useRef<HTMLInputElement | any>(null)

	function handlePlay() {
		const play = !isPlay
		if (audioRef.current !== null) {
			if (play) {
				audioRef.current.play()
			} else {
				audioRef.current.pause()
			}
		}
		setIsPlay(play)
	}

	return (
		<div className={cn('audio-player', isPlay ? 'audio-player--playing' : '')}>
			<audio controls ref={audioRef} hidden>
				<source src={audioLink} type="audio/mpeg" />
			</audio>
			<div className="audio-player__inner flex flex-align-center">
				<button
					aria-label="Play"
					className="audio-player__button-play"
					onClick={handlePlay}
				>
					<svg
						width="35"
						height="35"
						viewBox="0 0 35 35"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_31_290)">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M17.7829 0C8.32964 0 0.657471 7.84 0.657471 17.5C0.657471 27.16 8.32964 35 17.7829 35C27.2361 35 34.9082 27.16 34.9082 17.5C34.9082 7.84 27.2361 0 17.7829 0ZM14.3578 25.375L24.633 17.5L14.3578 9.625V25.375ZM4.08255 17.5C4.08255 25.2175 10.2306 31.5 17.7829 31.5C25.3351 31.5 31.4832 25.2175 31.4832 17.5C31.4832 9.7825 25.3351 3.5 17.7829 3.5C10.2306 3.5 4.08255 9.7825 4.08255 17.5Z"
								fill="black"
							/>
						</g>
						<defs>
							<clipPath id="clip0_31_290">
								<rect
									width="34.2508"
									height="35"
									fill="white"
									transform="translate(0.657471)"
								/>
							</clipPath>
						</defs>
					</svg>
				</button>
				<span className="audio-player__title">{title}</span>
				<span className="audio-player__time">{time}</span>
				{info && (
					<div className="audio-player__graphic">
						<div className="audio-player__graphic-equalizer">
							<span className="audio-player__graphic-equalizer-line audio-player__graphic-equalizer-line-1"></span>
							<span className="audio-player__graphic-equalizer-line audio-player__graphic-equalizer-line-2"></span>
							<span className="audio-player__graphic-equalizer-line audio-player__graphic-equalizer-line-3"></span>
							<span className="audio-player__graphic-equalizer-line audio-player__graphic-equalizer-line-4"></span>
							<span className="audio-player__graphic-equalizer-line audio-player__graphic-equalizer-line-5"></span>
							<span className="audio-player__graphic-equalizer-line audio-player__graphic-equalizer-line-6"></span>
							<span className="audio-player__graphic-equalizer-line audio-player__graphic-equalizer-line-7"></span>
						</div>
						<div className="audio-player__graphic-icon">
							<svg
								width="13"
								height="12"
								viewBox="0 0 13 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_31_295)">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M6.47055 0.166992C3.31948 0.166992 0.762085 2.78032 0.762085 6.00032C0.762085 9.22032 3.31948 11.8336 6.47055 11.8336C9.62162 11.8336 12.179 9.22032 12.179 6.00032C12.179 2.78032 9.62162 0.166992 6.47055 0.166992ZM5.8997 3.08366V4.25032H7.04139V3.08366H5.8997ZM5.8997 5.41699V8.91699H7.04139V5.41699H5.8997ZM1.90377 6.00032C1.90377 8.57282 3.95311 10.6669 6.47055 10.6669C8.98798 10.6669 11.0373 8.57282 11.0373 6.00032C11.0373 3.42782 8.98798 1.33365 6.47055 1.33365C3.95311 1.33365 1.90377 3.42782 1.90377 6.00032Z"
										fill="black"
									/>
								</g>
								<defs>
									<clipPath id="clip0_31_295">
										<rect
											width="11.7431"
											height="12"
											fill="white"
											transform="translate(0.599609)"
										/>
									</clipPath>
								</defs>
							</svg>
							<span className="audio-player__graphic-message">{info}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default DAudioPlayer
