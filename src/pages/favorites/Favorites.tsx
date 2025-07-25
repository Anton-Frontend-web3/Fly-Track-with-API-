import { FlightCard } from '@/components/flight-list/FlightCard'
import { FLIGHTS } from '@/components/flight-list/flights.data'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useMemo } from 'react'

export function Favorites() {
	const favorites = useAppSelector(state => state.favorites)

	const favoritesFlights = useMemo(() => {
		return FLIGHTS.filter(flight => favorites.includes(flight.aircraftReg))
	}, [favorites])

	return (
		<div className='flex h-full flex-col text-3xl text-white/80'>
			<span>Favorites</span>
			<p className='text-lg text-white/80'>
				You have {favoritesFlights.length} saved flight
				{favoritesFlights.length !== 1 ? 's' : ''}.
			</p>
			<div className='scrollbar-hide flex-1 overflow-y-auto'>
				<div className='xs:grid-cols-1 grid grid-cols-3 gap-3 sm:grid-cols-2'>
					{favoritesFlights.length > 0 ? (
						favoritesFlights.map(flight => (
							<FlightCard
								flight={flight}
								key={flight.aircraftReg}
							/>
						))
					) : (
						<p className='text-white/60'>You have no favorite flights yet.</p>
					)}
				</div>
			</div>
		</div>
	)
}
