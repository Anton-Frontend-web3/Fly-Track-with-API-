import { X } from '@/components/animate-ui/icons/x'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'
import type { IFlight } from '../../types/flight.types'
export interface PropsFlight {
	flight: IFlight
}

export function FlightHeader({ flight }: PropsFlight) {
	const gradientStyle = {
		backgroundImage: `linear-gradient(to right, ${flight.colorGradient[0]}, ${flight.colorGradient[1]})`
	}
	return (
		<section
			className='relative p-5'
			style={gradientStyle}
		>
			<div className={cn('bg-secondary m-5 flex justify-between rounded-2xl')}>
				<div className='space-y-2 p-5'>
					<span className='text-2xl text-[#FBA316]'>{flight.aircraftReg}</span>
					<p>{flight.airline}</p>
				</div>
				<Link
					to={'/'}
					className='bg-muted/10 m-7 flex h-10 w-10 cursor-pointer items-center justify-center rounded-4xl transition-all delay-300 ease-in-out hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'
				>
					<X
						animateOnTap
						animateOnHover
						className=''
						size={20}
					></X>
				</Link>
			</div>
			<div>
				<img
					src={flight.airplane.image}
					alt=''
					width={480}
					height={216}
				/>
			</div>
		</section>
	)
}
