# Data Model: Vigilant Voyager Entities

## Overview
This document defines the data model for Vigilant Voyager, including entity relationships, validation rules, and state transitions based on the functional requirements.

---

## Core Entities

### User
Represents tourists using the portal with their preferences and profile information.

**Fields:**
- `id`: Unique identifier (string)
- `email`: User email address (string, required)
- `name`: Display name (string, required)
- `profileType`: User persona (enum: first-time, foodie, business, family, budget, accessibility, tech-savvy)
- `preferences`: User preferences object
  - `interests`: Array of interest categories (string[])
  - `budget`: Budget range object (min, max, currency)
  - `travelDates`: Travel period (startDate, endDate)
  - `groupSize`: Number of travelers (number)
  - `dietaryRestrictions`: Array of dietary needs (string[])
  - `accessibilityNeeds`: Accessibility requirements (string[])
  - `spiceLevel`: Preferred spice level (enum: mild, medium, hot)
- `emergencyContacts`: Array of emergency contact objects
- `location`: Current location (latitude, longitude)
- `createdAt`: Account creation timestamp
- `lastActive`: Last activity timestamp

**Relationships:**
- Has many: Bookings, Reviews, Itineraries, SafetyZones
- Belongs to: None

**Validation Rules:**
- Email must be valid format
- ProfileType must be one of defined enums
- Budget min cannot exceed max
- Travel dates must be future dates
- Emergency contacts must have valid phone/email

---

### Attraction
Represents tourist attractions in Hyderabad with details and availability.

**Fields:**
- `id`: Unique identifier (string)
- `name`: Attraction name (string, required)
- `description`: Detailed description (string)
- `category`: Attraction type (enum: historical, cultural, entertainment, religious, nature)
- `location`: Geographic location
  - `latitude`: Geographic latitude (number)
  - `longitude`: Geographic longitude (number)
  - `address`: Full address (string)
  - `neighborhood`: Area/district name (string)
- `images`: Array of image objects
  - `url`: Image file path (string)
  - `alt`: Alt text for accessibility (string)
  - `caption`: Image description (string)
- `pricing`: Pricing information
  - `entryFee`: Entry cost (number)
  - `currency`: Currency code (string)
  - `freeForChildren`: Free entry for children flag (boolean)
- `schedule`: Operating hours
  - `openingTime`: Daily opening time (string)
  - `closingTime`: Daily closing time (string)
  - `closedDays`: Array of closed days (string[])
  - `seasonalChanges`: Seasonal schedule variations (object)
- `accessibility`: Accessibility features
  - `wheelchairAccessible`: Wheelchair accessible flag (boolean)
  - `audioGuides`: Audio guide availability (boolean)
  - `visualAids`: Visual aid availability (boolean)
  - `accessibilityDescription`: Detailed accessibility info (string)
- `realTimeData`: Current conditions
  - `crowdLevel`: Current crowd level (enum: low, medium, high)
  - `waitTime`: Estimated wait time (number)
  - `weatherImpact`: Weather-related impacts (string)
  - `lastUpdated`: Data update timestamp
- `amenities`: Available amenities (string[])
- `rating`: Average rating (number, 1-5)
- `reviewCount`: Number of reviews (number)
- `tags`: Searchable tags (string[])

**Relationships:**
- Has many: Reviews, Bookings (through guides)
- Belongs to: None

**State Transitions:**
- Open → Closed (based on schedule)
- Available → Temporarily Closed (maintenance/weather)
- Normal Capacity → Limited Capacity → Full Capacity

---

### Restaurant
Represents dining establishments with cuisine and dietary information.

**Fields:**
- `id`: Unique identifier (string)
- `name`: Restaurant name (string, required)
- `description`: Restaurant description (string)
- `cuisineTypes`: Array of cuisine types (string[])
- `location`: Geographic location (same structure as Attraction)
- `images`: Array of food and restaurant images
- `pricing`: Price range information
  - `priceRange`: Price level (enum: budget, moderate, expensive, luxury)
  - `averageCost`: Average cost per person (number)
  - `currency`: Currency code (string)
