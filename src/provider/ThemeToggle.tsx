import { Moon, Sun } from 'lucide-react'
import { useTheme } from './useTheme'
export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme()
	return (
		<button className='cursor-pointer'
			onClick={() => {
				toggleTheme()
			}}
		>
			{theme === 'dark' ? <Moon /> : <Sun />}
		</button>
	)
}
