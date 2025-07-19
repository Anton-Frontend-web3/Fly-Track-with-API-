import { Plane } from 'lucide-react'
interface Props {
	progress: number
}

export function FlightProgress({ progress }: Props) {
	return (
		<div className='h-1 w-full rounded-full bg-neutral-900/20 dark:bg-white/10'>
			<div
				className='relative h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-500 ease-in-out'
				style={{ width: `${progress}%` }}
			>
				<Plane
					size={26}
					strokeWidth={0}
					className='fill-foreground absolute top-1/2 right-0 -translate-y-1/2 rotate-45'
				/>
			</div>
		</div>
	)
}
