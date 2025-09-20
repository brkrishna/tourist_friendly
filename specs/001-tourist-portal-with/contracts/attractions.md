# API Contract: Attractions

## Overview
Attraction discovery, filtering, search, and detailed information retrieval.

---

## Attraction Discovery

### GET /api/attractions
Retrieve filtered list of attractions.

**Query Parameters:**
- `category` (optional): Filter by category (historical, cultural, entertainment, religious, nature)
- `minPrice` (optional): Minimum entry fee
- `maxPrice` (optional): Maximum entry fee
- `distance` (optional): Distance from user location in km
- `accessibility` (optional): Filter for wheelchair accessible (true/false)
- `rating` (optional): Minimum rating (1-5)
- `open` (optional): Currently open attractions only (true/false)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)

**Example Request:**
```
GET /api/attractions?category=historical&maxPrice=100&accessibility=true&page=1&limit=10
```

**Response (200):**
```json
{
  "attractions": [
    {
      "id": "attraction_001",
      "name": "Charminar",
      "description": "Historic monument and mosque built in 1591, symbol of Hyderabad",
      "category": "historical",
      "location": {
        "latitude": 17.3616,
        "longitude": 78.4747,
        "address": "Charminar Rd, Char Kaman, Ghansi Bazaar, Hyderabad",
        "neighborhood": "Old City"
      },
      "images": [
        {
          "url": "/images/location1.jpg",
          "alt": "Charminar historic monument",
          "caption": "The iconic four-minaret structure of Charminar"
        }
      ],
      "pricing": {
        "entryFee": 25,
        "currency": "INR",
        "freeForChildren": true
      },
      "schedule": {
        "openingTime": "09:00",
        "closingTime": "17:30",
        "closedDays": [],
        "seasonalChanges": {}
      },
      "accessibility": {
        "wheelchairAccessible": false,
        "audioGuides": true,
        "visualAids": false,
        "accessibilityDescription": "Steep stairs limit wheelchair access to upper levels"
      },
      "realTimeData": {
        "crowdLevel": "medium",
        "waitTime": 15,
        "weatherImpact": "none",
        "lastUpdated": "2025-09-19T12:00:00Z"
      },
      "amenities": ["parking", "restrooms", "food_court", "gift_shop"],
      "rating": 4.5,
      "reviewCount": 1250,
      "tags": ["historic", "architecture", "photography", "culture"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  },
  "filters": {
    "appliedFilters": {
      "category": "historical",
      "maxPrice": 100,
      "accessibility": true
    },
    "availableFilters": {
      "categories": ["historical", "cultural", "entertainment", "religious", "nature"],
      "priceRange": {
        "min": 0,
        "max": 500
      },
      "ratings": [1, 2, 3, 4, 5]
    }
  }
}
```

### GET /api/attractions/{id}
Retrieve detailed information for a specific attraction.

**Parameters:**
- `id`: Attraction unique identifier

**Example Request:**
```
GET /api/attractions/attraction_001
```

