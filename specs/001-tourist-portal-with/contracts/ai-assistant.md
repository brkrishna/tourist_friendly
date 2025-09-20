# API Contract: AI Assistant

## Overview
Conversational AI assistant for travel planning, recommendations, and real-time assistance.

---

## Chat Interface

### POST /api/ai/chat
Send message to AI assistant and receive response.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request:**
```json
{
  "message": "I want to visit some historical places in Hyderabad. Can you suggest a good itinerary for tomorrow?",
  "context": {
    "currentLocation": {
      "latitude": 17.3850,
      "longitude": 78.4867
    },
    "timeOfDay": "morning",
    "availableTime": 480,
    "sessionId": "chat_session_123"
  }
}
```

**Response (200):**
```json
{
  "sessionId": "chat_session_123",
  "response": {
    "message": "I'd be happy to help you explore Hyderabad's rich historical heritage! Based on your location and available time, I recommend visiting Charminar first (15 minutes away), then Golconda Fort (25 minutes drive), and finishing at Qutb Shahi Tombs. This gives you a perfect historical journey covering different eras.",
    "type": "itinerary_suggestion",
    "confidence": 0.92
  },
  "suggestions": [
    {
      "id": "suggestion_001",
      "type": "itinerary",
      "title": "Historical Heritage Tour",
      "items": [
        {
          "attractionId": "attraction_001",
          "name": "Charminar",
          "visitTime": "10:00-11:30",
          "duration": 90,
          "reasoning": "Best lighting for photography and fewer crowds"
        },
        {
          "attractionId": "attraction_003",
          "name": "Golconda Fort",
          "visitTime": "12:30-15:00",
          "duration": 150,
          "reasoning": "Allow time for fort exploration and acoustics demonstration"
        },
        {
          "attractionId": "attraction_007",
          "name": "Qutb Shahi Tombs",
          "visitTime": "15:30-17:00",
          "duration": 90,
          "reasoning": "Beautiful architecture in golden hour lighting"
        }
      ],
      "totalDuration": 330,
      "estimatedCost": 125,
      "currency": "INR"
    }
  ],
  "quickActions": [
    {
      "id": "action_001",
      "type": "save_itinerary",
      "label": "Save This Itinerary",
      "data": {
        "suggestionId": "suggestion_001"
      }
    },
    {
      "id": "action_002", 
      "type": "book_guide",
      "label": "Find Historical Guide",
      "data": {
        "specialization": "historical",
        "language": "english"
      }
    },
    {
      "id": "action_003",
      "type": "check_weather",
      "label": "Check Tomorrow's Weather",
      "data": {
        "date": "2025-09-20"
      }
    }
  ],
  "metadata": {
    "responseTime": 1.2,
    "modelVersion": "tourist-assistant-v1.0",
    "fallbackUsed": false,
    "timestamp": "2025-09-19T14:00:00Z"
  }
}
```

---

## Conversation Context

### GET /api/ai/chat/history
Retrieve chat conversation history.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Query Parameters:**
- `sessionId` (optional): Specific session ID
- `limit` (optional): Number of messages (default: 50)
- `page` (optional): Page number (default: 1)

**Response (200):**
```json
{
  "sessionId": "chat_session_123",
  "messages": [
    {
      "id": "msg_001",
      "type": "user",
      "content": "I want to visit some historical places in Hyderabad. Can you suggest a good itinerary for tomorrow?",
      "timestamp": "2025-09-19T14:00:00Z"
    },
    {
      "id": "msg_002",
      "type": "assistant",
      "content": "I'd be happy to help you explore Hyderabad's rich historical heritage! Based on your location and available time, I recommend visiting Charminar first (15 minutes away), then Golconda Fort (25 minutes drive), and finishing at Qutb Shahi Tombs.",
      "suggestions": ["suggestion_001"],
      "timestamp": "2025-09-19T14:00:15Z"
    }
  ],
  "context": {
    "userPreferences": {
      "interests": ["historical", "cultural"],
      "budget": {"max": 200, "currency": "USD"},
      "accessibilityNeeds": []
    },
    "currentItinerary": null,
    "lastLocation": {
      "latitude": 17.3850,
      "longitude": 78.4867,
      "timestamp": "2025-09-19T13:55:00Z"
    }
  },
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 12,
    "totalPages": 1
  }
}
```

---

## Intelligent Recommendations

