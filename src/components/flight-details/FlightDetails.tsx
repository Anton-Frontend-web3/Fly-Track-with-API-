import { AnimatePresence, m } from 'framer-motion'

import { useCurrentFlight } from '@/hooks/useCurrentFlight'
import { FlightActions } from './FlightActions'
import { FlightHeader } from './FlightHeader'
import { FlightInformation } from './FlightInformation'
import { FlightRoute } from './FlightRoute'
import { FlightSchedule } from './FlightSchedule'
import { FlightStatus } from './FlightStatus'

export function FlightDetails() {
	const { flight } = useCurrentFlight()

	if (!flight) {
		return null
	}

	return (
		<AnimatePresence mode='wait'>
			<m.aside
				key={flight.aircraftReg}
				initial={{ x: '100%', opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: '100%', opacity: 0 }}
				transition={{
					type: 'tween',
					duration: 0.3,
					ease: [0.17, 0.67, 0.83, 0.67]
				}}
				className='absolute z-10 top-7 right-7 flex max-h-[92vh] w-130 flex-col overflow-hidden rounded-3xl sm:inset-[0.6rem] sm:top-26 sm:w-[96%] md:top-28 md:w-[25rem] lg:top-32 xl:top-24 2xl:top-26'
			>
				<h2 hidden>{flight.aircraftReg} information</h2>
				<div className='scrollbar-hide flex-1 overflow-y-auto'>
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
			</m.aside>
		</AnimatePresence>
	)
}
