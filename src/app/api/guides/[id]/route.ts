import { NextRequest, NextResponse } from 'next/server';

// This would typically come from the main guides route or database
const guides = [
  {
    id: 'guide-001',
    name: 'Rajesh Kumar',
    profileImage: '/images/guides/rajesh-kumar.jpg',
    bio: 'Experienced heritage guide with 15 years of expertise in Hyderabad history and culture. Specialized in Qutb Shahi and Nizami heritage tours.',
    specializations: ['Historical Sites', 'Cultural Heritage', 'Photography Tours', 'Architecture'],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Hindi', proficiency: 'Native' },
      { language: 'Telugu', proficiency: 'Native' },
      { language: 'Urdu', proficiency: 'Intermediate' }
    ],
    location: {
      latitude: 17.3616,
      longitude: 78.4747,
      address: 'Old City, Hyderabad, Telangana',
      neighborhood: 'Charminar'
    },
    blockchainVerification: {
      verified: true,
      verificationDate: '2024-08-15T10:30:00Z',
      certificateHash: 'abc123def456ghi789',
      trustScore: 95,
      backgroundCheckStatus: 'approved'
    },
    certifications: {
      tourismLicense: {
        number: 'TG-TOUR-2024-001',
        issuedBy: 'Telangana Tourism Board',
        validUntil: '2025-12-31',
        verified: true
      },
      firstAidCertified: true,
      accessibilityTraining: true,
      businessExperience: true
    },
    availability: {
      schedule: {
        monday: { available: true, hours: '09:00-18:00' },
        tuesday: { available: true, hours: '09:00-18:00' },
        wednesday: { available: true, hours: '09:00-18:00' },
        thursday: { available: true, hours: '09:00-18:00' },
        friday: { available: true, hours: '09:00-18:00' },
        saturday: { available: true, hours: '08:00-19:00' },
        sunday: { available: true, hours: '08:00-19:00' }
      },
      bookedDates: [
        { start: '2025-09-22T09:00:00Z', end: '2025-09-22T17:00:00Z' },
        { start: '2025-09-25T10:00:00Z', end: '2025-09-25T15:00:00Z' }
      ],
      hourlyRate: 1500,
      currency: 'INR'
    },
    performance: {
      rating: 4.8,
      reviewCount: 234,
      completedTours: 456,
      responseTime: 2 // hours
    },
    preferences: {
      maxGroupSize: 8,
      tourTypes: ['Walking Tours', 'Photography Tours', 'Cultural Tours'],
      ageGroups: ['Adults', 'Seniors', 'Families']
    },
    portfolio: [
      {
        title: 'Golconda Fort Heritage Walk',
        description: 'Explore the magnificent Golconda Fort with detailed insights into Qutb Shahi architecture',
        duration: '4 hours',
        price: 6000,
        images: ['/images/tours/golconda-heritage.jpg']
      },
      {
        title: 'Charminar & Old City Cultural Tour',
        description: 'Discover the heart of Hyderabad with stories of Nizami culture and heritage',
        duration: '3 hours',
        price: 4500,
        images: ['/images/tours/charminar-cultural.jpg']
      }
    ],
    reviews: [
      {
        id: 'review-001',
        userId: 'user-001',
        userName: 'Sarah Chen',
        rating: 5,
        comment: 'Rajesh was an outstanding guide! His knowledge of Hyderabad history is incredible.',
        date: '2025-09-15T14:30:00Z',
        tourType: 'Heritage Walk'
      },
      {
        id: 'review-002',
        userId: 'user-002', 
        userName: 'David Wilson',
        rating: 5,
        comment: 'Excellent photography tour. Rajesh knew all the best spots and timing for photos.',
        date: '2025-09-10T16:45:00Z',
        tourType: 'Photography Tour'
      }
    ]
  }
  // Other guides would be here...
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: guideId } = await params;
    
    if (!guideId) {
      return NextResponse.json(
        { error: 'Guide ID is required' },
        { status: 400 }
      );
    }

    const guide = guides.find(g => g.id === guideId);
    
    if (!guide) {
      return NextResponse.json(
        { error: 'Tour guide not found' },
        { status: 404 }
      );
    }

    // Add real-time availability status
    const currentDate = new Date();
    const todayDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todaySchedule = guide.availability.schedule[todayDay as keyof typeof guide.availability.schedule];
    
    const isAvailableToday = todaySchedule?.available && !guide.availability.bookedDates.some(booking => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);
      return currentDate >= bookingStart && currentDate <= bookingEnd;
    });

    return NextResponse.json({
      guide: {
        ...guide,
        realTimeStatus: {
          availableToday: isAvailableToday,
          nextAvailableSlot: getNextAvailableSlot(guide),
          responseTime: `Usually responds within ${guide.performance.responseTime} hours`
        }
      }
    });
  } catch (error) {
    console.error('Error fetching guide details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guide details' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: guideId } = await params;
    const body = await request.json();
    
    if (!guideId) {
      return NextResponse.json(
        { error: 'Guide ID is required' },
        { status: 400 }
      );
    }

    const guideIndex = guides.findIndex(g => g.id === guideId);
    
    if (guideIndex === -1) {
      return NextResponse.json(
        { error: 'Tour guide not found' },
        { status: 404 }
      );
    }

    // Update guide information
    guides[guideIndex] = {
      ...guides[guideIndex],
      ...body,
      id: guideId // Ensure ID doesn't change
    };

    return NextResponse.json({
      message: 'Tour guide updated successfully',
      guide: guides[guideIndex]
    });
  } catch (error) {
    console.error('Error updating guide:', error);
    return NextResponse.json(
      { error: 'Failed to update guide' },
      { status: 500 }
    );
  }
}

function getNextAvailableSlot(guide: any): string {
  const currentDate = new Date();
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(currentDate);
    checkDate.setDate(currentDate.getDate() + i);
    
    const dayName = daysOfWeek[checkDate.getDay()];
    const daySchedule = guide.availability.schedule[dayName];
    
    if (daySchedule?.available) {
      const isBooked = guide.availability.bookedDates.some((booking: any) => {
        const bookingStart = new Date(booking.start);
        return checkDate.toDateString() === bookingStart.toDateString();
      });
      
      if (!isBooked) {
        return checkDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    }
  }
  
  return 'No availability in the next 7 days';
}