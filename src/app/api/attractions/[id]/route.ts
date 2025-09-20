import { NextResponse } from 'next/server'
import attractionsData from '@/data/attractions.json'
import { Attraction } from '@/types/attraction'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const attractions: Attraction[] = attractionsData as Attraction[]
    const attraction = attractions.find(a => a.id === params.id)
    
    if (!attraction) {
      return NextResponse.json(
        {
          success: false,
          error: 'NOT_FOUND',
          message: 'Attraction not found'
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: attraction
    })
  } catch (error) {
    console.error('Error fetching attraction:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'Failed to fetch attraction'
      },
      { status: 500 }
    )
  }
}