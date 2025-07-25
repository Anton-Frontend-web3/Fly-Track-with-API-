import { Outlet } from 'react-router-dom'
import { Header } from './flight-header/Header'

export function Layout() {
	// min-h-screen
	return (
		<div className='xs:p-2.5 relative flex h-screen p-7 sm:p-3'>
			<h1 hidden>SkyTrack – flight tracking service</h1>
			<Header></Header>
			<main className='mt-5 flex-1 overflow-hidden'>
				<Outlet />
			</main>
		</div>
	)
}
