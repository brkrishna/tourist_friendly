import { NextResponse } from 'next/server'
import { User } from '@/types/user'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, profileType, preferences } = body
    
    // Basic validation
    if (!email || !name || !profileType) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Missing required fields',
          field: !email ? 'email' : !name ? 'name' : 'profileType'
        },
        { status: 400 }
      )
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid email format',
          field: 'email'
        },
        { status: 400 }
      )
    }
    
    // Create new user (in real app, save to database)
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      profileType,
      preferences: preferences || {},
      emergencyContacts: [],
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }
    
    // Generate mock JWT token
    const token = `mock_jwt_${newUser.id}_${Date.now()}`
    
    return NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        profileType: newUser.profileType,
        token,
        createdAt: newUser.createdAt
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: 'Registration failed'
      },
      { status: 500 }
    )
  }
}