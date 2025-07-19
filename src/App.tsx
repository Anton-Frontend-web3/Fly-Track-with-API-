import { FlightDetails } from './components/flight-details/FlightDetails'

import { Header } from './components/flight-header/Header'
import { FlightList } from './components/flight-list/FlightList'

function App() {
	return (
		<div>
			<Header></Header>
			<FlightList></FlightList>
			<FlightDetails></FlightDetails>
		</div>
	)
}

export default App
