import { NextResponse } from 'next/server'
import attractionsData from '@/data/attractions.json'
import { Attraction } from '@/types/attraction'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    
    let attractions: Attraction[] = attractionsData as Attraction[]
    
    // Filter by category if provided
    if (category) {
      attractions = attractions.filter(attraction => 
        attraction.category === category
      )
    }
    
    // Limit results if provided
    if (limit) {
      attractions = attractions.slice(0, parseInt(limit))
    }
    
    return NextResponse.json({
      success: true,
      data: attractions,
      total: attractions.length
    })
  } catch (error) {
    console.error('Error fetching attractions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'Failed to fetch attractions'
      },
      { status: 500 }
    )
  }
}