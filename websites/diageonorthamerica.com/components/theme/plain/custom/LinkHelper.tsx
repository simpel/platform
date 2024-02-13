import React from 'react'
import { CmsLink } from 'types'
import LinkHelper2 from './LinkHelper2'

export default function LinkHelper({
	name,
	url,
	contentId,
	mediaId,
	target,
	extraclass,
	isLegacy,
	skipMargin = false,
}: CmsLink) {
	const divclass = `rich-text-editor ${skipMargin ? '' : '-mt-3'} ${
		extraclass ? extraclass : ''
	}`
	// const divclass = skipMargin ? 'rich-text-editor' : `rich-text-editor -mt-3 ${extraclass ? extraclass : ''}`

	return (
		<div className={divclass}>
			<LinkHelper2
				name={name}
				url={url}
				contentId={contentId}
				mediaId={mediaId}
				target={target}
				linkClass={'link'}
				divClass={'link__inner'}
				showicon={true}
				isLegacy={isLegacy}
			></LinkHelper2>
		</div>
	)

	/*
  const showicon = true
  const linkClass = 'link'
  const divClass = 'link__inner'
  let fileurl = ''
  let m_target = '_self'
  let rel = ''
  let icon = 'icon_arrow_right'
  let iconleft = false

  if (url && url.length > 0) {
    if (contentId && contentId.length > 0) {
      fileurl = url
    } else if (mediaId && mediaId.length > 0) {
      fileurl =
        process.env.NEXT_PUBLIC_MEDIAHOST + `` + process.env.NEXT_PUBLIC_MEDIAPREFIX + '/media' + url.split('/media')[1]
      m_target = '_blank'
      rel = 'noreferrer'
      icon = 'icon_download'
      iconleft = true
    } else if (url.indexOf('/media') > -1) {
      fileurl =
        process.env.NEXT_PUBLIC_MEDIAHOST + `` + process.env.NEXT_PUBLIC_MEDIAPREFIX + '/media' + url.split('/media')[1]
      m_target = '_blank'
      rel = 'noreferrer'
      icon = 'icon_download'
      iconleft = true
    } else if (target === '_blank' || url.startsWith('http')) {
      fileurl = url
      m_target = '_blank'
      rel = 'noreferrer'
      icon = 'icon_external_link'
    } else {
      fileurl = url
    }

    return (
      <div className={divclass}>
        <Link href={fileurl}>
          <a className={linkClass} target={m_target} rel={rel}>
            <div className={divClass}>
              {showicon && iconleft && <Icon name={icon} size="middle" className="link__icon" />}
              <span className="link__text">{name}</span>
              {showicon && !iconleft && <Icon name={icon} size="middle" className="link__icon" />}
            </div>
          </a>
        </Link>
      </div>
    )
  } else {
    return <></>
  }
  */
	/*
  if (contentId && contentId.length > 0) {
    return (
      <div className={divclass}>
        <Link href={url}>
          <a className="link">
            <div className="link__inner">
              <span className="link__text">{name}</span>
              <Icon name="icon_arrow_right" size="middle" className="link__icon" />
            </div>
          </a>
        </Link>
      </div>
    )
  } else if (mediaId && mediaId.length > 0) {
    const fileurl =
      process.env.NEXT_PUBLIC_MEDIAHOST + `` + process.env.NEXT_PUBLIC_MEDIAPREFIX + '/media' + url.split('/media')[1]
    return (
      <div className={divclass}>
        <Link href={fileurl}>
          <a className="link" target="_blank" rel="noreferrer">
            <div className="link__inner">
              <Icon name="icon_download" size="middle" className="link__icon" />
              <span className="link__text">{name}</span>
            </div>
          </a>
        </Link>
      </div>
    )
  } else if (url.indexOf('/media') > -1) {
    const fileurl =
      process.env.NEXT_PUBLIC_MEDIAHOST + `` + process.env.NEXT_PUBLIC_MEDIAPREFIX + '/media' + url.split('/media')[1]
    return (
      <div className={divclass}>
        <Link href={fileurl}>
          <a className="link" target="_blank" rel="noreferrer">
            <div className="link__inner">
              <Icon name="icon_download" size="middle" className="link__icon" />
              <span className="link__text">{name}</span>
            </div>
          </a>
        </Link>
      </div>
    )
  } else if (target === '_blank' || url.startsWith('http')) {
    return (
      <div className={divclass}>
        <Link href={url}>
          <a className="link" target="_blank" rel="noreferrer">
            <div className="link__inner">
              <span className="link__text">{name}</span>
              <Icon name="icon_external_link" size="middle" className="link__icon" />
            </div>
          </a>
        </Link>
      </div>
    )
  } else {
    return (
      <Link href={url}>
        <a className="link" target="_blank" rel="noreferrer">
          <div className="link__inner">
            <span className="link__text">{name}</span>
          </div>
        </a>
      </Link>
    )
  }
  */
}
