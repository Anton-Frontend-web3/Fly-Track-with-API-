import { FlightDetails } from '@/components/flight-details/FlightDetails'

import { FlightList } from '@/components/flight-list/FlightList'

export function HomePage() {
	return (
		<div className='flex h-full gap-7'>
			<FlightList></FlightList>
			<FlightDetails></FlightDetails>
		</div>
	)
}
