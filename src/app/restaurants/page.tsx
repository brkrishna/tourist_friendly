'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star, MapPin, Clock, Phone, Utensils, Filter, Map } from 'lucide-react'
import LeafletMap from '@/components/LeafletMap'

interface Restaurant {
  id: string
  name: string
  description: string
  cuisineTypes: string[]
  location: {
    latitude: number
    longitude: number
    address: string
    neighborhood: string
  }
  pricing: {
    priceRange: string
    averageCost: number
    currency: string
  }
  dietaryOptions: {
    vegetarian: boolean
    vegan: boolean
    glutenFree: boolean
  }
  schedule: {
    openingTime: string
    closingTime: string
  }
  realTimeData: {
    availability: string
    waitTime: number
  }
  menu: {
    items: Array<{
      id: string
      name: string
      description: string
      price: number
      category: string
      spiceLevel: string
      dietaryTags: string[]
    }>
  }
  amenities: string[]
  rating: number
  reviewCount: number
  images: Array<{
    url: string
    alt: string
    caption: string
  }>
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [mapPoints, setMapPoints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    const filterRestaurants = () => {
      let filtered = restaurants

      // Search filter
      if (searchTerm) {
        filtered = filtered.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.cuisineTypes.some(type => 
            type.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      }

      // Cuisine filter
      if (selectedCuisine && selectedCuisine !== 'all') {
        filtered = filtered.filter(restaurant =>
          restaurant.cuisineTypes.some(type =>
            type.toLowerCase().includes(selectedCuisine.toLowerCase())
          )
        )
      }

      // Price range filter
      if (selectedPriceRange && selectedPriceRange !== 'all') {
        filtered = filtered.filter(restaurant =>
          restaurant.pricing.priceRange === selectedPriceRange
        )
      }

      setFilteredRestaurants(filtered)
    }
    
    filterRestaurants()
  }, [searchTerm, selectedCuisine, selectedPriceRange, restaurants])

  useEffect(() => {
    // Update map points when filtered restaurants change
    const points = filteredRestaurants.map(restaurant => ({
      id: restaurant.id,
      position: [restaurant.location.latitude, restaurant.location.longitude] as [number, number],
      title: restaurant.name,
      description: restaurant.description,
      category: 'restaurant',
      rating: restaurant.rating,
      image: restaurant.images?.[0]?.url
    }))
    setMapPoints(points)
  }, [filteredRestaurants])

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants')
      const data = await response.json()
      if (data.success) {
        setRestaurants(data.data)
        setFilteredRestaurants(data.data)
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriceRangeDisplay = (priceRange: string) => {
    const ranges = {
      budget: '₹',
      moderate: '₹₹',
      expensive: '₹₹₹',
      luxury: '₹₹₹₹'
    }
    return ranges[priceRange as keyof typeof ranges] || priceRange
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'full': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading restaurants...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Restaurants in Hyderabad</h1>
        <p className="text-muted-foreground text-lg">
          Discover authentic local cuisine and popular dining destinations
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <Input
              placeholder="Search restaurants, cuisine, or dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2"
          >
            <Map className="h-4 w-4" />
            {showMap ? 'Hide Map' : 'Show Map'}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
            <div>
              <label className="block text-sm font-medium mb-2">Cuisine Type</label>
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger>
                  <SelectValue placeholder="All cuisines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  <SelectItem value="hyderabadi">Hyderabadi</SelectItem>
                  <SelectItem value="south indian">South Indian</SelectItem>
                  <SelectItem value="mughlai">Mughlai</SelectItem>
                  <SelectItem value="nizami">Nizami</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="All prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Budget (₹)</SelectItem>
                  <SelectItem value="moderate">Moderate (₹₹)</SelectItem>
                  <SelectItem value="expensive">Expensive (₹₹₹)</SelectItem>
                  <SelectItem value="luxury">Luxury (₹₹₹₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCuisine('all')
                  setSelectedPriceRange('all')
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredRestaurants.length} of {restaurants.length} restaurants
        </p>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Restaurant Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <LeafletMap
                center={[17.3850, 78.4867]} // Hyderabad center
                zoom={12}
                points={mapPoints}
                height="400px"
                className="rounded-lg"
                showControls={true}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {restaurant.images && restaurant.images.length > 0 && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={restaurant.images[0].url}
                  alt={restaurant.images[0].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className={`${getAvailabilityColor(restaurant.realTimeData.availability)} text-white`}
                  >
                    {restaurant.realTimeData.availability}
                  </Badge>
                </div>
              </div>
            )}

            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{restaurant.name}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{restaurant.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({restaurant.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {getPriceRangeDisplay(restaurant.pricing.priceRange)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Avg ₹{restaurant.pricing.averageCost}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {restaurant.cuisineTypes.slice(0, 3).map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="text-xs">
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">
                {restaurant.description}
              </CardDescription>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{restaurant.location.neighborhood}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {restaurant.schedule.openingTime} - {restaurant.schedule.closingTime}
                  </span>
                </div>

                {restaurant.realTimeData.waitTime > 0 && (
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Wait time: ~{restaurant.realTimeData.waitTime} min
                    </span>
                  </div>
                )}
              </div>

              {/* Dietary Options */}
              <div className="flex flex-wrap gap-1 mt-4">
                {restaurant.dietaryOptions.vegetarian && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Vegetarian
                  </Badge>
                )}
                {restaurant.dietaryOptions.vegan && (
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    Vegan
                  </Badge>
                )}
                {restaurant.dietaryOptions.glutenFree && (
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    Gluten Free
                  </Badge>
                )}
              </div>

              {/* Popular Items */}
              {restaurant.menu.items.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Popular Items:</p>
                  <div className="space-y-1">
                    {restaurant.menu.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-medium">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-6">
                <Button className="flex-1">
                  View Menu
                </Button>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}