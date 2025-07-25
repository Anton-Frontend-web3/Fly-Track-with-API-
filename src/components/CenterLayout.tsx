import { Outlet } from 'react-router-dom'

export function CenterLayout() {
	return (
		<div className='h-full mx-auto mt-10 xs:mt-0 max-w-7xl px-4 sm:px-6 lg:px-8'>
			<Outlet />
		</div>
	)
}
