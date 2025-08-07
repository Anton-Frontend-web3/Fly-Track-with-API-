export interface Coordinates {
	lat: number
	lng: number
}

export interface Location {
	city: string
	country: string
	countryCode: string
	code: string
	coordinates: [number, number]
	timezone?: string
}

export interface Airplane {
	aviaCompany: string
	name: string
	image: string
	flag?: string
}

export interface IFlightRoute {
	speed: number
	altitude: number
}

export interface IFlight {
	airline: string
	company: string
	aircraftReg: string
	companyLogo: string
	from: Location
	to: Location
	airplane: Airplane
	progress: number
	id: string
	route?: IFlightRoute
}
