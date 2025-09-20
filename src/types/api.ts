export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthResponse {
  id: string
  email: string
  name: string
  profileType: string
  token: string
  createdAt?: string
  lastActive?: string
}

export interface LocationUpdate {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: string
}

export interface SafetyAlert {
  type: string
  level: 'low' | 'medium' | 'high' | 'critical'
  message: string
  distance: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AIRecommendation {
  id: string
  type: 'attraction' | 'restaurant' | 'guide' | 'itinerary'
  entityId: string
  reason: string
  confidence: number
}