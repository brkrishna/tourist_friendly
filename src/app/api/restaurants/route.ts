import { NextResponse } from 'next/server'
import restaurantsData from '@/data/restaurants.json'
import { Restaurant } from '@/types/restaurant'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cuisine = searchParams.get('cuisine')
    const priceRange = searchParams.get('priceRange')
    const limit = searchParams.get('limit')
    
    let restaurants: Restaurant[] = restaurantsData as Restaurant[]
    
    // Filter by cuisine if provided
    if (cuisine) {
      restaurants = restaurants.filter(restaurant => 
        restaurant.cuisineTypes.some(type => 
          type.toLowerCase().includes(cuisine.toLowerCase())
        )
      )
    }
    
    // Filter by price range if provided
    if (priceRange) {
      restaurants = restaurants.filter(restaurant => 
        restaurant.pricing.priceRange === priceRange
      )
    }
    
    // Limit results if provided
    if (limit) {
      restaurants = restaurants.slice(0, parseInt(limit))
    }
    
    return NextResponse.json({
      success: true,
      data: restaurants,
      total: restaurants.length
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