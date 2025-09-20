'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapPoint {
  id: string
  position: [number, number]
  title: string
  description?: string
  category?: string
  rating?: number
  image?: string
}

interface MapComponentProps {
  center: [number, number]
  zoom: number
  height: string
  points: MapPoint[]
  showControls: boolean
}

// Component to handle map centering when points change
function MapController({ center, points }: { center: [number, number], points: MapPoint[] }) {
  const map = useMap()

  useEffect(() => {
    if (points && points.length > 0) {
      // Fit map to show all points
      const group = new L.FeatureGroup(points.map(point => L.marker(point.position)))
      map.fitBounds(group.getBounds().pad(0.1))
    } else {
      map.setView(center, map.getZoom())
    }
  }, [map, center, points])

  return null
}

// Custom marker colors based on category
const getMarkerIcon = (category?: string) => {
  let color = '#3388ff' // default blue
  
  switch (category) {
    case 'restaurant':
      color = '#ff6b6b' // red
      break
    case 'attraction':
      color = '#4ecdc4' // teal
      break
    case 'hotel':
      color = '#45b7d1' // blue
      break
    case 'guide':
      color = '#96ceb4' // green
      break
  }

  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13]
  })
}

export default function MapComponent({ center, zoom, height, points, showControls }: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={showControls}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController center={center} points={points} />
      
      {points.map((point) => (
        <Marker
          key={point.id}
          position={point.position}
          icon={getMarkerIcon(point.category)}
        >
          <Popup>
            <div className="min-w-[200px]">
              {point.image && (
                <div className="relative w-full h-24 mb-2">
                  <Image 
                    src={point.image} 
                    alt={point.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <h3 className="font-semibold text-base mb-1">{point.title}</h3>
              {point.description && (
                <p className="text-sm text-gray-600 mb-2">{point.description}</p>
              )}
              {point.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">{point.rating}</span>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}