**Response (200):**
```json
{
  "id": "attraction_001",
  "name": "Charminar",
  "description": "Historic monument and mosque built in 1591, symbol of Hyderabad. The Charminar constructed in 1591, is a monument located in Hyderabad, Telangana, India. The landmark has become known globally as a symbol of Hyderabad and is listed among the most recognized structures in India.",
  "category": "historical",
  "location": {
    "latitude": 17.3616,
    "longitude": 78.4747,
    "address": "Charminar Rd, Char Kaman, Ghansi Bazaar, Hyderabad",
    "neighborhood": "Old City"
  },
  "images": [
    {
      "url": "/images/location1.jpg",
      "alt": "Charminar historic monument",
      "caption": "The iconic four-minaret structure of Charminar"
    },
    {
      "url": "/images/location2.jpg",
      "alt": "Charminar at night",
      "caption": "Charminar illuminated during evening hours"
    }
  ],
  "pricing": {
    "entryFee": 25,
    "currency": "INR",
    "freeForChildren": true,
    "groupDiscounts": {
      "groups10Plus": 0.1,
      "groups20Plus": 0.15
    }
  },
  "schedule": {
    "openingTime": "09:00",
    "closingTime": "17:30",
    "closedDays": [],
    "specialHours": {
      "friday": {
        "openingTime": "14:00",
        "closingTime": "17:30"
      }
    }
  },
  "accessibility": {
    "wheelchairAccessible": false,
    "audioGuides": true,
    "visualAids": false,
    "accessibilityDescription": "Ground level accessible, steep stairs to upper levels limit wheelchair access",
    "assistanceAvailable": true,
    "parkingAccessible": true
  },
  "realTimeData": {
    "crowdLevel": "medium",
    "waitTime": 15,
    "weatherImpact": "none",
    "currentCapacity": 65,
    "maxCapacity": 100,
    "lastUpdated": "2025-09-19T12:00:00Z"
  },
  "amenities": [
    "parking",
    "restrooms", 
    "food_court",
    "gift_shop",
    "audio_guides",
    "photography_allowed",
    "wheelchair_rental"
  ],
  "rating": 4.5,
  "reviewCount": 1250,
  "tags": ["historic", "architecture", "photography", "culture", "mosque"],
  "nearbyAttractions": [
    {
      "id": "attraction_002",
      "name": "Laad Bazaar",
      "distance": 0.2,
      "walkingTime": 3
    }
  ],
  "culturalInfo": {
    "significance": "Symbol of Hyderabad, built by Sultan Muhammad Quli Qutb Shah",
    "bestVisitTime": "Early morning or late afternoon",
    "culturalEtiquette": ["Remove shoes before entering mosque areas", "Dress modestly", "Photography restrictions in prayer areas"],
    "historicalContext": "Built in 1591 to commemorate the founding of Hyderabad"
  }
}
```

---

## Attraction Search

### GET /api/attractions/search
Search attractions by keywords and location.

**Query Parameters:**
- `q`: Search query (required)
- `lat` (optional): User latitude for distance sorting
- `lng` (optional): User longitude for distance sorting
- `radius` (optional): Search radius in km (default: 50)
- `limit` (optional): Results limit (default: 20)

**Example Request:**
```
GET /api/attractions/search?q=fort&lat=17.3850&lng=78.4867&radius=25&limit=10
```

**Response (200):**
```json
{
  "query": "fort",
  "results": [
    {
      "id": "attraction_003",
      "name": "Golconda Fort",
      "description": "Historic fortified citadel built by the Kakatiyas",
      "category": "historical",
      "location": {
        "latitude": 17.3833,
        "longitude": 78.4011,
        "address": "Golconda, Hyderabad",
        "neighborhood": "Golconda"
      },
      "distance": 8.5,
      "travelTime": 25,
      "relevanceScore": 0.95,
      "images": [
        {
          "url": "/images/location3.jpg",
          "alt": "Golconda Fort entrance",
          "caption": "Main entrance to the historic Golconda Fort"
        }
      ],
      "pricing": {
        "entryFee": 30,
        "currency": "INR"
      },
      "rating": 4.3,
      "reviewCount": 890,
      "highlights": ["Acoustic effects", "Panoramic city views", "Light and sound show"]
    }
  ],
  "totalResults": 3,
  "searchTime": 0.15
}
```

---

## Real-time Data

### GET /api/attractions/{id}/live-data
Get current real-time information for an attraction.

**Parameters:**
- `id`: Attraction unique identifier

