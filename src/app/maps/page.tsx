'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Clock, ExternalLink, Navigation, Map, Globe } from 'lucide-react';
import GoogleMap from '@/components/maps/GoogleMap';
import LeafletMap from '@/components/LeafletMap';
import LocationSearch from '@/components/maps/LocationSearch';
import LocationFilter from '@/components/maps/LocationFilter';
import { LocationCoordinates, MapLocation, getCurrentLocation, formatDistance, calculateDistance, getDirectionsUrl } from '@/lib/google-maps';
import { Attraction } from '@/types/attraction';

export default function MapsPage() {
  const [userLocation, setUserLocation] = useState<LocationCoordinates | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationCoordinates | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [mapMarkers, setMapMarkers] = useState<MapLocation[]>([]);
  const [leafletPoints, setLeafletPoints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMapType, setActiveMapType] = useState<'google' | 'leaflet'>('leaflet');

  // Load attractions data
  useEffect(() => {
    const loadAttractions = async () => {
      try {
        setIsLoading(true);
        // Fetch from our API
        const response = await fetch('/api/attractions');
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            setAttractions(result.data);
            setFilteredAttractions(result.data);
          } else {
            console.error('Invalid API response:', result);
            setAttractions([]);
            setFilteredAttractions([]);
          }
        } else {
          console.error('Failed to fetch attractions:', response.status);
          setAttractions([]);
          setFilteredAttractions([]);
        }
      } catch (error) {
        console.error('Failed to load attractions:', error);
        setAttractions([]);
        setFilteredAttractions([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAttractions();
  }, []);

  // Get user location on component mount
  useEffect(() => {
    const initUserLocation = async () => {
      try {
        const coords = await getCurrentLocation();
        setUserLocation(coords);
        setSelectedLocation(coords);
      } catch (error) {
        console.error('Failed to get user location:', error);
      }
    };

    initUserLocation();
  }, []);

  // Update map markers when filtered attractions change
  useEffect(() => {
    if (!Array.isArray(filteredAttractions)) {
      setMapMarkers([]);
      setLeafletPoints([]);
      return;
    }

    const markers: MapLocation[] = filteredAttractions.map(attraction => ({
      latitude: attraction.location.latitude,
      longitude: attraction.location.longitude,
      name: attraction.name,
      address: attraction.location.address
    }));

    const leafletData = filteredAttractions.map(attraction => ({
      id: attraction.id,
      position: [attraction.location.latitude, attraction.location.longitude] as [number, number],
      title: attraction.name,
      description: attraction.description,
      category: 'attraction',
      rating: attraction.rating,
      image: attraction.images?.[0]?.url
    }));

    setMapMarkers(markers);
    setLeafletPoints(leafletData);
  }, [filteredAttractions]);

  // Handle location search
  const handleLocationSelect = (location: MapLocation) => {
    setSelectedLocation({
      latitude: location.latitude,
      longitude: location.longitude
    });
  };

  // Handle attraction selection from map
  const handleMapLocationSelect = (location: MapLocation) => {
    if (!Array.isArray(filteredAttractions)) {
      return;
    }
    
    const attraction = filteredAttractions.find(
      a => a.location.latitude === location.latitude && 
           a.location.longitude === location.longitude
    );
    
    if (attraction) {
      setSelectedAttraction(attraction);
    }
  };

  // Handle attraction selection from list
  const handleAttractionSelect = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setSelectedLocation({
      latitude: attraction.location.latitude,
      longitude: attraction.location.longitude
    });
  };

  // Get directions to selected attraction
  const getDirections = (attraction: Attraction) => {
    const url = getDirectionsUrl(
      { latitude: attraction.location.latitude, longitude: attraction.location.longitude },
      userLocation || undefined
    );
    window.open(url, '_blank');
  };

  // Format price for display
  const formatPrice = (pricing: Attraction['pricing']) => {
    if (pricing.entryFee === 0) return 'Free';
    return `₹${pricing.entryFee}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Explore Hyderabad
        </h1>
        <p className="text-gray-600">
          Discover amazing places near you with interactive maps and location-based filtering
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Panel - Search and Filters */}
        <div className="lg:col-span-1 space-y-6">
          {/* Location Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Search Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                placeholder="Search for places in Hyderabad..."
              />
            </CardContent>
          </Card>

          {/* Filters */}
          <LocationFilter
            userLocation={userLocation || undefined}
            items={attractions}
            onFilteredItemsChange={setFilteredAttractions}
          />

          {/* Attractions List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Nearby Attractions ({Array.isArray(filteredAttractions) ? filteredAttractions.length : 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto space-y-3">
              {isLoading ? (
                <div className="text-center py-4 text-gray-500">
                  Loading attractions...
                </div>
              ) : !Array.isArray(filteredAttractions) || filteredAttractions.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No attractions found matching your filters
                </div>
              ) : (
                filteredAttractions.map((attraction) => (
                  <div
                    key={attraction.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedAttraction?.id === attraction.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAttractionSelect(attraction)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{attraction.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {attraction.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {attraction.rating} ({attraction.reviewCount})
                      </div>
                      <div>{formatPrice(attraction.pricing)}</div>
                      {userLocation && (
                        <div className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          {formatDistance(calculateDistance(userLocation, attraction.location))}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {attraction.description}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Map and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map with Tabs for different providers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Interactive Map
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {activeMapType === 'leaflet' ? 'Open Source' : 'Google Maps'}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeMapType} onValueChange={(value) => setActiveMapType(value as 'google' | 'leaflet')}>
                <TabsList className="grid w-full grid-cols-2 mb-4 mx-4">
                  <TabsTrigger value="leaflet" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    OpenStreetMap (Free)
                  </TabsTrigger>
                  <TabsTrigger value="google" className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    Google Maps
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="leaflet" className="mt-0">
                  <LeafletMap
                    center={selectedLocation ? [selectedLocation.latitude, selectedLocation.longitude] : undefined}
                    zoom={selectedLocation ? 15 : 12}
                    points={leafletPoints}
                    height="500px"
                    className="rounded-lg"
                    showControls={true}
                  />
                </TabsContent>
                
                <TabsContent value="google" className="mt-0">
                  <GoogleMap
                    center={selectedLocation || undefined}
                    zoom={selectedLocation ? 15 : 12}
                    markers={mapMarkers}
                    onLocationSelect={handleMapLocationSelect}
                    showUserLocation={true}
                    height="500px"
                    className="rounded-lg"
                  />
                </TabsContent>
              </Tabs>
              
              <div className="px-4 pb-4">
                <p className="text-xs text-muted-foreground">
                  {activeMapType === 'leaflet' 
                    ? '🌍 Using OpenStreetMap - Free, open source mapping data'
                    : '🗺️ Using Google Maps - May require API key for extended usage'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Selected Attraction Details */}
          {selectedAttraction && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedAttraction.name}</CardTitle>
                    <p className="text-gray-600 mt-1">{selectedAttraction.location.address}</p>
                  </div>
                  <Button
                    onClick={() => getDirections(selectedAttraction)}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Directions
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {selectedAttraction.rating} ({selectedAttraction.reviewCount} reviews)
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedAttraction.schedule.openingTime} - {selectedAttraction.schedule.closingTime}
                  </div>
                  <div className="font-medium">
                    {formatPrice(selectedAttraction.pricing)}
                  </div>
                  {userLocation && (
                    <div className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      {formatDistance(calculateDistance(userLocation, selectedAttraction.location))} away
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{selectedAttraction.description}</p>
                </div>

                {selectedAttraction.amenities.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAttraction.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Real-time Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Crowd Level:</span>
                      <Badge 
                        variant={selectedAttraction.realTimeData.crowdLevel === 'low' ? 'default' : 
                                selectedAttraction.realTimeData.crowdLevel === 'medium' ? 'secondary' : 'destructive'}
                        className="ml-2"
                      >
                        {selectedAttraction.realTimeData.crowdLevel}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">Wait Time:</span>
                      <span className="ml-2 font-medium">{selectedAttraction.realTimeData.waitTime} min</span>
                    </div>
                  </div>
                </div>

                {selectedAttraction.accessibility && (
                  <div>
                    <h4 className="font-medium mb-2">Accessibility</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={selectedAttraction.accessibility.wheelchairAccessible ? 'text-green-600' : 'text-gray-400'}>
                          ♿ Wheelchair accessible
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={selectedAttraction.accessibility.audioGuides ? 'text-green-600' : 'text-gray-400'}>
                          🎧 Audio guides
                        </span>
                      </div>
                    </div>
                    {selectedAttraction.accessibility.accessibilityDescription && (
                      <p className="text-xs text-gray-600 mt-2">
                        {selectedAttraction.accessibility.accessibilityDescription}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}