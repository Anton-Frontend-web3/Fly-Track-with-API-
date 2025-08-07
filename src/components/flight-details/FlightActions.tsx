import { triggerAnimateRoute, triggerFollow } from '@/store/map/map.slice'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
const actions = [
	{
		label: 'Route',
		icon: 'actions-icons/Route.svg'
	},
	{
		label: 'Follow',
		icon: 'actions-icons/Follow.svg'
	},

	{
		label: 'Share',
		icon: 'actions-icons/Vector.svg'
	},
	{
		label: 'Source Code',
		icon: 'actions-icons/github.svg'
	}
]

export function FlightActions() {
	//Set Landing Alert: (Более сложная)
	// Позволить пользователю "подписаться" на уведомление, которое придет, когда самолет приземлится.
	// Требует работы с Notifications API в браузере.
	const dispatch = useDispatch()
	const [isCopied, setIsCopied] = useState(false)
	const handleActionClick = (label: string) => {
		switch (label) {
			case 'Route':
				dispatch(triggerAnimateRoute())
				break
			case 'Follow':
				dispatch(triggerFollow())
				break
			case 'Share':
				navigator.clipboard.writeText(window.location.href).then(() => {
					setIsCopied(true)
					setTimeout(() => {
						setIsCopied(false)
					}, 1500)
				})
				break
			case 'Source Code':
				window.open('https://github.com/Anton-Frontend-web3/Sky-Track', '_blank');
				break
		}
	}

	return (
		<section className='flex w-full gap-1 overflow-hidden rounded-4xl'>
			{actions.map(action => (
				<button
					key={action.label}
					onClick={() => handleActionClick(action.label)}
					className='bg-background flex flex-1 items-center justify-center gap-1 px-4 py-2 transition-colors hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'
				>
					<img
						src={action.icon}
						alt={action.label}
						className='fill-foreground'
					/>
					<span className='text-xs'>
						{isCopied && action.label == 'Share' ? 'URL Copied!' : action.label}
					</span>
				</button>
			))}
		</section>
	)
}
