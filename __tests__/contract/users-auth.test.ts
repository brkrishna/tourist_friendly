import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('POST /api/auth/register - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should create new user account with valid profile data', async () => {
    const userData = {
      email: 'sarah.chen@email.com',
      name: 'Sarah Chen',
      profileType: 'first-time',
      preferences: {
        interests: ['historical', 'cultural'],
        budget: {
          min: 50,
          max: 200,
          currency: 'USD'
        },
        travelDates: {
          startDate: '2025-10-01T00:00:00Z',
          endDate: '2025-10-05T00:00:00Z'
        },
        groupSize: 2,
        dietaryRestrictions: ['vegetarian'],
        accessibilityNeeds: [],
        spiceLevel: 'medium'
      }
    }

    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    expect(response.status).toBe(201)
    
    const responseData = await response.json()
    expect(responseData).toHaveProperty('id')
    expect(responseData.email).toBe(userData.email)
    expect(responseData.name).toBe(userData.name)
    expect(responseData.profileType).toBe(userData.profileType)
    expect(responseData).toHaveProperty('token')
    expect(responseData).toHaveProperty('createdAt')
  })

  it('should return 400 for invalid email format', async () => {
    const invalidUserData = {
      email: 'invalid-email',
      name: 'Test User',
      profileType: 'first-time',
      preferences: {}
    }

    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidUserData),
    })

    expect(response.status).toBe(400)
    
    const responseData = await response.json()
    expect(responseData.error).toBe('VALIDATION_ERROR')
    expect(responseData.field).toBe('email')
  })
})

describe('POST /api/auth/login - Contract Test', () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should authenticate existing user with valid credentials', async () => {
    const loginData = {
      email: 'sarah.chen@email.com',
      password: 'secure_password'
    }

    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })

    expect(response.status).toBe(200)
    
    const responseData = await response.json()
    expect(responseData).toHaveProperty('id')
    expect(responseData.email).toBe(loginData.email)
    expect(responseData).toHaveProperty('token')
    expect(responseData).toHaveProperty('lastActive')
  })

  it('should return 401 for invalid credentials', async () => {
    const invalidLoginData = {
      email: 'sarah.chen@email.com',
      password: 'wrong_password'
    }

    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidLoginData),
    })

    expect(response.status).toBe(401)
    
    const responseData = await response.json()
    expect(responseData.error).toBe('UNAUTHORIZED')
  })
})