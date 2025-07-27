import { useEffect, useMemo, useState } from 'react'
import { SkeletonLoader } from '../custom-ui/SkeletonLoader'
import { FlightFilter } from '../filters/FlightFilter'
import { FlightCard } from './FlightCard'
import { FLIGHTS } from './flights.data'

export function FlightList() {
	const [isLoading, setLoading] = useState(true)
	const [fromCountry, setCountry] = useState<string | null>(null)
	const [toCountry, setToCountry] = useState<string | null>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 1500)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	const filterFlights = useMemo(() => {
		return FLIGHTS.filter(flight => {
			if (toCountry && flight.to.country !== toCountry) return false
			if (fromCountry && flight.from.country !== fromCountry) return false
			return true
		})
	}, [fromCountry, toCountry])

	return (
		//

		<div className='xs:w-full xs:p-2.5 px-7 sm:px-3 mb-7  absolute z-10 top-7 left-0 bottom-7 flex  w-120 flex-col xl:top-25 md:w-xs lg:w-sm'>
			<FlightFilter
				fromCountry={fromCountry}
				setCountry={setCountry}
				toCountry={toCountry}
				setToCountry={setToCountry}
			></FlightFilter>
			<div className='scrollbar-hide flex flex-1 flex-col gap-4 overflow-y-auto pt-3'>
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
