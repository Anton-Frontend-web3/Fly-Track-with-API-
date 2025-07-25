import { useCurrentFlight } from '@/hooks/useCurrentFlight'
import { useTheme } from '@/provider/useTheme'
import { MapPin, Plane, PlaneTakeoff } from 'lucide-react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useMemo, useRef } from 'react'
import Map, { Layer, Marker, Source, type MapRef } from 'react-map-gl/maplibre'
import { FLIGHTS } from '../flight-list/flights.data'
import {
	createSplitGreatCircle,
	dashedStyle,
	solidStyle
} from './sky-track-map.utils'

export function SkyTrackMap() {
	const { flight } = useCurrentFlight()

	const currentOtherFlightsCoordinate = useMemo(
		() =>
			FLIGHTS.filter(f => f.aircraftReg != flight?.aircraftReg).map(
				f => f.currentLocation.coordinates
			),
		[flight]
	)

	const ref = useRef<MapRef>(null)
	useEffect(() => {
		if (ref.current && flight) {
			;(ref.current.setCenter({
				lat: flight?.currentLocation.coordinates[0],
				lng: flight?.currentLocation.coordinates[1]
			}),
				ref.current.setZoom(6))
		}
	}, [flight])

	const { solidFeature, dashedFeature, snappedPoint, bearing } = useMemo(() => {
		if (!flight?.from || !flight?.to || !flight?.currentLocation)
			return {
				solidFeature: null,
				dashedFeature: null,
				snappedPoint: null,
				bearing: 0
			}

		const from: [number, number] = [
			flight.from.coordinates[1],
			flight.from.coordinates[0]
		]
		const to: [number, number] = [
			flight.to.coordinates[1],
			flight.to.coordinates[0]
		]
		const current: [number, number] = [
			flight.currentLocation.coordinates[1],
			flight.currentLocation.coordinates[0]
		]

		return createSplitGreatCircle(from, to, current)
	}, [flight])

	const { theme } = useTheme()

	return (
		<Map
			ref={ref}
			initialViewState={{
				latitude: 37.8,
				longitude: -122.4,
				zoom: 6
			}}
			style={{ width: '100%', height: '100vh' }}
			mapStyle={
				theme === 'dark'
					? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
					: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
			}
		>
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
					data={{
						type: 'FeatureCollection',
						features: [dashedFeature]
					}}
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
			{flight?.from.coordinates?.length &&
				flight.from.coordinates.length > 1 && (
					<Marker
						latitude={flight?.from.coordinates[0]}
						longitude={flight?.from.coordinates[1]}
					>
						<PlaneTakeoff
							size={30}
							className=''
						></PlaneTakeoff>
					</Marker>
				)}
			{flight?.to.coordinates?.length && flight.to.coordinates.length > 1 && (
				<Marker
					latitude={flight?.to.coordinates[0]}
					longitude={flight?.to.coordinates[1]}
				>
					<MapPin
						size={30}
						className=''
					></MapPin>
				</Marker>
			)}
			{!!currentOtherFlightsCoordinate?.length &&
				currentOtherFlightsCoordinate.map(coordinate => (
					<Marker
						key={coordinate.join(',')}
						latitude={coordinate[0]}
						longitude={coordinate[1]}
					>
						<Plane
							size={30}
							className='fill-white opacity-30'
						></Plane>
					</Marker>
				))}
		</Map>
	)
}
