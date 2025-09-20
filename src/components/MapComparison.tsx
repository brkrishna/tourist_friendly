'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Map, Globe, DollarSign, Zap, Users, Shield } from 'lucide-react'
import LeafletMap from '@/components/LeafletMap'
import GoogleMap from '@/components/maps/GoogleMap'

interface MapComparisonProps {
  center?: [number, number]
  points?: any[]
  markers?: any[]
  height?: string
}

export default function MapComparison({ 
  center = [17.3850, 78.4867], 
  points = [], 
  markers = [],
  height = "400px" 
}: MapComparisonProps) {
  const [activeTab, setActiveTab] = useState<'comparison' | 'leaflet' | 'google'>('comparison')

  const comparisonData = [
    {
      name: 'OpenStreetMap (Leaflet)',
      icon: <Globe className="h-5 w-5" />,
      pros: [
        'Completely free to use',
        'No API key required',
        'Open source and community-driven',
        'No usage limits',
        'Privacy-focused (no tracking)',
        'Lightweight and fast'
      ],
      cons: [
        'Less detailed in some areas',
        'Fewer business listings',
        'No Street View equivalent',
        'Basic satellite imagery'
      ],
      bestFor: 'General mapping, route planning, privacy-conscious users',
      color: 'green'
    },
    {
      name: 'Google Maps',
      icon: <Map className="h-5 w-5" />,
      pros: [
        'Extremely detailed and accurate',
        'Comprehensive business data',
        'Street View integration',
        'Real-time traffic data',
        'Advanced geocoding',
        'Familiar interface'
      ],
      cons: [
        'Requires API key',
        'Usage costs after free tier',
        'Terms of service restrictions',
        'Privacy concerns',
        'Vendor lock-in'
      ],
      bestFor: 'Commercial applications, detailed business data, navigation',
      color: 'blue'
    }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-6 w-6" />
            Map Provider Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comparison">Compare</TabsTrigger>
              <TabsTrigger value="leaflet">OpenStreetMap</TabsTrigger>
              <TabsTrigger value="google">Google Maps</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {comparisonData.map((provider, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {provider.icon}
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                        </div>
                        <Badge 
                          variant={provider.color === 'green' ? 'default' : 'secondary'}
                          className={provider.color === 'green' ? 'bg-green-500' : ''}
                        >
                          {provider.color === 'green' ? 'Free' : 'Freemium'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2 flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          Advantages
                        </h4>
                        <ul className="text-sm space-y-1">
                          {provider.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-600 mb-2 flex items-center gap-1">
                          <Shield className="h-4 w-4" />
                          Limitations
                        </h4>
                        <ul className="text-sm space-y-1">
                          {provider.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">×</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Best For
                        </h4>
                        <p className="text-sm text-muted-foreground">{provider.bestFor}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Cost Comparison
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-600">OpenStreetMap:</span>
                    <p className="text-muted-foreground">$0 - Completely free forever</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-600">Google Maps:</span>
                    <p className="text-muted-foreground">$0-200/month* - Free tier: 28,500 loads/month</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  *Google Maps costs vary by usage. See Google Cloud Platform pricing for details.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="leaflet" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">OpenStreetMap with Leaflet</h3>
                  <Badge className="bg-green-500">Free & Open Source</Badge>
                </div>
                <LeafletMap
                  center={center}
                  zoom={12}
                  points={points}
                  height={height}
                  showControls={true}
                />
                <p className="text-sm text-muted-foreground">
                  This map uses OpenStreetMap data with the Leaflet.js library. 
                  It&apos;s completely free to use and doesn&apos;t require any API keys.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="google" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Google Maps</h3>
                  <Badge variant="secondary">Requires API Key</Badge>
                </div>
                <GoogleMap
                  center={center ? { latitude: center[0], longitude: center[1] } : undefined}
                  zoom={12}
                  markers={markers}
                  height={height}
                  showUserLocation={false}
                />
                <p className="text-sm text-muted-foreground">
                  Google Maps provides detailed mapping data and features but requires an API key 
                  and has usage-based pricing beyond the free tier.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}