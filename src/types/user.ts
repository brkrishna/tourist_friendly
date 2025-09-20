export interface User {
  id: string
  email: string
  name: string
  profileType: 'first-time' | 'foodie' | 'business' | 'family' | 'budget' | 'accessibility' | 'tech-savvy'
  preferences: UserPreferences
  emergencyContacts: EmergencyContact[]
  location?: {
    latitude: number
    longitude: number
  }
  createdAt: string
  lastActive: string
}

export interface UserPreferences {
  interests: string[]
  budget: {
    min: number
    max: number
    currency: string
  }
  travelDates: {
    startDate: string
    endDate: string
  }
  groupSize: number
  dietaryRestrictions: string[]
  accessibilityNeeds: string[]
  spiceLevel: 'mild' | 'medium' | 'hot'
}

export interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  email?: string
  priority: 'primary' | 'secondary' | 'emergency'
  permissions: {
    locationSharing: boolean
    emergencyNotifications: boolean
    itineraryAccess: boolean
  }
}