- `dietaryOptions`: Dietary accommodation
  - `vegetarian`: Vegetarian options available (boolean)
  - `vegan`: Vegan options available (boolean)
  - `glutenFree`: Gluten-free options available (boolean)
  - `allergenInfo`: Allergen information (object)
  - `spiceLevels`: Available spice levels (string[])
- `schedule`: Operating hours (same structure as Attraction)
- `realTimeData`: Current status
  - `availability`: Current availability (enum: available, busy, full, closed)
  - `waitTime`: Estimated wait time (number)
  - `reservationRequired`: Reservation requirement flag (boolean)
- `menu`: Menu information
  - `items`: Array of menu item objects
  - `lastUpdated`: Menu update timestamp
- `amenities`: Restaurant amenities (string[])
- `rating`: Average rating (number, 1-5)
- `reviewCount`: Number of reviews (number)

**Relationships:**
- Has many: Reviews, Bookings
- Belongs to: None

---

### TourGuide
Represents blockchain-verified tour guides with certifications and specializations.

**Fields:**
- `id`: Unique identifier (string)
- `name`: Guide name (string, required)
- `profileImage`: Profile photo URL (string)
- `bio`: Professional biography (string)
- `specializations`: Areas of expertise (string[])
- `languages`: Spoken languages with proficiency (object[])
- `location`: Base location (same structure as Attraction location)
- `blockchainVerification`: Verification status
  - `verified`: Verification status (boolean)
  - `verificationDate`: Date of verification (timestamp)
  - `certificateHash`: Blockchain certificate hash (string)
  - `trustScore`: Trust rating (number, 1-100)
  - `backgroundCheckStatus`: Background check status (enum: pending, approved, rejected)
- `certifications`: Professional certifications
  - `tourismLicense`: Tourism license info (object)
  - `firstAidCertified`: First aid certification (boolean)
  - `accessibilityTraining`: Accessibility training status (boolean)
  - `businessExperience`: Business tour experience (boolean)
- `availability`: Schedule and availability
  - `schedule`: Weekly availability (object)
  - `bookedDates`: Array of booked date ranges
  - `hourlyRate`: Hourly rate (number)
  - `currency`: Currency code (string)
- `performance`: Performance metrics
  - `rating`: Average rating (number, 1-5)
  - `reviewCount`: Number of reviews (number)
  - `completedTours`: Number of completed tours (number)
  - `responseTime`: Average response time (number, hours)
- `preferences`: Guide preferences
  - `maxGroupSize`: Maximum group size (number)
  - `tourTypes`: Preferred tour types (string[])
  - `ageGroups`: Preferred age groups (string[])

**Relationships:**
- Has many: Bookings, Reviews
- Belongs to: None

**State Transitions:**
- Unverified → Under Review → Verified/Rejected
- Available → Booked → Completed → Available
- Active → Inactive (based on activity)

---

### Itinerary
Represents user-specific travel plans with AI recommendations and optimizations.

**Fields:**
- `id`: Unique identifier (string)
- `userId`: Associated user ID (string, required)
- `name`: Itinerary name (string)
- `description`: Itinerary description (string)
- `dateRange`: Travel period
  - `startDate`: Start date (timestamp)
  - `endDate`: End date (timestamp)
  - `totalDays`: Number of days (number)
- `items`: Array of itinerary items
  - `id`: Item unique ID (string)
  - `type`: Item type (enum: attraction, restaurant, guide, event, transport)
  - `entityId`: Reference to entity (attraction, restaurant, etc.)
  - `scheduledTime`: Planned time (timestamp)
  - `duration`: Estimated duration (number, minutes)
  - `notes`: User notes (string)
  - `status`: Item status (enum: planned, confirmed, completed, cancelled)
- `aiRecommendations`: AI-generated suggestions
  - `suggestions`: Array of recommendation objects
  - `reasoning`: AI reasoning for recommendations (string)
  - `confidence`: Confidence score (number, 0-1)
  - `lastUpdated`: AI update timestamp
