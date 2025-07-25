import { FLIGHTS } from '../flight-list/flights.data'
import { FilterSearchSelect } from './FilterSearchSelect'

interface IFlightFilterProps {
	fromCountry: string | null
	setCountry: (country: string | null) => void

	toCountry: string | null
	setToCountry: (country: string | null) => void
}

const fromCountries = [...new Set(FLIGHTS.map(flight => flight.from.country))]
const toCountries = [...new Set(FLIGHTS.map(flight => flight.to.country))]

export function FlightFilter({
	fromCountry,
	setCountry,
	toCountry,
	setToCountry
}: IFlightFilterProps) {
	return (
		<div className='grid grid-cols-2 gap-1 pl-5 sm:pl-0 xl:pl-0'>
			<FilterSearchSelect
				value={fromCountry}
				onChange={setCountry}
				data={fromCountries}
				entityTitle='From'
			></FilterSearchSelect>
			<FilterSearchSelect
				value={toCountry}
				onChange={setToCountry}
				data={toCountries}
				entityTitle='To'
			></FilterSearchSelect>
		</div>
	)
}
