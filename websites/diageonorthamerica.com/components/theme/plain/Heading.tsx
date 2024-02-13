import React from 'react'
import cn from 'classnames'
import { type HeadingProps } from '../../propTypes'
import { HeadingLevel } from '../../../enums'

const Heading = ({
	heading,
	text,
	style,
	id,
	className,
	headingLevel = HeadingLevel.H2,
}: HeadingProps) => {
	const isContentHeadline = style === 'contentHeadline'
	const sections = heading.split('|')
	const cmsStyle = style

	const HeadingContent = () => (
		<>
			<span
				dangerouslySetInnerHTML={{
					__html: sections[0].replaceAll(/<\/?p[^>]*>/gi, ''),
				}}
				className={
					isContentHeadline || headingLevel === HeadingLevel.H3
						? 'text-black'
						: ''
				}
			/>
			{sections[1] && (
				<span
					dangerouslySetInnerHTML={{
						__html: sections[1].replaceAll(/<\/?p[^>]*>/gi, ''),
					}}
					className={
						isContentHeadline || headingLevel === HeadingLevel.H3
							? 'text-black'
							: ''
					}
				/>
			)}
		</>
	)

	if (isContentHeadline) {
		return (
			<div className={cn('block-heading')} id={id}>
				{headingLevel === HeadingLevel.H1 ? (
					<h1 className={cn(cmsStyle)}>
						<HeadingContent />
					</h1>
				) : (
					<h3 className={cmsStyle ? cmsStyle : ''}>
						<HeadingContent />
					</h3>
				)}
			</div>
		)
	}

	return (
		<>
			{headingLevel === HeadingLevel.H1 && (
				<h1 className={cn(cmsStyle, className)} id={id}>
					<HeadingContent />
				</h1>
			)}
			{headingLevel === HeadingLevel.H2 && (
				<h2 className={cn(cmsStyle, className)} id={id}>
					<HeadingContent />
				</h2>
			)}
			{headingLevel === HeadingLevel.H3 && (
				<h3 className={cn(cmsStyle, className)} id={id}>
					<HeadingContent />
				</h3>
			)}
			{headingLevel === HeadingLevel.H4 && (
				<h4 className={cn(cmsStyle, className)} id={id}>
					<HeadingContent />
				</h4>
			)}
			{headingLevel === HeadingLevel.H5 && (
				<h5 className={cn(cmsStyle, className)} id={id}>
					<HeadingContent />
				</h5>
			)}
			{text && <div>{text}</div>}
		</>
	)
}

export default Heading
