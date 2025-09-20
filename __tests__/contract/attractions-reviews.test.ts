import { describe, it, expect } from 'vitest'

describe('GET /api/attractions/{id}/reviews - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should retrieve reviews for attraction', async () => {
    const attractionId = 'attraction_001'
    const response = await fetch(`${baseUrl}/api/attractions/${attractionId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData.attractionId).toBe(attractionId)
    expect(responseData).toHaveProperty('reviews')
    expect(responseData).toHaveProperty('summary')
    expect(responseData).toHaveProperty('pagination')
    
    expect(Array.isArray(responseData.reviews)).toBe(true)
    
    if (responseData.reviews.length > 0) {
      const review = responseData.reviews[0]
      expect(review).toHaveProperty('id')
      expect(review).toHaveProperty('userId')
      expect(review).toHaveProperty('userName')
      expect(review).toHaveProperty('rating')
      expect(review).toHaveProperty('title')
      expect(review).toHaveProperty('content')
      expect(review).toHaveProperty('visitDate')
      expect(review).toHaveProperty('categories')
      expect(review).toHaveProperty('helpful')
      expect(review).toHaveProperty('verified')
      expect(review).toHaveProperty('createdAt')
      
      expect(typeof review.rating).toBe('number')
      expect(review.rating).toBeGreaterThanOrEqual(1)
      expect(review.rating).toBeLessThanOrEqual(5)
    }
    
    const summary = responseData.summary
    expect(summary).toHaveProperty('averageRating')
    expect(summary).toHaveProperty('totalReviews')
    expect(summary).toHaveProperty('ratingDistribution')
    expect(summary).toHaveProperty('categoryAverages')
  })

  it('should handle pagination parameters', async () => {
    const attractionId = 'attraction_001'
    const response = await fetch(`${baseUrl}/api/attractions/${attractionId}/reviews?page=1&limit=5`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData.pagination.page).toBe(1)
    expect(responseData.pagination.limit).toBe(5)
    expect(responseData.reviews.length).toBeLessThanOrEqual(5)
  })
})