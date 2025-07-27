import { Outlet } from 'react-router-dom'
import { Header } from './flight-header/Header'
import { SkyTrackMap } from './skyTrackMap/skyTrackMap'

export function Layout() {
	// min-h-screen
	return (
		<div className='relative h-screen '>
			<h1 hidden>SkyTrack – flight tracking service</h1>

			<SkyTrackMap />

			<div className=' flex h-screen '>
			<main className='mt-5 flex-1 overflow-hidden'>
				<Outlet />
			</main>
			<Header />
			</div>
		</div>
	)
}
