// src/components/sky-track-map/SkyTrackMap.tsx

import { useCurrentFlight } from '@/hooks/useCurrentFlight'
import { useTheme } from '@/provider/useTheme'
import AviationService from '@/services/aviantion.serves'
import type { IFlight } from '@/services/aviation.types'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Plane, PlaneTakeoff } from 'lucide-react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useMemo, useRef } from 'react'
import Map, { Layer, Marker, Source, type MapRef } from 'react-map-gl/maplibre'

import {
	createSplitGreatCircle,
	dashedStyle,
	solidStyle
} from './sky-track-map.utils'

const getIntermediatePoint = (
	from: [number, number],
	to: [number, number],
	progress: number
): [number, number] => {
	const factor = progress / 100
	const lat = from[0] + (to[0] - from[0]) * factor
	const lon = from[1] + (to[1] - from[1]) * factor
	return [lat, lon]
}

export interface SkyTrackMapActions {
	onFollow: () => void
	onAnimateRoute: () => void
}

export function SkyTrackMap() {
	const { theme } = useTheme()
	const ref = useRef<MapRef>(null)

	const { data: allFlights = [], isLoading: isLoadingAllFlights } = useQuery<
		IFlight[],
		Error
	>({
		queryKey: ['flights'],
		queryFn: () => AviationService.getFlights()
	})

	const { flight: selectedFlight } = useCurrentFlight()

	const otherFlightsCoordinates = useMemo(() => {
		return allFlights
			.filter(flight => flight.id !== selectedFlight?.id)
			.map(flight =>
				getIntermediatePoint(
					flight.from.coordinates,
					flight.to.coordinates,
					flight.progress
				)
			)
	}, [allFlights, selectedFlight])

	const currentLocation = useMemo(() => {
		if (!selectedFlight) return null
		return getIntermediatePoint(
			selectedFlight.from.coordinates,
			selectedFlight.to.coordinates,
			selectedFlight.progress
		)
	}, [selectedFlight])

	useEffect(() => {
		if (ref.current && selectedFlight && currentLocation) {
			ref.current.flyTo({
				center: {
					lat: currentLocation[0],
					lng: currentLocation[1]
				},
				zoom: 6,
				duration: 2000
			})
		}
	}, [selectedFlight, currentLocation])

	const { solidFeature, dashedFeature, snappedPoint, bearing } = useMemo(() => {
		if (!selectedFlight?.from || !selectedFlight?.to || !currentLocation) {
			return {
				solidFeature: null,
				dashedFeature: null,
				snappedPoint: null,
				bearing: 0
			}
		}
		const from: [number, number] = [
			selectedFlight.from.coordinates[1],
			selectedFlight.from.coordinates[0]
		]
		const to: [number, number] = [
			selectedFlight.to.coordinates[1],
			selectedFlight.to.coordinates[0]
		]
		const current: [number, number] = [currentLocation[1], currentLocation[0]]
		return createSplitGreatCircle(from, to, current)
	}, [selectedFlight, currentLocation])

	if (isLoadingAllFlights) {
		return (
			<div className='flex h-screen items-center justify-center bg-gray-200'>
				Loading Map...
			</div>
		)
	}

	return (
		<Map
			ref={ref}
			initialViewState={{
				latitude: 48.85,
				longitude: 15.25,
				zoom: 3.5
			}}
			style={{ width: '100%', height: '100vh' }}
			mapStyle={
				theme === 'dark'
					? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
					: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
			}
		>
			{selectedFlight ? (
				<>
					{solidFeature && solidFeature.geometry.coordinates.length > 1 && (
						<Source
							id='route-solid'
							type='geojson'
							data={solidFeature}
						>
							<Layer {...solidStyle(theme)}></Layer>
						</Source>
					)}
					{dashedFeature && dashedFeature.geometry.coordinates.length > 1 && (
						<Source
							id='route-dashed'
							type='geojson'
							data={{ type: 'FeatureCollection', features: [dashedFeature] }}
						>
							<Layer {...dashedStyle(theme)}></Layer>
						</Source>
					)}
					{snappedPoint && (
						<Marker
							latitude={snappedPoint[1]}
							longitude={snappedPoint[0]}
						>
							<div
								style={{
									transform: `rotate(${bearing - 45}deg)`,
									transformOrigin: 'center',
									transition: 'transform 0.3s ease'
								}}
							>
								<Plane
									size={26}
									strokeWidth={0}
									className='fill-foreground'
								/>
							</div>
						</Marker>
					)}
					{selectedFlight.from.coordinates?.length > 1 && (
						<Marker
							latitude={selectedFlight.from.coordinates[0]}
							longitude={selectedFlight.from.coordinates[1]}
						>
							<PlaneTakeoff
								size={30}
								className=''
							/>
						</Marker>
					)}
					{selectedFlight.to.coordinates?.length > 1 && (
						<Marker
							latitude={selectedFlight.to.coordinates[0]}
							longitude={selectedFlight.to.coordinates[1]}
						>
							<MapPin
								size={30}
								className=''
							/>
						</Marker>
					)}
				</>
			) : (
				<>
					{otherFlightsCoordinates.map((coordinate, index) => (
						<Marker
							key={index}
							latitude={coordinate[0]}
							longitude={coordinate[1]}
						>
							<Plane
								size={24}
								className='fill-white/70 stroke-black/50'
								strokeWidth={0.5}
							/>
						</Marker>
					))}
				</>
			)}
		</Map>
	)
}
