import { Location, ImageAsset, Schedule, RealTimeData } from './attraction'

export interface Restaurant {
  id: string
  name: string
  description: string
  cuisineTypes: string[]
  location: Location
  images: ImageAsset[]
  pricing: {
    priceRange: 'budget' | 'moderate' | 'expensive' | 'luxury'
    averageCost: number
    currency: string
  }
  dietaryOptions: {
    vegetarian: boolean
    vegan: boolean
    glutenFree: boolean
    allergenInfo: object
    spiceLevels: string[]
  }
  schedule: Schedule
  realTimeData: RestaurantRealTimeData
  menu: {
    items: MenuItem[]
    lastUpdated: string
  }
  amenities: string[]
  rating: number
  reviewCount: number
}

export interface RestaurantRealTimeData extends Omit<RealTimeData, 'crowdLevel'> {
  availability: 'available' | 'busy' | 'full' | 'closed'
  reservationRequired: boolean
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  spiceLevel: string
  dietaryTags: string[]
}