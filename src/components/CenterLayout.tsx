import { Outlet } from 'react-router-dom'

export function CenterLayout() {
	return (
		<div className='mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
			<Outlet />
		</div>
	)
}