### POST /api/ai/recommendations
Get AI-powered recommendations based on context and preferences.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request:**
```json
{
  "requestType": "restaurant",
  "context": {
    "currentLocation": {
      "latitude": 17.3616,
      "longitude": 78.4747
    },
    "timeOfDay": "lunch",
    "dietaryRestrictions": ["vegetarian"],
    "spicePreference": "medium",
    "budget": {"max": 50, "currency": "USD"},
    "groupSize": 2,
    "previousVisits": ["restaurant_005", "restaurant_012"]
  },
  "preferences": {
    "cuisine": ["indian", "hyderabadi"],
    "atmosphere": "traditional",
    "walkingDistance": 10
  }
}
```

**Response (200):**
```json
{
  "recommendations": [
    {
      "id": "restaurant_008",
      "name": "Shah Ghouse Cafe",
      "type": "restaurant",
      "aiScore": 0.94,
      "reasoning": "Perfect match for vegetarian Hyderabadi cuisine near Charminar. Known for excellent vegetarian biryani and traditional ambiance.",
      "matchFactors": [
        "vegetarian_friendly",
        "traditional_atmosphere", 
        "budget_compatible",
        "walking_distance",
        "cuisine_match"
      ],
      "personalizedInsights": [
        "Based on your medium spice preference, try their Special Veg Biryani",
        "Popular lunch spot for tourists - arrives early to avoid crowds",
        "Has won awards for authentic Hyderabadi vegetarian cuisine"
      ],
      "distance": 0.3,
      "walkingTime": 4,
      "estimatedCost": 25,
      "currency": "USD",
      "currentAvailability": {
        "waitTime": 10,
        "reservationRecommended": false
      }
    }
  ],
  "alternatives": [
    {
      "id": "restaurant_015",
      "name": "Minerva Coffee Shop", 
      "reason": "If you prefer South Indian vegetarian options",
      "distance": 0.5,
      "aiScore": 0.87
    }
  ],
  "contextualTips": [
    "Lunch rush typically starts at 12:30 PM in this area",
    "Most restaurants near Charminar close between 2-4 PM",
    "Traditional thali options available at most recommended places"
  ]
}
```

---

## Real-time Assistance

### POST /api/ai/emergency-help
Get AI assistance for emergency or urgent situations.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request:**
```json
{
  "emergency": {
    "type": "safety_concern",
    "description": "I think I'm lost near Old City and it's getting dark",
    "urgency": "high",
    "location": {
      "latitude": 17.3580,
      "longitude": 78.4738,
      "accuracy": 20
    }
  }
}
```

**Response (200):**
```json
{
  "response": {
    "message": "I understand you're concerned about your safety. You're currently near the Charminar area in Old City. I'm providing immediate assistance and safety guidance.",
    "urgency": "high",
    "type": "safety_assistance"
  },
  "immediateActions": [
    {
      "priority": 1,
      "action": "emergency_contacts",
      "description": "Your emergency contacts have been automatically notified of your location",
      "status": "completed"
    },
    {
      "priority": 2,
      "action": "safe_route",
      "description": "Navigate to well-lit main road (Charminar Road) - 2 minutes walk north",
      "directions": {
        "steps": [
          "Head north towards the main Charminar Road",
          "Stay on well-lit path with crowd presence",
          "Look for police booth near Charminar monument"
        ],
        "distance": 150,
        "estimatedTime": 2
      }
    }
  ],
  "safetyResources": [
    {
      "type": "police_station",
      "name": "Charminar Police Station",
      "phone": "+91-40-2457-0349",
      "distance": 0.3,
      "walkingTime": 4
    },
    {
      "type": "tourist_helpline",
      "name": "Hyderabad Tourism Helpline",
      "phone": "+91-40-2345-0123",
      "available": "24/7"
    }
  ],
  "realTimeSupport": {
    "sessionId": "emergency_session_456",
    "monitoring": true,
    "checkInInterval": 300,
    "autoAlert": {
      "enabled": true,
      "triggerTime": 1800
    }
  }
}
```

---

## Itinerary Optimization

### POST /api/ai/optimize-itinerary
AI-powered itinerary optimization based on real-time conditions.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request:**
```json
{
  "itineraryId": "itinerary_789",
  "currentTime": "2025-09-20T10:30:00Z",
  "currentLocation": {
    "latitude": 17.3850,
    "longitude": 78.4867
  },
  "constraints": {
    "remainingTime": 360,
    "budget": {"remaining": 100, "currency": "USD"},
    "energy": "medium"
  },
  "optimize": ["time", "cost", "experience"]
}
```

