import type { PropsFlight } from './FlightHeader'

export function FlightInformation({ flight }: PropsFlight) {
	if (!flight) return null

	return (
		<section className='mx-2 flex w-full flex-col gap-1 overflow-hidden rounded-2xl'>
			<div className='bg-background p-3 hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'>
				<h4 className=''>Flight information</h4>
			</div>

			<div className='grid grid-cols-2 gap-1'>
				<div className='bg-background p-3 hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'>
					<span>{flight.airplane.name}</span>
				</div>

				<div className='bg-background flex items-center gap-2 p-3 hover:bg-[var(--background-hover)] active:bg-[var(--background-active)] '>
					<img
						src={`flags/${flight.company.toLowerCase()}-flag.svg`}
						alt={flight.company}
						width={20}
						height={15}
					/>
					<span>{flight.company}</span>
				</div>

				<div className='bg-background flex items-baseline gap-2 p-3 hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'>
					<span>Speed</span>
					<span>{flight?.route?.speed} km/h</span>
				</div>

				<div className='bg-background flex items-baseline gap-2 p-3 hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'>
					<span>Altitude</span>
					<span>{flight?.route?.altitude} m</span>
				</div>
			</div>
		</section>
	)
}
