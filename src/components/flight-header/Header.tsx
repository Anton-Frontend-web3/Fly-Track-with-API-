import { ThemeToggle } from '@/provider/ThemeToggle'
import { menu } from './menu.data'
import { MenuItem } from './MenuItem'

export function Header() {
	return (
		<header className='bg-background absolute top-7 left-1/2 gap-1 flex -translate-x-1/2  items-center justify-center rounded-3xl lg:relative lg:top-0 lg:mb-5 lg:w-max lg:rounded-xl sm:rounded-lg xl:top-1'>
			<nav className='flex gap-3 p-3 sm:gap-1.5'>
				{menu.map(item => (
					<MenuItem
						key={item.label}
						item={item}
					></MenuItem>
				))}
			</nav>
			<div className='pr-1 left-1/2 flex items-center justify-center -translate-x-1/2'>
				<ThemeToggle></ThemeToggle>
			</div>
		</header>
	)
}
