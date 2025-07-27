import type { IFlight } from '../../types/flight.types'

const getCurrentCoordinates = (
	from: [number, number],
	to: [number, number],
	progressPercent: number
): [number, number] => {
	const ratio = progressPercent / 100
	const lat = from[0] + (to[0] - from[0]) * ratio
	const lng = from[1] + (to[1] - from[1]) * ratio
	return [lat, lng]
}

export const FLIGHTS: IFlight[] = [
	{
		logo: 'logos-airlines/turkish.svg',
		airline: 'TK143',
		aircraftReg: 'TC-JFP',
		airlineCountry: 'Turkey',
		from: {
			city: 'Sofia',
			country: 'Bulgaria',
			countryCode: 'BG',
			timezone: 'UTC +3',
			code: 'SOF',
			coordinates: [42.6977, 23.3219]
		},
		to: {
			city: 'Beijing',
			country: 'China',
			countryCode: 'CN',
			timezone: 'UTC +8',
			code: 'PEK',
			coordinates: [39.9042, 116.4074]
		},
		airplane: {
			image: 'aircrafts/01_turkish_airbus-A330.png',
			name: 'Airbus A330'
		},
		colorGradient: ['#ffdede', '#ffbaba'],
		route: {
			speed: 870,
			altitude: 10600
		},
		progress: 75,
		currentLocation: {
			coordinates: getCurrentCoordinates(
				[42.6977, 23.3219],
				[39.9042, 116.4074],
				75
			)
		}
	},
	{
		logo: 'logos-airlines/ryanair.svg',
		airline: 'RN1782',
		airlineCountry: 'Ireland',
		aircraftReg: 'D-AISP',
		from: {
			city: 'Dublin',
			country: 'Ireland',
			countryCode: 'IE',
			timezone: 'UTC +1',
			code: 'DUB',
			coordinates: [53.3498, -6.2603]
		},
		to: {
			city: 'Larnaca',
			country: 'Cyprus',
			countryCode: 'CY',
			timezone: 'UTC +3',
			code: 'LCA',
			coordinates: [34.9167, 33.6233]
		},
		airplane: {
			image: 'aircrafts/02_Ryanair_Boeing-737-800.png',
			name: 'Boeing 737-800'
		},
		colorGradient: ['#A1C6E1', '#88B5E0'],
		route: {
			speed: 840,
			altitude: 11200
		},
		progress: 50,
		currentLocation: {
			coordinates: getCurrentCoordinates(
				[53.3498, -6.2603],
				[34.9167, 33.6233],
				50
			)
		}
	},
	{
		logo: 'logos-airlines/s7.svg',
		airline: 'S7124',
		aircraftReg: 'RA-73415',
		airlineCountry: 'Russia',
		from: {
			city: 'Nice',
			country: 'France',
			countryCode: 'FR',
			timezone: 'UTC +2',
			code: 'NCE',
			coordinates: [43.7102, 7.262]
		},
		to: {
			city: 'Tbilisi',
			country: 'Georgia',
			countryCode: 'GE',
			timezone: 'UTC +4',
			code: 'TBS',
			coordinates: [41.7151, 44.8271]
		},
		airplane: {
			image: 'aircrafts/03_s7_Airbus-A320.png',
			name: 'Airbus A320neo'
		},
		colorGradient: ['#d6ffe5', '#96f2c1'],
		route: {
			speed: 860,
			altitude: 10900
		},
		progress: 70,
		currentLocation: {
			coordinates: getCurrentCoordinates(
				[43.7102, 7.262],
				[41.7151, 44.8271],
				70
			)
		}
	},
	{
		logo: 'logos-airlines/swiss.svg',
		airline: 'LX318',
		aircraftReg: 'HB-JHK',
		airlineCountry: 'Switzerland',
		from: {
			city: 'Porto',
			country: 'Portugal',
			countryCode: 'PT',
			timezone: 'UTC +1',
			code: 'OPO',
			coordinates: [41.1579, -8.6291]
		},
		to: {
			city: 'Baku',
			country: 'Azerbaijan',
			countryCode: 'AZ',
			timezone: 'UTC +4',
			code: 'GYD',
			coordinates: [40.4093, 49.8671]
		},
		airplane: {
			image: 'aircrafts/04_SWISS_Airbus-A321.png',
			name: 'Airbus A220-300'
		},
		colorGradient: ['#e6e6ff', '#a8b4ff'],
		route: {
			speed: 830,
			altitude: 10700
		},
		progress: 85,
		currentLocation: {
			coordinates: getCurrentCoordinates(
				[41.1579, -8.6291],
				[40.4093, 49.8671],
				85
			)
		}
	},
	{
		logo: 'logos-airlines/lufthansa.svg',
		airline: 'LH401',
		aircraftReg: 'D-AIXD',
		airlineCountry: 'Germany',
		from: {
			city: 'Burgas',
			country: 'Bulgaria',
			countryCode: 'BG',
			timezone: 'UTC +3',
			code: 'BOJ',
			coordinates: [42.5048, 27.4716]
		},
		to: {
			city: 'Muscat',
			country: 'Oman',
			countryCode: 'OM',
			timezone: 'UTC +4',
			code: 'MCT',
			coordinates: [23.588, 58.3829]
		},
		airplane: {
			image: 'aircrafts/05_Lufthansa_Airbus-A350-900.png',
			name: 'Airbus A350-900'
		},
		colorGradient: ['#e5f2ff', '#9dd2f9'],
		route: {
			speed: 890,
			altitude: 11300
		},
		progress: 48,
		currentLocation: {
			coordinates: getCurrentCoordinates(
				[42.5048, 27.4716],
				[23.588, 58.3829],
				48
			)
		}
	}
]
