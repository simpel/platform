import process from 'process'

/**
 * Constructs the full media URL by combining the media host, media prefix, and the provided media URL.
 * @param mediaUrl - The relative path of the media file.
 * @returns The full media URL.
 */

export const getMediaUrl = (mediaUrl: string) => {
	return `${process.env.NEXT_PUBLIC_MEDIAHOST}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${mediaUrl}`
}
