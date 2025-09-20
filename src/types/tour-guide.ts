import { Location } from './attraction'

export interface TourGuide {
  id: string
  name: string
  profileImage: string
  bio: string
  specializations: string[]
  languages: Array<{
    language: string
    proficiency: string
  }>
  location: Location
  blockchainVerification: {
    verified: boolean
    verificationDate: string
    certificateHash: string
    trustScore: number
    backgroundCheckStatus: 'pending' | 'approved' | 'rejected'
  }
  certifications: {
    tourismLicense: object
    firstAidCertified: boolean
    accessibilityTraining: boolean
    businessExperience: boolean
  }
  availability: {
    schedule: object
    bookedDates: string[]
    hourlyRate: number
    currency: string
  }
  performance: {
    rating: number
    reviewCount: number
    completedTours: number
    responseTime: number
  }
  preferences: {
    maxGroupSize: number
    tourTypes: string[]
    ageGroups: string[]
  }
}