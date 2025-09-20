import { describe, it, expect, beforeAll } from 'vitest'

describe('GET /api/users/profile - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  let authToken: string

  beforeAll(async () => {
    // This test assumes a user is already logged in
    // In a real implementation, this would be set up properly
    authToken = 'mock_jwt_token'
  })

  it('should retrieve current user profile with valid token', async () => {
    const response = await fetch(`${baseUrl}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData).toHaveProperty('id')
    expect(responseData).toHaveProperty('email')
    expect(responseData).toHaveProperty('name')
    expect(responseData).toHaveProperty('profileType')
    expect(responseData).toHaveProperty('preferences')
    expect(responseData.preferences).toHaveProperty('interests')
    expect(responseData.preferences).toHaveProperty('budget')
    expect(responseData).toHaveProperty('emergencyContacts')
    expect(responseData).toHaveProperty('createdAt')
    expect(responseData).toHaveProperty('lastActive')
  })

  it('should return 401 for missing authorization token', async () => {
    const response = await fetch(`${baseUrl}/api/users/profile`, {
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

describe('PUT /api/users/profile - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  let authToken: string

  beforeAll(async () => {
    authToken = 'mock_jwt_token'
  })

  it('should update user profile with valid data', async () => {
    const updateData = {
      name: 'Sarah Chen-Kim',
      preferences: {
        interests: ['historical', 'cultural', 'cuisine'],
        budget: {
          min: 75,
          max: 250,
          currency: 'USD'
        },
        spiceLevel: 'hot'
      }
    }

    const response = await fetch(`${baseUrl}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData).toHaveProperty('id')
    expect(responseData.name).toBe(updateData.name)
    expect(responseData.preferences.interests).toEqual(updateData.preferences.interests)
    expect(responseData.preferences.budget).toEqual(updateData.preferences.budget)
    expect(responseData.preferences.spiceLevel).toBe(updateData.preferences.spiceLevel)
    expect(responseData).toHaveProperty('updatedAt')
  })

  it('should return 400 for invalid preference data', async () => {
    const invalidUpdateData = {
      preferences: {
        budget: {
          min: 250,
          max: 50, // min > max should be invalid
          currency: 'USD'
        }
      }
    }

    const response = await fetch(`${baseUrl}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidUpdateData),
    })

    expect(response.status).toBe(400)
    
    const responseData = await response.json()
    expect(responseData.error).toBe('VALIDATION_ERROR')
  })
})