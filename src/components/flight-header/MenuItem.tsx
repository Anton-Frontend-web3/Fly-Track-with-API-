import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'
import { AnimateIcon } from '../animate-ui/icons/icon'
import type { IHeaderMenu } from './menu.data'

export interface IMenuItemProps {
	item: IHeaderMenu
}

export function MenuItem({ item }: IMenuItemProps) {
	const IconComponent = item.icon
	return (
		<NavLink
			to={item.to}
			className={({ isActive }) =>
				cn(
					'flex items-center gap-1.5 rounded-lg p-2 transition-colors duration-300 sm:text-base',
					isActive
						? 'bg-secondary text-foreground shadow-inner'
						: 'text-foreground hover:bg-secondary hover:text-foreground'
				)
			}
		>
			<AnimateIcon animateOnHover>
				<div className='flex gap-1.5'>
					<IconComponent
						className='h-6 w-6'
						size={24}
					></IconComponent>
					<span className=''>{item.label}</span>
				</div>
			</AnimateIcon>
		</NavLink>
	)
}
