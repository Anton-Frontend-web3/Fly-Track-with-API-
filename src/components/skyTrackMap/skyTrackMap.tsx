// src/components/sky-track-map/SkyTrackMap.tsx

import { useCurrentFlight } from '@/hooks/useCurrentFlight'
import { useTheme } from '@/provider/useTheme'
import { MapPin, Plane, PlaneTakeoff } from 'lucide-react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useMemo, useRef } from 'react'
import Map, { Layer, Marker, Source, type MapRef } from 'react-map-gl/maplibre'
// ВАЖНО: Мы больше не будем использовать статический массив FLIGHTS, так как он вызывает ошибки
// import { FLIGHTS } from '../flight-list/flights.data' 
import {
	createSplitGreatCircle,
	dashedStyle,
	solidStyle
} from './sky-track-map.utils'
import type { IFlight } from '@/types/flight.types'

// Функция для вычисления текущего местоположения на основе прогресса
const getIntermediatePoint = (from: [number, number], to: [number, number], progress: number): [number, number] => {
    const factor = progress / 100;
    const lat = from[0] + (to[0] - from[0]) * factor;
    const lon = from[1] + (to[1] - from[1]) * factor;
    return [lat, lon];
}


export function SkyTrackMap() {
	const { flight, isLoading } = useCurrentFlight()

    // ИСПРАВЛЕНО: Вычисляем currentLocation на основе данных из API
    const currentLocation = useMemo(() => {
        if (!flight) return null;
        return getIntermediatePoint(flight.from.coordinates, flight.to.coordinates, flight.progress);
    }, [flight]);

	// УДАЛЕНО: Этот блок кода использовал статические данные и вызывал ошибку.
	// Отображение других самолетов - это отдельная, более сложная задача.
	// const currentOtherFlightsCoordinate = useMemo(...)

	const ref = useRef<MapRef>(null)
	
    // ИСПРАВЛЕНО: Этот хук теперь использует наше вычисленное currentLocation
    useEffect(() => {
		if (ref.current && flight && currentLocation) {
			ref.current.setCenter({
				lat: currentLocation[0],
				lng: currentLocation[1]
			});
			ref.current.setZoom(6);
		}
	}, [flight, currentLocation]) // Добавляем currentLocation в зависимости

	const { solidFeature, dashedFeature, snappedPoint, bearing } = useMemo(() => {
        // ИСПРАВЛЕНО: Проверяем наличие currentLocation
		if (!flight?.from || !flight?.to || !currentLocation) {
			return {
				solidFeature: null,
				dashedFeature: null,
				snappedPoint: null,
				bearing: 0
			}
        }

		const from: [number, number] = [
			flight.from.coordinates[1],
			flight.from.coordinates[0]
		]
		const to: [number, number] = [
			flight.to.coordinates[1],
			flight.to.coordinates[0]
		]
        // ИСПРАВЛЕНО: Используем вычисленное currentLocation, поменяв порядок для карты
		const current: [number, number] = [
			currentLocation[1],
			currentLocation[0]
		]

		return createSplitGreatCircle(from, to, current)
	}, [flight, currentLocation]) // Добавляем currentLocation в зависимости

	const { theme } = useTheme()

    // Добавляем проверку на загрузку, чтобы карта не рендерилась без данных
    if (isLoading) {
        return <div>Loading Map...</div>;
    }

    if (!flight) {
        // Можно показать пустую карту или сообщение
        return <div>Select a flight to see the map</div>;
    }


	return (
		<Map
			ref={ref}
			initialViewState={{
				latitude: flight.from.coordinates[0], // Начинаем с точки вылета
				longitude: flight.from.coordinates[1],
				zoom: 4
			}}
			style={{ width: '100%', height: '100vh' }}
			mapStyle={
				theme === 'dark'
					? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
					: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
			}
		>
			{/* Этот код ниже должен теперь работать, так как мы предоставляем ему все данные */}
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
			{flight.from.coordinates?.length > 1 && (
					<Marker
						latitude={flight.from.coordinates[0]}
						longitude={flight.from.coordinates[1]}
					>
						<PlaneTakeoff
							size={30}
							className=''
						></PlaneTakeoff>
					</Marker>
				)}
			{flight.to.coordinates?.length > 1 && (
				<Marker
					latitude={flight.to.coordinates[0]}
					longitude={flight.to.coordinates[1]}
				>
					<MapPin
						size={30}
						className=''
					></MapPin>
				</Marker>
			)}
		</Map>
	)
}