import { useEffect, useMemo, useState } from 'react'
import { SkeletonLoader } from '../custom-ui/SkeletonLoader'
import { FlightFilter } from '../filters/FlightFilter'
import { FlightCard } from './FlightCard'
import { FLIGHTS } from './flights.data'

export function FlightList() {
	const [isLoading, setLoading] = useState(true)
	const [fromCountry, setCountry] = useState<string | null>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 1500)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	const filterFlights = useMemo(() => {
		if (!fromCountry) return FLIGHTS
		return FLIGHTS.filter(flight => flight.from.country === fromCountry)
	}, [fromCountry])

	return (
		<div className='w-120 xs:w-full md:w-xs'>
			<FlightFilter
				fromCountry={fromCountry}
				setCountry={setCountry}
			></FlightFilter>
			<div className='flex flex-col gap-4 pt-3 '>
				{isLoading ? (
					<SkeletonLoader
						className={'h-40'}
						count={filterFlights.length}
					/>
				) : (
					!!filterFlights.length &&
					filterFlights.map(flight => (
						<FlightCard
							flight={flight}
							key={flight.airline}
						/>
					))
				)}
			</div>
		</div>
	)
}
