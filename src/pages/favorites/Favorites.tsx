import { SkeletonLoader } from '@/components/custom-ui/SkeletonLoader'
import { FlightCard } from '@/components/flight-list/FlightCard'
import { useAppSelector } from '@/hooks/useAppSelector'
import AviationService from '@/services/aviantion.serves'
import type { IFlight } from '@/services/aviation.types'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function Favorites() {
	const favorites = useAppSelector(state => state.favorites)

	const {
		data: allFlights = [],
		isLoading,
		isError,
		error
	} = useQuery<IFlight[], Error>({
		queryKey: ['flights'],
		queryFn: () => AviationService.getFlights()
	})

	const favoritesFlights = useMemo(() => {
		return allFlights.filter(flight => favorites.includes(flight.aircraftReg))
	}, [allFlights, favorites])
	if (isLoading) {
		return (
			<div className='flex h-full flex-col text-3xl text-white/80'>
				<span>Favorites</span>
				<p className='text-lg text-white/80'>
					Loading your favorite flights...
				</p>
				<div className='scrollbar-hide flex-1 overflow-y-auto pt-4'>
					<SkeletonLoader
						className={'h-40'}
						count={3}
					/>
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='flex h-full flex-col text-3xl text-red-500'>
				<span>Error</span>
				<p className='text-lg'>Failed to load flights: {error.message}</p>
			</div>
		)
	}

	return (
		<div className='flex h-full flex-col text-3xl text-white/80'>
			<span>Favorites</span>
			<p className='text-lg text-white/80'>
				You have {favoritesFlights.length} saved flight
				{favoritesFlights.length !== 1 ? 's' : ''}.
			</p>
			<div className='scrollbar-hide flex-1 overflow-y-auto pt-4'>
				<div className='xs:grid-cols-1 grid grid-cols-3 gap-3 sm:grid-cols-2'>
					{favoritesFlights.length > 0 ? (
						favoritesFlights.map(flight => (
							<FlightCard
								flight={flight}
								key={flight.id}
							/>
						))
					) : (
						<p className='mt-4 text-lg text-white/60'>
							You have no favorite flights yet.
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
