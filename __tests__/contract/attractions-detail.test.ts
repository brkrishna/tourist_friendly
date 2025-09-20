import { describe, it, expect } from 'vitest'

describe('GET /api/attractions/{id} - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should retrieve detailed attraction information', async () => {
    const attractionId = 'attraction_001'
    const response = await fetch(`${baseUrl}/api/attractions/${attractionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData.id).toBe(attractionId)
    expect(responseData).toHaveProperty('name')
    expect(responseData).toHaveProperty('description')
    expect(responseData).toHaveProperty('category')
    expect(responseData).toHaveProperty('location')
    expect(responseData.location).toHaveProperty('latitude')
    expect(responseData.location).toHaveProperty('longitude')
    expect(responseData.location).toHaveProperty('address')
    expect(responseData).toHaveProperty('images')
    expect(responseData).toHaveProperty('pricing')
    expect(responseData).toHaveProperty('schedule')
    expect(responseData).toHaveProperty('accessibility')
    expect(responseData).toHaveProperty('realTimeData')
    expect(responseData).toHaveProperty('amenities')
    expect(responseData).toHaveProperty('rating')
    expect(responseData).toHaveProperty('reviewCount')
    expect(responseData).toHaveProperty('tags')
    expect(responseData).toHaveProperty('culturalInfo')
    
    // Validate nested objects
    expect(Array.isArray(responseData.images)).toBe(true)
    expect(Array.isArray(responseData.amenities)).toBe(true)
    expect(Array.isArray(responseData.tags)).toBe(true)
    
    if (responseData.images.length > 0) {
      const image = responseData.images[0]
      expect(image).toHaveProperty('url')
      expect(image).toHaveProperty('alt')
      expect(image).toHaveProperty('caption')
    }
  })

  it('should return 404 for non-existent attraction', async () => {
    const response = await fetch(`${baseUrl}/api/attractions/non_existent_id`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(404)
    
    const responseData = await response.json()
    expect(responseData.error).toBe('NOT_FOUND')
    expect(responseData.code).toBe('ATTRACTION_NOT_FOUND')
  })
})