import { Layout } from '@/components/Layout.tsx'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'framer-motion'
import { CenterLayout } from './components/CenterLayout.tsx'
import { Favorites } from './pages/favorites/Favorites.tsx'
import { HomePage } from './pages/HomePage/HomePage.tsx'
import { ThemeProvider } from './provider/ThemeProvider.tsx'
import { store } from './store/store.ts'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<LazyMotion features={domAnimation}>
					<Provider store={store}>
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
					</Provider>
				</LazyMotion>
			</ThemeProvider>
		</QueryClientProvider>
	</BrowserRouter>
)
