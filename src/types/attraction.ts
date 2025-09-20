export interface Attraction {
  id: string
  name: string
  description: string
  category: 'historical' | 'cultural' | 'entertainment' | 'religious' | 'nature'
  location: Location
  images: ImageAsset[]
  pricing: {
    entryFee: number
    currency: string
    freeForChildren: boolean
  }
  schedule: Schedule
  accessibility: AccessibilityInfo
  realTimeData: RealTimeData
  amenities: string[]
  rating: number
  reviewCount: number
  tags: string[]
}

export interface Location {
  latitude: number
  longitude: number
  address: string
  neighborhood: string
}

export interface ImageAsset {
  url: string
  alt: string
  caption: string
}

export interface Schedule {
  openingTime: string
  closingTime: string
  closedDays: string[]
  seasonalChanges?: object
}

export interface AccessibilityInfo {
  wheelchairAccessible: boolean
  audioGuides: boolean
  visualAids: boolean
  accessibilityDescription: string
}

export interface RealTimeData {
  crowdLevel: 'low' | 'medium' | 'high'
  waitTime: number
  weatherImpact: string
  lastUpdated: string
}