- `optimization`: Route and timing optimization
  - `optimizedRoute`: Optimized travel route (object)
  - `travelTimes`: Estimated travel times between items (object)
  - `alternativeOptions`: Alternative suggestions (array)
- `preferences`: Itinerary-specific preferences
  - `pace`: Travel pace (enum: relaxed, moderate, packed)
  - `budget`: Budget allocation (object)
  - `priorities`: Priority categories (string[])

**Relationships:**
- Belongs to: User
- References: Attractions, Restaurants, TourGuides, CulturalEvents

**State Transitions:**
- Draft → Published → Active → Completed
- Planned Items → Confirmed → Completed/Cancelled

---

### SafetyZone
Represents geographic safety zones with dynamic risk assessment.

**Fields:**
- `id`: Unique identifier (string)
- `userId`: Associated user ID (string, required)
- `name`: Zone name (string)
- `type`: Zone type (enum: safe, caution, restricted, emergency)
- `geometry`: Geographic boundary
  - `type`: Geometry type (enum: circle, polygon)
  - `coordinates`: Array of coordinate points
  - `radius`: Radius for circular zones (number, meters)
- `riskLevel`: Current risk assessment
  - `level`: Risk level (enum: low, medium, high, critical)
  - `factors`: Contributing risk factors (string[])
  - `lastAssessed`: Risk assessment timestamp
- `alerts`: Alert configuration
  - `entryAlert`: Alert on zone entry (boolean)
  - `exitAlert`: Alert on zone exit (boolean)
  - `alertContacts`: Emergency contacts for alerts (string[])
  - `alertMethods`: Alert methods (string[])
- `metadata`: Additional zone information
  - `description`: Zone description (string)
  - `createdBy`: Creator (enum: user, system, admin)
  - `source`: Information source (string)
  - `validUntil`: Zone validity expiration (timestamp)

**Relationships:**
- Belongs to: User
- References: EmergencyContacts

---

### Booking
Represents reservations for guides, experiences, and restaurants.

**Fields:**
- `id`: Unique identifier (string)
- `userId`: Associated user ID (string, required)
- `type`: Booking type (enum: guide, restaurant, experience, transport)
- `entityId`: Booked entity ID (string, required)
- `dateTime`: Booking date and time (timestamp)
- `duration`: Booking duration (number, minutes)
- `groupSize`: Number of people (number)
- `status`: Booking status (enum: pending, confirmed, completed, cancelled)
- `pricing`: Booking cost information
  - `basePrice`: Base price (number)
  - `totalPrice`: Total price including fees (number)
  - `currency`: Currency code (string)
  - `paymentStatus`: Payment status (enum: unpaid, paid, refunded)
- `details`: Booking-specific details
  - `specialRequests`: Special requirements (string)
  - `accessibilityNeeds`: Accessibility requirements (string[])
  - `dietaryRequirements`: Dietary needs (string[])
- `blockchain`: Blockchain verification (for guide bookings)
  - `transactionHash`: Blockchain transaction hash (string)
  - `verificationStatus`: Verification status (boolean)
- `communication`: Communication logs
  - `messages`: Array of message objects
  - `lastContact`: Last communication timestamp

**Relationships:**
- Belongs to: User
- References: TourGuide, Restaurant, Attraction

**State Transitions:**
- Pending → Confirmed → Active → Completed
- Any state → Cancelled (with business rules)

---

### Review
Represents user-generated content for attractions, guides, and restaurants.

**Fields:**
- `id`: Unique identifier (string)
- `userId`: Reviewer user ID (string, required)
- `entityId`: Reviewed entity ID (string, required)
- `entityType`: Entity type (enum: attraction, restaurant, guide)
- `rating`: Numeric rating (number, 1-5)
- `title`: Review title (string)
- `content`: Review content (string)
- `photos`: Array of review photo objects
- `visitDate`: Date of visit/experience (timestamp)
- `categories`: Category-specific ratings
  - `cleanliness`: Cleanliness rating (number, 1-5)
  - `service`: Service rating (number, 1-5)
  - `value`: Value for money rating (number, 1-5)
  - `accessibility`: Accessibility rating (number, 1-5)
