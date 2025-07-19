import { Outlet } from 'react-router-dom'
import { Header } from './flight-header/Header'

export function Layout() {
	return (
		<div className='relative min-h-screen bg-[url(/bg.jpg)] bg-cover bg-center bg-no-repeat p-7 sm:p-3 xs:p-2.5'>
			<h1 hidden>SkyTrack – flight tracking service</h1>
			<Header></Header>
			<Outlet />
		</div>
	)
}
