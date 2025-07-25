import { QUERY_PARAM_FLIGHT } from '@/components/flight-list/flight.constants'
import { FLIGHTS } from '@/components/flight-list/flights.data'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useCurrentFlight = () => {
	const [searchParams] = useSearchParams()
	const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT)

	const flight = useMemo(
		() => FLIGHTS.find(flight => flight.aircraftReg === selectedFlight),
		[selectedFlight]
	)
	return { flight }
}