- `helpful`: Helpfulness metrics
  - `helpfulCount`: Number of helpful votes (number)
  - `totalVotes`: Total votes (number)
- `moderation`: Content moderation
  - `status`: Moderation status (enum: pending, approved, rejected)
  - `moderatedBy`: Moderator ID (string)
  - `moderationDate`: Moderation timestamp
- `metadata`: Review metadata
  - `verified`: Verified visit status (boolean)
  - `language`: Review language (string)
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp

**Relationships:**
- Belongs to: User
- References: Attraction, Restaurant, TourGuide

---

### EmergencyContact
Represents trusted contacts for safety and emergency situations.

**Fields:**
- `id`: Unique identifier (string)
- `userId`: Associated user ID (string, required)
- `name`: Contact name (string, required)
- `relationship`: Relationship to user (string)
- `phone`: Phone number (string, required)
- `email`: Email address (string)
- `priority`: Contact priority (enum: primary, secondary, emergency)
- `permissions`: Contact permissions
  - `locationSharing`: Location sharing permission (boolean)
  - `emergencyNotifications`: Emergency notification permission (boolean)
  - `itineraryAccess`: Itinerary access permission (boolean)
- `availability`: Contact availability
  - `timezone`: Contact timezone (string)
  - `preferredHours`: Preferred contact hours (object)
  - `alternateNumbers`: Alternative phone numbers (string[])

**Relationships:**
- Belongs to: User

---

### CulturalEvent
Represents festivals, celebrations, and local happenings.

**Fields:**
- `id`: Unique identifier (string)
- `name`: Event name (string, required)
- `description`: Event description (string)
- `type`: Event type (enum: festival, cultural, religious, seasonal, historical)
- `location`: Event location (same structure as Attraction location)
- `dateTime`: Event timing
  - `startDate`: Event start date (timestamp)
  - `endDate`: Event end date (timestamp)
  - `recurring`: Recurring event pattern (object)
- `details`: Event details
  - `significance`: Cultural significance (string)
  - `traditions`: Associated traditions (string[])
  - `participationGuidelines`: Participation guidelines (string)
  - `culturalSensitivity`: Cultural sensitivity notes (string)
- `accessibility`: Event accessibility
  - `wheelchairAccessible`: Wheelchair accessibility (boolean)
  - `languageSupport`: Language support available (string[])
  - `assistanceAvailable`: Assistance availability (boolean)
- `media`: Event media
  - `images`: Event photos (array)
  - `videos`: Event videos (array)
  - `virtualTour`: Virtual tour availability (boolean)

**Relationships:**
- Has many: Reviews
- References: Attractions (if held at specific venues)

---

## Data Relationships Summary

```
User (1) ←→ (M) Itinerary
User (1) ←→ (M) Booking
User (1) ←→ (M) Review
User (1) ←→ (M) SafetyZone
User (1) ←→ (M) EmergencyContact

Attraction (1) ←→ (M) Review
Restaurant (1) ←→ (M) Review
TourGuide (1) ←→ (M) Review

TourGuide (1) ←→ (M) Booking
Restaurant (1) ←→ (M) Booking

Itinerary (M) ←→ (M) Attraction (references)
Itinerary (M) ←→ (M) Restaurant (references)
Itinerary (M) ←→ (M) TourGuide (references)
Itinerary (M) ←→ (M) CulturalEvent (references)
```

---

## Validation Rules Summary

### Cross-Entity Validation
- User travel dates must be consistent across itineraries and bookings
- Booking dates must fall within attraction/restaurant operating hours
- Guide availability must be verified before booking confirmation
- Safety zone coordinates must be valid geographic coordinates
- Review dates must be after user registration date

### Business Logic Constraints
- Users cannot book the same guide for overlapping time periods
- Restaurant bookings require advance notice based on restaurant policy
- Attraction capacity limits must be respected for group bookings
- Emergency contacts must have valid communication methods
- Blockchain verification must be validated before guide activation

---

*Data model complete - ready for contract generation*