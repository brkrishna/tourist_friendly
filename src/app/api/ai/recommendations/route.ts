import { NextRequest, NextResponse } from 'next/server';

interface RecommendationRequest {
  requestType: 'restaurant' | 'attraction' | 'guide' | 'itinerary';
  context: {
    currentLocation?: {
      latitude: number;
      longitude: number;
    };
    timeOfDay?: string;
    dietaryRestrictions?: string[];
    spicePreference?: string;
    budget?: {
      max: number;
      currency: string;
    };
    groupSize?: number;
    previousVisits?: string[];
  };
  preferences?: {
    cuisine?: string[];
    atmosphere?: string;
    walkingDistance?: number;
    interests?: string[];
  };
}

// Mock recommendation data
const mockRecommendations = {
  restaurant: [
    {
      id: "restaurant_008",
      name: "Shah Ghouse Cafe",
      type: "restaurant",
      aiScore: 0.94,
      reasoning: "Perfect match for vegetarian Hyderabadi cuisine near Charminar. Known for excellent vegetarian biryani and traditional ambiance.",
      matchFactors: [
        "vegetarian_friendly",
        "traditional_atmosphere",
        "budget_compatible",
        "walking_distance",
        "cuisine_match"
      ],
      personalizedInsights: [
        "Based on your medium spice preference, try their Special Veg Biryani",
        "Popular lunch spot for tourists - arrives early to avoid crowds",
        "Has won awards for authentic Hyderabadi vegetarian cuisine"
      ],
      distance: 0.3,
      walkingTime: 4,
      estimatedCost: 25,
      currency: "USD",
      currentAvailability: {
        waitTime: 10,
        reservationRecommended: false
      }
    }
  ],
  attraction: [
    {
      id: "attraction_001",
      name: "Charminar",
      type: "attraction",
      aiScore: 0.92,
      reasoning: "Matches your historical interests and is currently less crowded",
      matchFactors: ["historical_interest", "low_crowd", "photography_friendly"],
      estimatedVisitTime: 90,
      distance: 2.5,
      travelTime: 8,
      bestTimeToVisit: "now",
      pricing: {
        entryFee: 25,
        currency: "INR"
      },
      currentConditions: {
        crowdLevel: "low",
        waitTime: 5,
        weather: "clear"
      }
    }
  ]
};

export async function POST(request: NextRequest) {
  try {
    const body: RecommendationRequest = await request.json();
    
    if (!body.requestType) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Request type is required", field: "requestType" },
        { status: 400 }
      );
    }

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 300));

    const recommendations = mockRecommendations[body.requestType as keyof typeof mockRecommendations] || [];
    
    const response = {
      recommendations,
      alternatives: [
        {
          id: "alternative_001",
          name: "Alternative Option",
          reason: "If you prefer different style",
          distance: 0.8,
          aiScore: 0.85
        }
      ],
      contextualTips: [
        "Peak hours are typically 12:30-14:00 in this area",
        "Most places offer English-speaking staff",
        "Credit cards accepted at recommended locations"
      ],
      userContext: {
        interests: body.preferences?.interests || [],
        budget: body.context.budget || { max: 100, currency: "USD" },
        timeConstraints: {
          availableTime: 240,
          currentTime: new Date().toLocaleTimeString()
        }
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI Recommendations error:', error);
    return NextResponse.json(
      { 
        error: "INTERNAL_ERROR", 
        message: "Failed to generate recommendations"
      },
      { status: 500 }
    );
  }
}