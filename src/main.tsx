import { Layout } from '@/components/Layout.tsx'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

import { CenterLayout } from './components/CenterLayout.tsx'
import { Favorites } from './pages/favorites/Favorites.tsx'
import { HomePage } from './pages/HomePage/HomePage.tsx'
import { ThemeProvider } from './provider/ThemeProvider.tsx'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<ThemeProvider>
				<Routes>
					<Route element={<Layout />}>
						<Route
							path='/'
							element={<HomePage />}
						/>
						<Route element={<CenterLayout />}>
							<Route
								path='/favorites'
								element={<Favorites />}
							/>
						</Route>
					</Route>
				</Routes>
			</ThemeProvider>
		</Provider>
	</BrowserRouter>
)
