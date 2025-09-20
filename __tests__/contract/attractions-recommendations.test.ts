import { describe, it, expect, beforeAll } from 'vitest'

describe('GET /api/attractions/recommendations - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  let authToken: string

  beforeAll(async () => {
    authToken = 'mock_jwt_token'
  })

  it('should retrieve personalized recommendations', async () => {
    const response = await fetch(`${baseUrl}/api/attractions/recommendations?lat=17.3850&lng=78.4867&limit=5`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData).toHaveProperty('recommendations')
    expect(responseData).toHaveProperty('userContext')
    expect(Array.isArray(responseData.recommendations)).toBe(true)
    
    if (responseData.recommendations.length > 0) {
      const recommendation = responseData.recommendations[0]
      expect(recommendation).toHaveProperty('id')
      expect(recommendation).toHaveProperty('name')
      expect(recommendation).toHaveProperty('recommendationScore')
      expect(recommendation).toHaveProperty('reasoning')
      expect(recommendation).toHaveProperty('matchFactors')
      expect(recommendation).toHaveProperty('estimatedVisitTime')
      expect(recommendation).toHaveProperty('distance')
      expect(recommendation).toHaveProperty('travelTime')
      expect(recommendation).toHaveProperty('currentConditions')
      
      expect(Array.isArray(recommendation.matchFactors)).toBe(true)
      expect(typeof recommendation.recommendationScore).toBe('number')
      expect(recommendation.recommendationScore).toBeGreaterThanOrEqual(0)
      expect(recommendation.recommendationScore).toBeLessThanOrEqual(1)
    }
  })

  it('should return 401 for unauthorized access', async () => {
    const response = await fetch(`${baseUrl}/api/attractions/recommendations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(401)
    
    const responseData = await response.json()
    expect(responseData.error).toBe('UNAUTHORIZED')
  })
})