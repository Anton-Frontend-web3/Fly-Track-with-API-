import { FlightDetails } from '@/components/flight-details/FlightDetails'

import { FlightList } from '@/components/flight-list/FlightList'
import { SkyTrackMap } from '@/components/skyTrackMap/skyTrackMap'

export function HomePage() {
	return (
		<div className='flex h-full gap-7'>
			<FlightList></FlightList>
			<FlightDetails></FlightDetails>
			<div className='absolute inset-0 z-0'>
				<SkyTrackMap></SkyTrackMap>
			</div>
		</div>
	)
}
