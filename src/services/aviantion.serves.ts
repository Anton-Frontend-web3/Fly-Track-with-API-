import type { IFlight } from './aviation.types'

const API_URL =
	'https://gist.githubusercontent.com/Anton-Frontend-web3/47c685017259ff1b2437361c48bbe9f7/raw/59f818892753520d7e09c715379b944c06f31e2e/db.json'

class AviationService {
	async getFlights(): Promise<IFlight[]> {
		const response = await fetch(API_URL)

		if (!response.ok) {
			throw new Error(`Error fetching flights: ${response.statusText}`)
		}

		return response.json()
	}

	async getFlight(id: string): Promise<IFlight | null> {
		const allFlights = await this.getFlights()

		const flight = allFlights.find(f => f.id === id)

		if (!flight) {
			return null
		}

		return flight
	}
}

export default new AviationService()
