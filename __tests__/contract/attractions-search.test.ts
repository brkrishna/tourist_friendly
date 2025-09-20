import { describe, it, expect } from 'vitest'

describe('GET /api/attractions/search - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should search attractions by keyword', async () => {
    const response = await fetch(`${baseUrl}/api/attractions/search?q=fort`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData).toHaveProperty('query', 'fort')
    expect(responseData).toHaveProperty('results')
    expect(responseData).toHaveProperty('totalResults')
    expect(responseData).toHaveProperty('searchTime')
    expect(Array.isArray(responseData.results)).toBe(true)
    
    if (responseData.results.length > 0) {
      const result = responseData.results[0]
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('description')
      expect(result).toHaveProperty('category')
      expect(result).toHaveProperty('location')
      expect(result).toHaveProperty('relevanceScore')
      expect(result).toHaveProperty('rating')
      expect(result).toHaveProperty('reviewCount')
    }
  })

  it('should include distance and travel time when location provided', async () => {
    const response = await fetch(`${baseUrl}/api/attractions/search?q=monument&lat=17.3850&lng=78.4867`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    
    if (responseData.results.length > 0) {
      const result = responseData.results[0]
      expect(result).toHaveProperty('distance')
      expect(result).toHaveProperty('travelTime')
      expect(typeof result.distance).toBe('number')
      expect(typeof result.travelTime).toBe('number')
    }
  })

  it('should return 400 for missing search query', async () => {
    const response = await fetch(`${baseUrl}/api/attractions/search`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(400)
    
    const responseData = await response.json()
    expect(responseData.error).toBe('VALIDATION_ERROR')
    expect(responseData.field).toBe('q')
  })
})