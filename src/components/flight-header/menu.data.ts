import { Heart } from '@/components/animate-ui/icons/heart'
import { UserRound } from '@/components/animate-ui/icons/user-round'
import CompanyLogo from '@/images/CompanyLogo.svg?react'
import type { ComponentType } from 'react'

interface IconProps {
	className?: string
	size?: number
}

export interface IHeaderMenu {
	label: string
	icon: ComponentType<IconProps>
	to: string
}

export const menu: IHeaderMenu[] = [
	{
		label: 'Home',
		icon: CompanyLogo,
		to: '/'
	},
	{
		label: 'Profile',
		icon: UserRound,
		to: '/user'
	},

	{
		label: 'Favorites',
		icon: Heart,
		to: '/favorites'
	}
]
