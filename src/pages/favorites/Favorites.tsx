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
		<div className='text-3xl text-white/80'>
			<span>Favorites</span>
			<p className='text-white/80 text-lg'>You have {favoritesFlights.length} saved flight{favoritesFlights.length !== 1 ? 's' : ''}.</p>
			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
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
	)
}
