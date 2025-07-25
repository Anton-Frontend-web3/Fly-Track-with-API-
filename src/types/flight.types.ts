export interface IFlightLocation {
	city: string
	country: string
	countryCode: string
	timezone: string
	code: string
	coordinates: [number, number]
}

export interface IFlightAirplane {
	image: string
	name: string
}

export interface IFlightRoute {
	speed: number
	altitude: number
}

export interface IFlight {
	logo: string
	airline: string
	aircraftReg: string
	airlineCountry: string
	from: IFlightLocation
	to: IFlightLocation
	airplane: IFlightAirplane
	route: IFlightRoute
	colorGradient: [string, string]
	progress: number
	currentLocation: Pick<IFlightLocation, 'coordinates'>
}
