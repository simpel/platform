export type VipObject = {
	name: string
	vip: string
	slug: string
	key?: string
	vipBrands?: string[]
}

export type VipSearchParams = {
	brand?: string
	variant: string
	lat?: number
	long?: number
	zip?: number
	miles: number
	storeType?: 'on' | 'off'
}

export type VipKey = {
	custId: string
	secret: string
}

export type VipLocation = {
	dba: string // "120 WEST 58TH STREET WINE & LIQUOR"
	street: string // "120 W 58TH ST"
	city: string // "NEW YORK"
	state: string // "NY"
	zip: string // "10019"
	lat: string // "40.76532"
	long: string // "-73.9776"
	phone: string // "2122650333"
	storeType: string // "03"
	storeTypeRollup: string // "off"
	lastSold: string // "20191231"
	delivery: string // ""
	takeaway: string // ""
	distance: string // "0.2"
}
