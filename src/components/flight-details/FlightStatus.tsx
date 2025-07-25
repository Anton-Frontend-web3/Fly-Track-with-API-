import { FlightProgress } from '../flight-list/FlightProgress'
interface Props {
	progress: number
}

export function FlightStatus({ progress }: Props) {
	return (
		<section className='bg-background flex h-24 w-full flex-col justify-center rounded-3xl p-4'>
			<FlightProgress progress={progress}></FlightProgress>

			<div className='flex justify-between text-sm opacity-50 pt-6'>
				<div className='flex gap-1'>
					<span>2 715 km</span>
					<span>·</span>
					<span>3h 1m</span>
				</div>
				<div className='flex gap-1'>
					<span>882 km</span>
					<span>·</span>
					<span>59m</span>
				</div>
			</div>
		</section>
	)
}
