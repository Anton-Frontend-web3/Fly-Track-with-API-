import { Outlet } from 'react-router-dom'

export function CenterLayout() {
	return (
		<div className='absolute z-10   top-7 bt-6 bottom-7 xs:mt-0 max-w-7xl xs:max-w-screen xs:top-25 w-max px-4 sm:px-6 lg:px-8 left-1/2 -translate-x-1/2'>
			<Outlet />
		</div>
	)
}