**Response (200):**
```json
{
  "attractionId": "attraction_001",
  "realTimeData": {
    "crowdLevel": "high",
    "waitTime": 25,
    "currentCapacity": 85,
    "maxCapacity": 100,
    "weatherImpact": "light_rain",
    "operationalStatus": "open",
    "lastUpdated": "2025-09-19T13:15:00Z"
  },
  "alerts": [
    {
      "type": "weather",
      "message": "Light rain expected. Upper levels may be slippery.",
      "severity": "low"
    },
    {
      "type": "capacity",
      "message": "Near capacity. Consider visiting after 15:00.",
      "severity": "medium"
    }
  ],
  "recommendations": {
    "bestVisitTime": "16:00-17:00",
    "alternativeAttractions": ["attraction_004", "attraction_005"],
    "estimatedWaitReduction": 15
  }
}
```

---

## Attraction Recommendations

### GET /api/attractions/recommendations
Get personalized attraction recommendations.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Query Parameters:**
- `lat` (optional): Current latitude
- `lng` (optional): Current longitude
- `timeOfDay` (optional): Current time context (morning, afternoon, evening)
- `availableTime` (optional): Available time in minutes
- `limit` (optional): Number of recommendations (default: 10)

**Response (200):**
```json
{
  "recommendations": [
    {
      "id": "attraction_001",
      "name": "Charminar",
      "recommendationScore": 0.92,
      "reasoning": "Matches your historical interests and is currently less crowded",
      "matchFactors": ["historical_interest", "low_crowd", "photography_friendly"],
      "estimatedVisitTime": 90,
      "distance": 2.5,
      "travelTime": 8,
      "bestTimeToVisit": "now",
      "pricing": {
        "entryFee": 25,
        "currency": "INR"
      },
      "currentConditions": {
        "crowdLevel": "low",
        "waitTime": 5,
        "weather": "clear"
      }
    }
  ],
  "userContext": {
    "interests": ["historical", "cultural"],
    "budget": {
      "remaining": 175,
      "currency": "USD"
    },
    "timeConstraints": {
      "availableTime": 240,
      "currentTime": "13:30"
    }
  }
}
```

---

## Attraction Reviews

### GET /api/attractions/{id}/reviews
Retrieve reviews for a specific attraction.

**Parameters:**
- `id`: Attraction unique identifier

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Reviews per page (default: 10)
- `sortBy` (optional): Sort order (newest, oldest, rating_high, rating_low, helpful)
- `accessibilityFilter` (optional): Filter by accessibility reviews (true/false)

**Response (200):**
```json
{
  "attractionId": "attraction_001",
  "reviews": [
    {
      "id": "review_001",
      "userId": "user_456",
      "userName": "Travel Explorer",
      "rating": 5,
      "title": "Iconic symbol of Hyderabad",
      "content": "Amazing historical monument with great architecture. The climb to the top offers fantastic city views. Audio guide was very informative.",
      "visitDate": "2025-09-15T00:00:00Z",
      "categories": {
        "cleanliness": 4,
        "service": 4,
        "value": 5,
        "accessibility": 2
      },
      "helpful": {
        "helpfulCount": 23,
        "totalVotes": 28
      },
      "photos": [
        {
          "url": "/user-photos/review_001_1.jpg",
          "caption": "View from the top"
        }
      ],
      "verified": true,
      "createdAt": "2025-09-15T18:30:00Z"
    }
  ],
  "summary": {
    "averageRating": 4.5,
    "totalReviews": 1250,
    "ratingDistribution": {
      "5": 650,
      "4": 400,
      "3": 150,
      "2": 30,
      "1": 20
    },
    "categoryAverages": {
      "cleanliness": 4.2,
      "service": 4.0,
      "value": 4.6,
      "accessibility": 2.8
    }
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1250,
    "totalPages": 125
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid category filter",
  "field": "category",
  "validValues": ["historical", "cultural", "entertainment", "religious", "nature"]
}
```

### 404 Not Found
```json
{
  "error": "NOT_FOUND",
  "message": "Attraction not found",
  "code": "ATTRACTION_NOT_FOUND"
}
```

### 500 Internal Server Error
```json
{
  "error": "INTERNAL_ERROR",
  "message": "Failed to fetch attraction data",
  "code": "DATA_FETCH_ERROR"
}
```