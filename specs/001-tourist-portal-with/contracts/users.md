# API Contract: User Management

## Overview
User registration, authentication, profile management, and preference handling.

---

## Authentication Endpoints

### POST /api/auth/register
Create new user account with profile setup.

**Request:**
```json
{
  "email": "sarah.chen@email.com",
  "name": "Sarah Chen",
  "profileType": "first-time",
  "preferences": {
    "interests": ["historical", "cultural"],
    "budget": {
      "min": 50,
      "max": 200,
      "currency": "USD"
    },
    "travelDates": {
      "startDate": "2025-10-01T00:00:00Z",
      "endDate": "2025-10-05T00:00:00Z"
    },
    "groupSize": 2,
    "dietaryRestrictions": ["vegetarian"],
    "accessibilityNeeds": [],
    "spiceLevel": "medium"
  }
}
```

**Response (201):**
```json
{
  "id": "user_12345",
  "email": "sarah.chen@email.com",
  "name": "Sarah Chen",
  "profileType": "first-time",
  "token": "jwt_token_here",
  "createdAt": "2025-09-19T10:00:00Z"
}
```

**Response (400):**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid email format",
  "field": "email"
}
```

### POST /api/auth/login
Authenticate existing user.

**Request:**
```json
{
  "email": "sarah.chen@email.com",
  "password": "secure_password"
}
```

**Response (200):**
```json
{
  "id": "user_12345",
  "email": "sarah.chen@email.com",
  "name": "Sarah Chen",
  "profileType": "first-time",
  "token": "jwt_token_here",
  "lastActive": "2025-09-19T09:30:00Z"
}
```

---

## Profile Management

### GET /api/users/profile
Retrieve current user profile.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response (200):**
```json
{
  "id": "user_12345",
  "email": "sarah.chen@email.com",
  "name": "Sarah Chen",
  "profileType": "first-time",
  "preferences": {
    "interests": ["historical", "cultural"],
    "budget": {
      "min": 50,
      "max": 200,
      "currency": "USD"
    },
    "travelDates": {
      "startDate": "2025-10-01T00:00:00Z",
      "endDate": "2025-10-05T00:00:00Z"
    },
    "groupSize": 2,
    "dietaryRestrictions": ["vegetarian"],
    "accessibilityNeeds": [],
    "spiceLevel": "medium"
  },
  "emergencyContacts": [
    {
      "id": "contact_1",
      "name": "John Chen",
      "relationship": "spouse",
      "phone": "+1-555-0123",
      "email": "john.chen@email.com",
      "priority": "primary"
    }
  ],
  "createdAt": "2025-09-19T10:00:00Z",
  "lastActive": "2025-09-19T10:30:00Z"
}
```

### PUT /api/users/profile
Update user profile and preferences.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request:**
```json
{
  "name": "Sarah Chen-Kim",
  "preferences": {
    "interests": ["historical", "cultural", "cuisine"],
    "budget": {
      "min": 75,
      "max": 250,
      "currency": "USD"
    },
    "spiceLevel": "hot"
  }
}
```

**Response (200):**
```json
{
  "id": "user_12345",
  "name": "Sarah Chen-Kim",
  "preferences": {
    "interests": ["historical", "cultural", "cuisine"],
    "budget": {
      "min": 75,
      "max": 250,
      "currency": "USD"
    },
    "spiceLevel": "hot"
  },
  "updatedAt": "2025-09-19T11:00:00Z"
}
```

---

## Emergency Contacts

### POST /api/users/emergency-contacts
Add emergency contact.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request:**
```json
{
  "name": "Emergency Services",
  "relationship": "emergency",
  "phone": "+91-100",
  "priority": "emergency",
  "permissions": {
    "locationSharing": true,
    "emergencyNotifications": true,
    "itineraryAccess": false
  }
}
```

**Response (201):**
```json
{
  "id": "contact_2",
  "name": "Emergency Services",
  "relationship": "emergency",
  "phone": "+91-100",
  "priority": "emergency",
  "permissions": {
    "locationSharing": true,
    "emergencyNotifications": true,
    "itineraryAccess": false
  },
  "createdAt": "2025-09-19T11:05:00Z"
}
```

### GET /api/users/emergency-contacts
Retrieve all emergency contacts.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response (200):**
```json
{
  "contacts": [
    {
      "id": "contact_1",
      "name": "John Chen",
      "relationship": "spouse",
      "phone": "+1-555-0123",
      "email": "john.chen@email.com",
      "priority": "primary",
      "permissions": {
        "locationSharing": true,
        "emergencyNotifications": true,
        "itineraryAccess": true
      }
    },
    {
      "id": "contact_2",
      "name": "Emergency Services",
      "relationship": "emergency",
      "phone": "+91-100",
      "priority": "emergency",
      "permissions": {
        "locationSharing": true,
        "emergencyNotifications": true,
        "itineraryAccess": false
      }
    }
  ]
}
```

---

## Location Services

### POST /api/users/location
Update user location for safety tracking.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request:**
```json
{
  "latitude": 17.3850,
  "longitude": 78.4867,
  "accuracy": 10,
  "timestamp": "2025-09-19T12:00:00Z"
}
```

**Response (200):**
```json
{
  "success": true,
  "safetyStatus": "safe",
  "nearbyAlerts": [],
  "updatedAt": "2025-09-19T12:00:00Z"
}
```

**Response (200) - Safety Alert:**
```json
{
  "success": true,
  "safetyStatus": "caution",
  "nearbyAlerts": [
    {
      "type": "safety_zone",
      "level": "medium",
      "message": "You are approaching a crowded area. Stay alert.",
      "distance": 50
    }
  ],
  "updatedAt": "2025-09-19T12:00:00Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Missing required field",
  "field": "email",
  "code": "FIELD_REQUIRED"
}
```

### 401 Unauthorized
```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid or expired token",
  "code": "TOKEN_INVALID"
}
```

### 404 Not Found
```json
{
  "error": "NOT_FOUND",
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}
```

### 500 Internal Server Error
```json
{
  "error": "INTERNAL_ERROR",
  "message": "An internal error occurred",
  "code": "INTERNAL_ERROR"
}
```