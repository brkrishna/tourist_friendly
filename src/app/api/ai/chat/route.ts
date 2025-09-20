import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  message: string;
  context?: {
    currentLocation?: {
      latitude: number;
      longitude: number;
    };
    timeOfDay?: string;
    availableTime?: number;
    sessionId?: string;
  };
}

interface ChatResponse {
  sessionId: string;
  response: {
    message: string;
    type: string;
    confidence: number;
  };
  suggestions?: any[];
  quickActions?: any[];
  metadata: {
    responseTime: number;
    modelVersion: string;
    fallbackUsed: boolean;
    timestamp: string;
  };
}

// Mock AI responses for different types of queries
const mockResponses = {
  historical: {
    message: "I'd be happy to help you explore Hyderabad's rich historical heritage! Based on your location and available time, I recommend visiting Charminar first (15 minutes away), then Golconda Fort (25 minutes drive), and finishing at Qutb Shahi Tombs. This gives you a perfect historical journey covering different eras.",
    type: "itinerary_suggestion",
    confidence: 0.92,
    suggestions: [
      {
        id: "suggestion_001",
        type: "itinerary",
        title: "Historical Heritage Tour",
        items: [
          {
            attractionId: "attraction_001",
            name: "Charminar",
            visitTime: "10:00-11:30",
            duration: 90,
            reasoning: "Best lighting for photography and fewer crowds"
          },
          {
            attractionId: "attraction_003",
            name: "Golconda Fort",
            visitTime: "12:30-15:00", 
            duration: 150,
            reasoning: "Allow time for fort exploration and acoustics demonstration"
          }
        ],
        totalDuration: 330,
        estimatedCost: 125,
        currency: "INR"
      }
    ]
  },
  food: {
    message: "Great choice for exploring Hyderabadi cuisine! I recommend starting with authentic biryani at Paradise or Shah Ghouse, then trying street food at Charminar area. For vegetarian options, Chutneys has excellent South Indian dishes.",
    type: "restaurant_suggestion",
    confidence: 0.88,
    suggestions: []
  },
  general: {
    message: "Hello! I'm your AI travel assistant for Hyderabad. I can help you plan itineraries, find restaurants, book guides, and ensure your safety. What would you like to explore today?",
    type: "greeting",
    confidence: 0.95,
    suggestions: []
  }
};

function generateAIResponse(message: string, context?: any): ChatResponse {
  const lowerMessage = message.toLowerCase();
  let response;

  if (lowerMessage.includes('historical') || lowerMessage.includes('history') || lowerMessage.includes('heritage')) {
    response = mockResponses.historical;
  } else if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('eat')) {
    response = mockResponses.food;
  } else {
    response = mockResponses.general;
  }

  const quickActions = [
    {
      id: "action_001",
      type: "save_itinerary",
      label: "Save This Itinerary",
      data: { suggestionId: "suggestion_001" }
    },
    {
      id: "action_002",
      type: "find_restaurants",
      label: "Find Nearby Restaurants",
      data: { category: "local_cuisine" }
    },
    {
      id: "action_003",
      type: "check_weather",
      label: "Check Weather",
      data: { date: new Date().toISOString().split('T')[0] }
    }
  ];

  return {
    sessionId: context?.sessionId || `chat_session_${Date.now()}`,
    response,
    suggestions: response.suggestions,
    quickActions,
    metadata: {
      responseTime: Math.random() * 2 + 0.5, // Simulate 0.5-2.5s response time
      modelVersion: "tourist-assistant-v1.0",
      fallbackUsed: false,
      timestamp: new Date().toISOString()
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatMessage = await request.json();
    
    if (!body.message) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Message is required", field: "message" },
        { status: 400 }
      );
    }

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    const aiResponse = generateAIResponse(body.message, body.context);

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      { 
        error: "INTERNAL_ERROR", 
        message: "Failed to process AI request",
        fallback: "You can still browse attractions and restaurants manually."
      },
      { status: 500 }
    );
  }
}