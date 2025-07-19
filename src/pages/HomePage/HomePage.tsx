import { FlightDetails } from '@/components/flight-details/FlightDetails'

import { FlightList } from '@/components/flight-list/FlightList'

export function HomePage() {
	return (
		<div>
			<FlightList></FlightList>
			<FlightDetails></FlightDetails>
		</div>
	)
}
