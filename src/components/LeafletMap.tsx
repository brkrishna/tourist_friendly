'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

interface MapPoint {
  id: string
  position: [number, number]
  title: string
  description?: string
  category?: string
  rating?: number
  image?: string
}

interface LeafletMapProps {
  center?: [number, number]
  zoom?: number
  height?: string
  points?: MapPoint[]
  showSearch?: boolean
  showControls?: boolean
  className?: string
}

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="bg-muted rounded-lg flex items-center justify-center" style={{ height: '400px' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  )
})

export default function LeafletMap({
  center = [17.3850, 78.4867], // Hyderabad coordinates
  zoom = 12,
  height = '400px',
  points = [],
  showSearch = false,
  showControls = true,
  className = ''
}: LeafletMapProps) {
  return (
    <div className={`rounded-lg overflow-hidden border ${className}`} style={{ height }}>
      <MapComponent
        center={center}
        zoom={zoom}
        height={height}
        points={points}
        showControls={showControls}
      />
    </div>
  )
}