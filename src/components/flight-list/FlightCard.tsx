import { useSearchParams } from 'react-router-dom'
import type { IFlight } from '../../types/flight.types'
import { cn } from '../../utils/cn'
import { QUERY_PARAM_FLIGHT } from './flight.constants'

import { FavoriteCardAction } from './actions/FavoriteCardAction'
import { FlightProgress } from './FlightProgress'

interface Props {
	flight: IFlight
}

export function FlightCard({ flight }: Props) {
	const [searchParams, setSearchParams] = useSearchParams()
	const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT)

	const isActive = selectedFlight === flight.aircraftReg

	return (
		<div
			className={cn(
				'w-full cursor-pointer rounded-3xl p-0.5 transition-colors ease-in animate-slideLeft',
				isActive
					? 'bg-gradient-to-r from-rose-500 to-orange-400'
					: 'bg-transparent'
			)}
		>
			<div
				onClick={() => {
					setSearchParams({
						[QUERY_PARAM_FLIGHT]: flight.aircraftReg
					})
				}}
				className={cn(
					'bg-background text-card-foreground block h-full w-full rounded-3xl p-5'
				)}
			>
				<div className='mb-5 flex items-center justify-between'>
					<div className='flex items-center gap-5'>
						<img
							src={flight.logo}
							alt={flight.airline}
							width={50}
							height={50}
							className='rounded-full bg-white'
						/>
						<p className='font-jetbrains text-base font-normal'>
							{flight.airline}
						</p>
					</div>
					<div className='flex items-center gap-4'>
						<span className='font-jetbrains bg-muted/30 rounded-3xl p-2.5 text-xs'>
							{flight.aircraftReg}
						</span>
						<FavoriteCardAction
							aircraftReg={flight.aircraftReg}
						></FavoriteCardAction>
					</div>
				</div>
				<div className='grid grid-cols-[1fr_5fr_1fr] items-end gap-4'>
					<div className='font-jetbrains text-left'>
						<div className='text-base font-normal'>{flight.from.city}</div>
						<div className='text-5xl font-medium'>{flight.from.code}</div>
					</div>
					<div className='mb-6'>
						<FlightProgress progress={flight.progress}></FlightProgress>
					</div>
					<div>
						<div className='text-base font-normal'>{flight.to.city}</div>
						<div className='text-5xl font-medium'>{flight.to.code}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
