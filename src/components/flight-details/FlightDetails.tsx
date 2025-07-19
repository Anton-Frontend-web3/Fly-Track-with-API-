import { useSearchParams } from 'react-router-dom'
import { QUERY_PARAM_FLIGHT } from '../flight-list/flight.constants'
import { FLIGHTS } from '../flight-list/flights.data'
import { FlightActions } from './FlightActions'
import { FlightHeader } from './FlightHeader'
import { FlightInformation } from './FlightInformation'
import { FlightRoute } from './FlightRoute'
import { FlightSchedule } from './FlightSchedule'
import { FlightStatus } from './FlightStatus'

export function FlightDetails() {
	const [searchParams] = useSearchParams()
	const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT)

	const flight = FLIGHTS.find(flight => flight.aircraftReg === selectedFlight)

	if (!flight) {
		return null
	}

	return (
		<aside className='xs: scrollbar-hidden absolute top-7 right-7 flex max-h-[92vh] w-130 flex-col overflow-hidden rounded-3xl sm:inset-[0.6rem] sm:top-26 sm:w-[96%] md:top-28 md:w-[25rem]'>
			<h2 hidden>{flight.aircraftReg} information</h2>
			<div className='flex-1 overflow-y-auto'>
				<FlightHeader flight={flight}></FlightHeader>

				<div className='bg-secondary p-4'>
					<div className='flex flex-col items-center justify-center gap-2.5'>
						<h3 hidden>Additional flight information</h3>
						<FlightRoute flight={flight}></FlightRoute>
						<FlightStatus progress={flight.progress}></FlightStatus>
						<FlightSchedule></FlightSchedule>
						<FlightInformation flight={flight}></FlightInformation>
						<FlightActions></FlightActions>
					</div>
				</div>
			</div>
		</aside>
	)
}
