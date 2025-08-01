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
	timezone?: string // Поле timezone опционально, так как оно есть только в 'to'
}

export interface Airplane {
	aviaCompany: string
	name: string
}

export interface IFlightRoute {
	speed: number
	altitude: number
}

export interface IFlight {
	airline: string
	company: string
	aircraftReg: string
	from: Location
	to: Location
	airplane: Airplane
	progress: number
	id: string
    route:IFlightRoute
}
