// export const srt = (key: string) => (a: Record<string, unknown>, b: Record<string, unknown>) =>
//   a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0

export function listBrands(vipBrands: string[]): string {
	return vipBrands.reduce((acc, brand) => (acc += ',' + brand))
}
