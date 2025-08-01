import AviationService from '@/services/aviantion.serves'
import type { IFlight } from '@/services/aviation.types'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useRef, useState } from 'react'
import { RefreshCw } from '../animate-ui/icons/refresh-cw'
import { SkeletonLoader } from '../custom-ui/SkeletonLoader'
import { FlightFilter } from '../filters/FlightFilter'
import { Button } from '../ui/button'
import { FlightCard } from './FlightCard'
import { formatDate } from './format-date'

export function FlightList() {
	const [fromCountry, setCountry] = useState<string | null>(null)
	const [toCountry, setToCountry] = useState<string | null>(null)
	const lastUpdateRef = useRef<Date | null>(null)
	const {
		data: flights = [],
		isLoading,
		refetch,
		isRefetching
	} = useQuery<IFlight[], Error>({
		queryKey: ['flights'],
		queryFn: async () => {
			const result = await AviationService.getFlights()
			lastUpdateRef.current = new Date()

			return result
		}
	})

	const filterFlights = useMemo(() => {
		return flights.filter(flight => {
			if (toCountry && flight.to.country !== toCountry) return false
			if (fromCountry && flight.from.country !== fromCountry) return false
			return true
		})
	}, [flights, fromCountry, toCountry])

	return (
		//

		<div className='xs:w-full xs:p-2.5 absolute top-7 bottom-7 left-0 z-10 mb-7 flex w-120 flex-col px-7 sm:px-3 md:w-xs lg:w-sm xl:top-25'>
			<div className='flex gap-10'>
				<FlightFilter
					fromCountry={fromCountry}
					setCountry={setCountry}
					toCountry={toCountry}
					setToCountry={setToCountry}
				></FlightFilter>

				<Button
					onClick={() => refetch()}
					disabled={isRefetching}
				>
					<RefreshCw animateOnHover />
				</Button>
			</div>
			{lastUpdateRef.current && (
				<div className='text-muted-foreground mt-4 text-sm'>
					{isRefetching ? (
						<>Updating...</>
					) : (
						<>Last update: {formatDate(lastUpdateRef.current)}</>
					)}
				</div>
			)}
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
							key={flight.id}
						/>
					))
				)}
			</div>
		</div>
	)
}
