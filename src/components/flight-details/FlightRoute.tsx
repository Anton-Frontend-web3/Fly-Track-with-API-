import type { IFlight } from '@/services/aviation.types'

interface Props {
	flight: IFlight
}
export function FlightRoute({ flight }: Props) {
	return (
		<section className='relative flex w-full flex-1 items-stretch justify-center gap-1 p-0 overflow-hidden rounded-3xl'>
			<div className='bg-background  flex flex-1 flex-col items-center justify-stretch text-center  hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'>
				<span className='font-medium text-5xl'>{flight.from.code}</span>
				<span className='font-normal text-2xl'>{flight.from.city}</span>
				<span className='font-normal'>{flight.from.timezone}</span>
			</div>
			<div className='bg-secondary text-accent absolute top-1/2 aspect-square -translate-y-1/2 rounded-full p-2'>
				<img src="icons/AirplaneUp.svg" alt="AirplaneUp Icon" />
			</div>
			
			<div className='bg-background flex flex-1 flex-col items-center justify-stretch text-center hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'>
				<span className='font-medium text-5xl'>{flight.to.code}</span>
				<span className='font-normal text-2xl '>{flight.to.city}</span>
				<span className='font-normal'>{flight.to.timezone}</span>
			</div>
		</section>
	)
}
