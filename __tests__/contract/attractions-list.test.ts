import { describe, it, expect } from 'vitest'

describe('GET /api/attractions - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should retrieve filtered list of attractions with default parameters', async () => {
    const response = await fetch(`${baseUrl}/api/attractions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData).toHaveProperty('attractions')
    expect(responseData).toHaveProperty('pagination')
    expect(responseData).toHaveProperty('filters')
    expect(Array.isArray(responseData.attractions)).toBe(true)
    
    // Check pagination structure
    expect(responseData.pagination).toHaveProperty('page')
    expect(responseData.pagination).toHaveProperty('limit')
    expect(responseData.pagination).toHaveProperty('total')
    expect(responseData.pagination).toHaveProperty('totalPages')
    
    // Check each attraction has required fields
    if (responseData.attractions.length > 0) {
      const attraction = responseData.attractions[0]
      expect(attraction).toHaveProperty('id')
      expect(attraction).toHaveProperty('name')
      expect(attraction).toHaveProperty('description')
      expect(attraction).toHaveProperty('category')
      expect(attraction).toHaveProperty('location')
      expect(attraction).toHaveProperty('pricing')
      expect(attraction).toHaveProperty('rating')
      expect(attraction).toHaveProperty('reviewCount')
    }
  })

  it('should filter attractions by category', async () => {
    const response = await fetch(`${baseUrl}/api/attractions?category=historical`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData.filters.appliedFilters).toHaveProperty('category', 'historical')
    
    responseData.attractions.forEach((attraction: any) => {
      expect(attraction.category).toBe('historical')
    })
  })

  it('should return 400 for invalid category filter', async () => {
    const response = await fetch(`${baseUrl}/api/attractions?category=invalid`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(400)
    
    const responseData = await response.json()
    expect(responseData.error).toBe('VALIDATION_ERROR')
    expect(responseData.field).toBe('category')
  })
})