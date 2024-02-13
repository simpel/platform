import useSWR from 'swr'
import { type TCsrf } from '../withSession/TWithSession'

const fetcher = async (url: string) =>
	fetch(url).then(async (response) => response.json())

export default function useCsrf() {
	return useSWR<TCsrf, Error>('/api/csrf', fetcher)
}
