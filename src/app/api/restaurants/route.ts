import { NextRequest, NextResponse } from 'next/server'
import restaurantsData from '@/data/restaurants.json'
import { Restaurant } from '@/types/restaurant'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cuisine = searchParams.get('cuisine')
    const priceRange = searchParams.get('priceRange')
    const limit = searchParams.get('limit')
    const rating = parseFloat(searchParams.get('rating') || '0')
    const vegetarian = searchParams.get('vegetarian')
    const area = searchParams.get('area')
    const isOpen = searchParams.get('isOpen')
    const latitude = parseFloat(searchParams.get('latitude') || '0')
    const longitude = parseFloat(searchParams.get('longitude') || '0')
    const radius = parseFloat(searchParams.get('radius') || '10000') // 10km default
    const sortBy = searchParams.get('sortBy') || 'rating'
    const order = searchParams.get('order') || 'desc'
    const search = searchParams.get('search')?.toLowerCase()
    
    let restaurants: Restaurant[] = restaurantsData as Restaurant[]
    
    // Text search across multiple fields
    if (search) {
      restaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(search) ||
        restaurant.description?.toLowerCase().includes(search) ||
        restaurant.cuisineTypes.some(type => type.toLowerCase().includes(search)) ||
        restaurant.location.address?.toLowerCase().includes(search)
      )
    }
    
    // Filter by cuisine if provided
    if (cuisine && cuisine !== 'all') {
      restaurants = restaurants.filter(restaurant => 
        restaurant.cuisineTypes.some(type => 
          type.toLowerCase().includes(cuisine.toLowerCase())
        )
      )
    }
    
    // Filter by price range if provided
    if (priceRange && priceRange !== 'all') {
      restaurants = restaurants.filter(restaurant => 
        restaurant.pricing.priceRange === priceRange
      )
    }

    // Filter by minimum rating
    if (rating > 0) {
      restaurants = restaurants.filter(restaurant => 
        restaurant.rating >= rating
      )
    }

    // Filter by vegetarian options
    if (vegetarian === 'true') {
      restaurants = restaurants.filter(restaurant => 
        restaurant.dietaryOptions?.vegetarian === true
      )
    }

    // Filter by area/location
    if (area && area !== 'all') {
      restaurants = restaurants.filter(restaurant => 
        restaurant.location.address?.toLowerCase().includes(area.toLowerCase())
      )
    }

    // Filter by open status (mock implementation)
    if (isOpen === 'true') {
      const currentHour = new Date().getHours()
      restaurants = restaurants.filter(restaurant => {
        // Simple mock logic - assume most restaurants open 11-23
        return currentHour >= 11 && currentHour <= 23
      })
    }

    // Filter by location proximity if coordinates provided
    if (latitude && longitude) {
      restaurants = restaurants.filter(restaurant => {
        if (!restaurant.location.latitude || !restaurant.location.longitude) return true // Include if no coordinates
        const distance = calculateDistance(
          latitude, longitude,
          restaurant.location.latitude,
          restaurant.location.longitude
        )
        return distance <= radius
      }).map(restaurant => ({
        ...restaurant,
        distance: restaurant.location.latitude && restaurant.location.longitude ? calculateDistance(
          latitude, longitude,
          restaurant.location.latitude,
          restaurant.location.longitude
        ) : undefined
      }))
    }

    // Sort restaurants
    restaurants.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'distance':
          aValue = (a as any).distance || 0
          bValue = (b as any).distance || 0
          break
        case 'price':
          // Convert price range to numeric for sorting
          const priceValues = { '₹': 1, '₹₹': 2, '₹₹₹': 3, '₹₹₹₹': 4 }
          aValue = priceValues[a.pricing.priceRange as keyof typeof priceValues] || 0
          bValue = priceValues[b.pricing.priceRange as keyof typeof priceValues] || 0
          break
        default:
          aValue = a.rating
          bValue = b.rating
          break
      }

      if (typeof aValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return order === 'asc' ? aValue - bValue : bValue - aValue
      }
    })
    
    // Limit results if provided
    if (limit) {
      restaurants = restaurants.slice(0, parseInt(limit))
    }

    // Calculate summary statistics
    const summary = {
      total: restaurants.length,
      cuisines: Array.from(new Set(restaurants.flatMap(r => r.cuisineTypes))),
      priceRanges: Array.from(new Set(restaurants.map(r => r.pricing.priceRange))),
      averageRating: restaurants.length > 0 ? 
        restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length : 0,
      vegetarianOptions: restaurants.filter(r => 
        r.dietaryOptions?.vegetarian === true
      ).length
    }
    
    return NextResponse.json({
      success: true,
      data: restaurants,
      total: restaurants.length,
      summary,
      filters: {
        applied: { cuisine, priceRange, rating, vegetarian, area, isOpen, search },
        location: latitude && longitude ? { latitude, longitude, radius } : null
      }
    })
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'Failed to fetch restaurants'
      },
      { status: 500 }
    )
  }
}

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180
  const φ2 = lat2 * Math.PI/180
  const Δφ = (lat2-lat1) * Math.PI/180
  const Δλ = (lon2-lon1) * Math.PI/180

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  return R * c // Distance in meters
}