**Response (200):**
```json
{
  "optimization": {
    "optimizationType": "real_time_conditions",
    "reasoning": "Modified itinerary due to high crowds at Golconda Fort and weather conditions. Rearranged for better experience and time efficiency.",
    "improvementScore": 0.23,
    "modifications": [
      {
        "type": "reorder",
        "description": "Moved Salar Jung Museum earlier due to lower crowds",
        "impact": "Reduces wait time by 30 minutes"
      },
      {
        "type": "replacement",
        "original": "Golconda Fort",
        "replacement": "Qutb Shahi Tombs", 
        "description": "Less crowded alternative with similar historical value",
        "impact": "Saves 45 minutes, maintains historical theme"
      }
    ]
  },
  "optimizedItinerary": {
    "id": "itinerary_789_optimized",
    "items": [
      {
        "id": "item_001",
        "type": "attraction",
        "attractionId": "attraction_006",
        "name": "Salar Jung Museum",
        "scheduledTime": "11:00-13:00",
        "duration": 120,
        "status": "suggested",
        "changes": ["time_moved_earlier"],
        "reasoning": "Currently 40% less crowded than usual"
      },
      {
        "id": "item_002",
        "type": "restaurant",
        "restaurantId": "restaurant_008",
        "name": "Shah Ghouse Cafe",
        "scheduledTime": "13:15-14:15",
        "duration": 60,
        "status": "confirmed",
        "changes": [],
        "reasoning": "Lunch timing optimal for this location"
      }
    ],
    "totalDuration": 300,
    "estimatedCost": 85,
    "currency": "USD"
  },
  "realTimeFactors": [
    {
      "factor": "crowd_levels",
      "impact": "high",
      "description": "Golconda Fort experiencing 90% capacity"
    },
    {
      "factor": "weather",
      "impact": "medium", 
      "description": "Afternoon thunderstorms predicted"
    },
    {
      "factor": "traffic",
      "impact": "low",
      "description": "Normal traffic conditions"
    }
  ]
}
```

---

## Cultural Context AI

### GET /api/ai/cultural-context
Get AI-powered cultural context and etiquette guidance.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Query Parameters:**
- `attractionId` (optional): Specific attraction
- `activityType` (optional): Type of activity (dining, religious, shopping)
- `userBackground` (optional): User's cultural background

**Response (200):**
```json
{
  "culturalGuidance": {
    "location": "Charminar Mosque Area",
    "context": "Religious and historical significance",
    "recommendations": [
      {
        "category": "dress_code",
        "title": "Modest Dress Required",
        "description": "Cover shoulders and legs when entering mosque areas",
        "importance": "required",
        "tips": ["Long pants/skirts", "Covered shoulders", "Scarves available at entrance"]
      },
      {
        "category": "behavior",
        "title": "Religious Etiquette",
        "description": "Respectful behavior in active worship areas",
        "importance": "required",
        "tips": ["Remove shoes before entering", "Speak quietly", "No photography during prayers"]
      },
      {
        "category": "cultural_appreciation",
        "title": "Historical Context",
        "description": "Understanding the monument's significance",
        "importance": "recommended",
        "tips": ["Built in 1591 to commemorate Hyderabad's founding", "Symbol of the city", "Active place of worship"]
      }
    ],
    "commonMistakes": [
      "Entering with shoes on",
      "Loud conversations in prayer areas",
      "Inappropriate photography"
    ],
    "culturalInsights": [
      "Friday prayers are especially significant (12:30-14:00)",
      "Local vendors appreciate basic Urdu/Telugu greetings",
      "Bargaining is expected in surrounding markets"
    ]
  },
  "languageHelp": {
    "basicPhrases": [
      {
        "english": "Thank you",
        "urdu": "Shukriya",
        "pronunciation": "shook-ree-ya"
      },
      {
        "english": "How much?",
        "urdu": "Kitna hai?", 
        "pronunciation": "kit-na hai"
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid message format or missing context",
  "field": "message",
  "code": "INVALID_INPUT"
}
```

### 401 Unauthorized
```json
{
  "error": "UNAUTHORIZED",
  "message": "Valid authentication required for AI assistant",
  "code": "AUTH_REQUIRED"
}
```

### 429 Too Many Requests
```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "AI assistant rate limit exceeded. Please wait before next request.",
  "retryAfter": 60,
  "code": "RATE_LIMIT"
}
```

### 503 Service Unavailable
```json
{
  "error": "AI_SERVICE_UNAVAILABLE",
  "message": "AI assistant temporarily unavailable. Please try again later.",
  "fallback": "You can still browse attractions and restaurants manually.",
  "code": "SERVICE_DOWN"
}
```