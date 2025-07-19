import { Link } from 'react-router-dom'

const actions = [
	{
		label: 'Route',
		icon: '/actions-icons/Route.svg',
		to: '/Follow'
	},
	{
		label: 'Follow',
		icon: '/actions-icons/Follow.svg',
		to: '/Follow'
	},

	{
		label: 'Share',
		icon: '/actions-icons/Vector.svg',
		to: '/Share'
	},
	{
		label: 'More',
		icon: '/actions-icons/More.svg',
		to: '/More'
	}
]

export function FlightActions() {
	return (
		<section className='flex gap-1 overflow-hidden rounded-4xl w-full'>
			{actions.map(action => (
				<Link
					key={action.label}
					to={action.to}
					className='bg-background flex-1 flex items-center justify-center px-4 py-2 transition-colors hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]'
				>
					<img
						src={action.icon}
						alt={action.label}
					/>
					<span>{action.label}</span>
				</Link>
			))}
		</section>
	)
}
