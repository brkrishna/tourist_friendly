import { NextRequest, NextResponse } from 'next/server';

// Mock experiences data - in production this would come from a database
const experiences = [
  {
    id: 'exp-001',
    name: 'Heritage Photography Walk',
    description: 'Capture the essence of Old Hyderabad through your lens with expert guidance',
    category: 'photography',
    type: 'walking_tour',
    duration: 180, // 3 hours in minutes
    difficulty: 'easy',
    location: {
      startPoint: 'Charminar',
      latitude: 17.3616,
      longitude: 78.4747,
      address: 'Charminar, Old City, Hyderabad, Telangana 500002',
      area: 'Old City'
    },
    pricing: {
      basePrice: 2500,
      currency: 'INR',
      groupDiscount: 10, // percentage
      includes: ['Professional photographer guide', 'Photo editing tips', 'Digital copies of group photos']
    },
    schedule: {
      availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      timeSlots: ['06:00', '16:00'], // Golden hour times
      advanceBooking: 24 // hours
    },
    groupSize: {
      min: 2,
      max: 8,
      optimal: 5
    },
    rating: 4.7,
    reviewCount: 156,
    highlights: [
      'Golden hour photography at Charminar',
      'Street photography in Laad Bazaar',
      'Architecture shots of Mecca Masjid',
      'Portrait photography with locals',
      'Traditional craft documentation'
    ],
    itinerary: [
      {
        time: '06:00',
        location: 'Charminar',
        activity: 'Sunrise shots and composition basics',
        duration: 45
      },
      {
        time: '06:45',
        location: 'Laad Bazaar',
        activity: 'Street photography and market scenes',
        duration: 60
      },
      {
        time: '07:45',
        location: 'Mecca Masjid',
        activity: 'Architecture and cultural photography',
        duration: 45
      },
      {
        time: '08:30',
        location: 'Local Tea Stall',
        activity: 'Portrait sessions and review',
        duration: 30
      }
    ],
    requirements: {
      physicalFitness: 'basic',
      equipment: 'Camera/smartphone required',
      ageRestriction: '12+',
      weatherDependent: true
    },
    languages: ['English', 'Hindi', 'Telugu'],
    tags: ['photography', 'heritage', 'culture', 'walking', 'sunrise'],
    images: [
      '/experiences/photo-walk-1.jpg',
      '/experiences/photo-walk-2.jpg',
      '/experiences/photo-walk-3.jpg'
    ],
    guide: {
      id: 'guide-004',
      name: 'Arjun Reddy',
      specialization: 'Photography & Heritage',
      experience: 8,
      rating: 4.8
    },
    verified: true,
    safetyRating: 'high',
    accessibility: {
      wheelchairFriendly: false,
      publicTransportAccess: true,
      parkingAvailable: false
    }
  },
  {
    id: 'exp-002',
    name: 'Nizami Cuisine Masterclass',
    description: 'Learn to cook authentic Hyderabadi dishes with a royal family descendant',
    category: 'culinary',
    type: 'cooking_class',
    duration: 240, // 4 hours
    difficulty: 'beginner',
    location: {
      startPoint: 'Heritage Kitchen Studio',
      latitude: 17.4126,
      longitude: 78.4484,
      address: 'Banjara Hills, Hyderabad, Telangana 500034',
      area: 'Banjara Hills'
    },
    pricing: {
      basePrice: 4500,
      currency: 'INR',
      groupDiscount: 15,
      includes: ['All ingredients', 'Recipe cards', 'Full meal', 'Take-home spices', 'Apron']
    },
    schedule: {
      availableDays: ['tuesday', 'thursday', 'saturday', 'sunday'],
      timeSlots: ['10:00', '15:00'],
      advanceBooking: 48
    },
    groupSize: {
      min: 4,
      max: 12,
      optimal: 8
    },
    rating: 4.9,
    reviewCount: 203,
    highlights: [
      'Cook traditional Hyderabadi biryani',
      'Learn about Nizami culinary history',
      'Spice blending techniques',
      'Royal presentation styles',
      'Family recipes passed down generations'
    ],
    itinerary: [
      {
        time: '10:00',
        location: 'Kitchen Studio',
        activity: 'Welcome and history of Nizami cuisine',
        duration: 30
      },
      {
        time: '10:30',
        location: 'Spice Corner',
        activity: 'Spice identification and blending',
        duration: 45
      },
      {
        time: '11:15',
        location: 'Cooking Stations',
        activity: 'Biryani preparation - rice and meat',
        duration: 90
      },
      {
        time: '12:45',
        location: 'Side Dishes Area',
        activity: 'Preparing raita and shorba',
        duration: 45
      },
      {
        time: '13:30',
        location: 'Dining Area',
        activity: 'Enjoy the feast and take-home prep',
        duration: 30
      }
    ],
    requirements: {
      physicalFitness: 'none',
      equipment: 'All provided',
      ageRestriction: '8+',
      weatherDependent: false
    },
    languages: ['English', 'Hindi', 'Urdu'],
    tags: ['cooking', 'culture', 'biryani', 'history', 'indoor'],
    images: [
      '/experiences/cooking-class-1.jpg',
      '/experiences/cooking-class-2.jpg',
      '/experiences/cooking-class-3.jpg'
    ],
    guide: {
      id: 'guide-005',
      name: 'Fatima Begum',
      specialization: 'Nizami Cuisine',
      experience: 15,
      rating: 4.9
    },
    verified: true,
    safetyRating: 'high',
    accessibility: {
      wheelchairFriendly: true,
      publicTransportAccess: true,
      parkingAvailable: true
    }
  },
  {
    id: 'exp-003',
    name: 'Hyderabad by Night Motorcycle Tour',
    description: 'Experience the city\'s vibrant nightlife and illuminated monuments on a guided bike tour',
    category: 'adventure',
    type: 'motorcycle_tour',
    duration: 180,
    difficulty: 'moderate',
    location: {
      startPoint: 'Tank Bund',
      latitude: 17.4239,
      longitude: 78.4738,
      address: 'Tank Bund Road, Hyderabad, Telangana 500080',
      area: 'Hussain Sagar'
    },
    pricing: {
      basePrice: 3200,
      currency: 'INR',
      groupDiscount: 5,
      includes: ['Motorcycle rental', 'Helmet and safety gear', 'Fuel', 'Professional guide', 'Insurance']
    },
    schedule: {
      availableDays: ['friday', 'saturday', 'sunday'],
      timeSlots: ['19:00'],
      advanceBooking: 24
    },
    groupSize: {
      min: 3,
      max: 10,
      optimal: 6
    },
    rating: 4.5,
    reviewCount: 89,
    highlights: [
      'Illuminated Charminar at night',
      'Hussain Sagar Buddha statue',
      'Birla Mandir evening views',
      'Local street food stops',
      'Night photography opportunities'
    ],
    itinerary: [
      {
        time: '19:00',
        location: 'Tank Bund',
        activity: 'Safety briefing and bike assignment',
        duration: 30
      },
      {
        time: '19:30',
        location: 'Hussain Sagar',
        activity: 'Buddha statue and lake views',
        duration: 30
      },
      {
        time: '20:00',
        location: 'Charminar',
        activity: 'Night photography session',
        duration: 45
      },
      {
        time: '20:45',
        location: 'Birla Mandir',
        activity: 'City skyline views',
        duration: 30
      },
      {
        time: '21:15',
        location: 'Street Food Market',
        activity: 'Local snacks and wrap-up',
        duration: 45
      }
    ],
    requirements: {
      physicalFitness: 'good',
      equipment: 'Valid driving license required',
      ageRestriction: '18+',
      weatherDependent: true
    },
    languages: ['English', 'Hindi', 'Telugu'],
    tags: ['adventure', 'motorcycle', 'night', 'sightseeing', 'photography'],
    images: [
      '/experiences/night-bike-1.jpg',
      '/experiences/night-bike-2.jpg',
      '/experiences/night-bike-3.jpg'
    ],
    guide: {
      id: 'guide-006',
      name: 'Vikram Singh',
      specialization: 'Adventure & Night Tours',
      experience: 6,
      rating: 4.6
    },
    verified: true,
    safetyRating: 'medium',
    accessibility: {
      wheelchairFriendly: false,
      publicTransportAccess: true,
      parkingAvailable: true
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const difficulty = searchParams.get('difficulty');
    const duration = searchParams.get('duration');
    const priceRange = searchParams.get('priceRange');
    const rating = parseFloat(searchParams.get('rating') || '0');
    const area = searchParams.get('area');
    const date = searchParams.get('date');
    const groupSize = parseInt(searchParams.get('groupSize') || '1');
    const latitude = parseFloat(searchParams.get('latitude') || '0');
    const longitude = parseFloat(searchParams.get('longitude') || '0');
    const radius = parseFloat(searchParams.get('radius') || '15000'); // 15km default
    const sortBy = searchParams.get('sortBy') || 'rating';
    const order = searchParams.get('order') || 'desc';
    const search = searchParams.get('search')?.toLowerCase();
    const verified = searchParams.get('verified');

    let filteredExperiences = [...experiences];

    // Text search
    if (search) {
      filteredExperiences = filteredExperiences.filter(experience =>
        experience.name.toLowerCase().includes(search) ||
        experience.description.toLowerCase().includes(search) ||
        experience.category.toLowerCase().includes(search) ||
        experience.highlights.some(h => h.toLowerCase().includes(search)) ||
        experience.tags.some(t => t.toLowerCase().includes(search))
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredExperiences = filteredExperiences.filter(exp => exp.category === category);
    }

    // Filter by type
    if (type && type !== 'all') {
      filteredExperiences = filteredExperiences.filter(exp => exp.type === type);
    }

    // Filter by difficulty
    if (difficulty && difficulty !== 'all') {
      filteredExperiences = filteredExperiences.filter(exp => exp.difficulty === difficulty);
    }

    // Filter by duration
    if (duration) {
      const [min, max] = duration.split('-').map(Number);
      filteredExperiences = filteredExperiences.filter(exp => {
        if (max) {
          return exp.duration >= min && exp.duration <= max;
        } else {
          return exp.duration >= min;
        }
      });
    }

    // Filter by price range
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filteredExperiences = filteredExperiences.filter(exp => {
        if (maxPrice) {
          return exp.pricing.basePrice >= minPrice && exp.pricing.basePrice <= maxPrice;
        } else {
          return exp.pricing.basePrice >= minPrice;
        }
      });
    }

    // Filter by minimum rating
    if (rating > 0) {
      filteredExperiences = filteredExperiences.filter(exp => exp.rating >= rating);
    }

    // Filter by area
    if (area && area !== 'all') {
      filteredExperiences = filteredExperiences.filter(exp => 
        exp.location.area.toLowerCase() === area.toLowerCase()
      );
    }

    // Filter by date availability (mock implementation)
    if (date) {
      const requestedDate = new Date(date);
      const dayOfWeek = requestedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      filteredExperiences = filteredExperiences.filter(exp => 
        exp.schedule.availableDays.includes(dayOfWeek)
      );
    }

    // Filter by group size
    if (groupSize > 0) {
      filteredExperiences = filteredExperiences.filter(exp => 
        groupSize >= exp.groupSize.min && groupSize <= exp.groupSize.max
      );
    }

    // Filter by verified status
    if (verified === 'true') {
      filteredExperiences = filteredExperiences.filter(exp => exp.verified === true);
    }

    // Filter by location proximity
    if (latitude && longitude) {
      filteredExperiences = filteredExperiences.filter(experience => {
        const distance = calculateDistance(
          latitude, longitude,
          experience.location.latitude,
          experience.location.longitude
        );
        return distance <= radius;
      }).map(experience => ({
        ...experience,
        distance: calculateDistance(
          latitude, longitude,
          experience.location.latitude,
          experience.location.longitude
        )
      }));
    }

    // Sort experiences
    filteredExperiences.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'price':
          aValue = a.pricing.basePrice;
          bValue = b.pricing.basePrice;
          break;
        case 'duration':
          aValue = a.duration;
          bValue = b.duration;
          break;
        case 'distance':
          aValue = (a as any).distance || 0;
          bValue = (b as any).distance || 0;
          break;
        default:
          aValue = a.rating;
          bValue = b.rating;
          break;
      }

      if (typeof aValue === 'string') {
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });

    // Calculate summary statistics
    const summary = {
      total: filteredExperiences.length,
      categories: Array.from(new Set(filteredExperiences.map(e => e.category))),
      types: Array.from(new Set(filteredExperiences.map(e => e.type))),
      difficulties: Array.from(new Set(filteredExperiences.map(e => e.difficulty))),
      averageRating: filteredExperiences.length > 0 ? 
        filteredExperiences.reduce((sum, e) => sum + e.rating, 0) / filteredExperiences.length : 0,
      averagePrice: filteredExperiences.length > 0 ? 
        filteredExperiences.reduce((sum, e) => sum + e.pricing.basePrice, 0) / filteredExperiences.length : 0,
      averageDuration: filteredExperiences.length > 0 ? 
        filteredExperiences.reduce((sum, e) => sum + e.duration, 0) / filteredExperiences.length : 0
    };

    return NextResponse.json({
      experiences: filteredExperiences,
      summary,
      filters: {
        applied: { category, type, difficulty, duration, priceRange, rating, area, date, groupSize, search, verified },
        location: latitude && longitude ? { latitude, longitude, radius } : null
      }
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields for booking an experience
    const { experienceId, userId, date, groupSize, timeSlot } = body;
    
    if (!experienceId || !userId || !date || !groupSize || !timeSlot) {
      return NextResponse.json(
        { error: 'Missing required fields: experienceId, userId, date, groupSize, timeSlot' },
        { status: 400 }
      );
    }

    const experience = experiences.find(e => e.id === experienceId);
    
    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    // Validate group size
    if (groupSize < experience.groupSize.min || groupSize > experience.groupSize.max) {
      return NextResponse.json(
        { error: `Group size must be between ${experience.groupSize.min} and ${experience.groupSize.max}` },
        { status: 400 }
      );
    }

    // Calculate pricing
    let totalPrice = experience.pricing.basePrice * groupSize;
    if (groupSize >= 4 && experience.pricing.groupDiscount) {
      totalPrice = totalPrice * (1 - experience.pricing.groupDiscount / 100);
    }

    const bookingId = `exp-booking-${Date.now()}`;
    
    const booking = {
      id: bookingId,
      experienceId,
      experienceName: experience.name,
      userId,
      date,
      timeSlot,
      groupSize,
      status: 'pending',
      pricing: {
        basePrice: experience.pricing.basePrice,
        totalPrice: Math.round(totalPrice),
        currency: experience.pricing.currency,
        discountApplied: groupSize >= 4 ? experience.pricing.groupDiscount : 0
      },
      guide: experience.guide,
      location: experience.location,
      requirements: experience.requirements,
      specialRequests: body.specialRequests || ''
    };

    return NextResponse.json({
      message: 'Experience booking created successfully',
      booking,
      nextSteps: [
        'Payment confirmation required',
        'Guide will be notified',
        'Detailed itinerary will be sent via email'
      ]
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating experience booking:', error);
    return NextResponse.json(
      { error: 'Failed to create experience booking' },
      { status: 500 }
    );
  }
}

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distance in meters
}