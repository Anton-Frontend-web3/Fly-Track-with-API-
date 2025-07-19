import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { FLIGHTS } from '../flight-list/flights.data'

interface Props {
	fromCountry: string | null
	setCountry: (country: string | null) => void
}

const fromCountries = [...new Set(FLIGHTS.map(flight => flight.from.country))]

export function FlightFilter({ fromCountry, setCountry }: Props) {
	return (
		<Select
			onValueChange={value => setCountry(value === 'all' ? null : value)}
			value={fromCountry || ''}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select from' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='all'>All</SelectItem>
				{fromCountries.map(country => (
					<SelectItem
						key={country}
						value={country}
					>
						{country}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
