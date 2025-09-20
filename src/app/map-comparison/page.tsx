'use client'

import { useState, useEffect } from 'react'
import MapComparison from '@/components/MapComparison'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Map, Info, Lightbulb } from 'lucide-react'

export default function MapComparisonPage() {
  const [samplePoints, setSamplePoints] = useState<any[]>([])
  const [sampleMarkers, setSampleMarkers] = useState<any[]>([])

  useEffect(() => {
    // Create sample data for demonstration
    const points = [
      {
        id: 'charminar',
        position: [17.3616, 78.4747] as [number, number],
        title: 'Charminar',
        description: 'Historic monument and mosque',
        category: 'attraction',
        rating: 4.5
      },
      {
        id: 'golconda',
        position: [17.3833, 78.4011] as [number, number],
        title: 'Golconda Fort',
        description: 'Ancient fortress and citadel',
        category: 'attraction',
        rating: 4.3
      },
      {
        id: 'paradise',
        position: [17.4065, 78.4772] as [number, number],
        title: 'Paradise Restaurant',
        description: 'Famous Hyderabadi biryani',
        category: 'restaurant',
        rating: 4.2
      }
    ]

    const markers = points.map(point => ({
      latitude: point.position[0],
      longitude: point.position[1],
      name: point.title,
      address: point.description
    }))

    setSamplePoints(points)
    setSampleMarkers(markers)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Map Provider Comparison</h1>
        <p className="text-muted-foreground text-lg">
          Compare Google Maps vs OpenStreetMap to understand the best mapping solution for your needs
        </p>
      </div>

      {/* Quick Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Quick Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Recommended</Badge>
                <span className="font-medium">OpenStreetMap (Free)</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Perfect for most tourist applications. No costs, no API keys, 
                and respects user privacy while providing excellent mapping coverage.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Premium Option</Badge>
                <span className="font-medium">Google Maps</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ideal when you need the most detailed business data, Street View, 
                or advanced features, and have budget for API usage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Comparison */}
      <MapComparison
        center={[17.3850, 78.4867]}
        points={samplePoints}
        markers={sampleMarkers}
        height="500px"
      />

      {/* Technical Implementation Notes */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Implementation Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">OpenStreetMap with Leaflet.js</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• No registration or API keys required</li>
              <li>• Tile servers provided by OpenStreetMap Foundation</li>
              <li>• Client-side only implementation</li>
              <li>• Works offline with cached tiles</li>
              <li>• Customizable markers and styling</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Google Maps Platform</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Requires Google Cloud Platform account</li>
              <li>• API key needed for production use</li>
              <li>• Free tier: 28,500 map loads per month</li>
              <li>• Beyond free tier: $7 per 1,000 loads</li>
              <li>• Includes Places API, Geocoding, etc.</li>
            </ul>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Our Recommendation:</strong> This application uses OpenStreetMap as the default 
              choice because it provides excellent mapping capabilities without any cost or complexity, 
              making it perfect for tourist-focused applications.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}