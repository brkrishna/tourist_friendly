import { NextRequest, NextResponse } from 'next/server';

// Mock tour guide data - in production this would come from a database
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
    }
  },
  {
    id: 'guide-002',
    name: 'Priya Sharma',
    profileImage: '/images/guides/priya-sharma.jpg',
    bio: 'Passionate food and culture enthusiast specializing in culinary tours and local market experiences. Expert in Hyderabadi cuisine and street food culture.',
    specializations: ['Food Tours', 'Culinary Experiences', 'Market Tours', 'Local Culture'],
    languages: [
      { language: 'English', proficiency: 'Fluent' },
      { language: 'Hindi', proficiency: 'Native' },
      { language: 'Telugu', proficiency: 'Fluent' }
    ],
    location: {
      latitude: 17.4065,
      longitude: 78.4772,
      address: 'Banjara Hills, Hyderabad, Telangana',
      neighborhood: 'Banjara Hills'
    },
    blockchainVerification: {
      verified: true,
      verificationDate: '2024-07-20T14:15:00Z',
      certificateHash: 'xyz789uvw456rst123',
      trustScore: 92,
      backgroundCheckStatus: 'approved'
    },
    certifications: {
      tourismLicense: {
        number: 'TG-TOUR-2024-002',
        issuedBy: 'Telangana Tourism Board',
        validUntil: '2025-11-30',
        verified: true
      },
      firstAidCertified: true,
      accessibilityTraining: false,
      businessExperience: false
    },
    availability: {
      schedule: {
        monday: { available: false, hours: '' },
        tuesday: { available: true, hours: '10:00-19:00' },
        wednesday: { available: true, hours: '10:00-19:00' },
        thursday: { available: true, hours: '10:00-19:00' },
        friday: { available: true, hours: '10:00-19:00' },
        saturday: { available: true, hours: '09:00-20:00' },
        sunday: { available: true, hours: '09:00-20:00' }
      },
      bookedDates: [
        { start: '2025-09-23T10:00:00Z', end: '2025-09-23T16:00:00Z' }
      ],
      hourlyRate: 1200,
      currency: 'INR'
    },
    performance: {
      rating: 4.6,
      reviewCount: 178,
      completedTours: 289,
      responseTime: 3 // hours
    },
    preferences: {
      maxGroupSize: 6,
      tourTypes: ['Food Tours', 'Walking Tours', 'Market Tours'],
      ageGroups: ['Adults', 'Young Adults', 'Families']
    }
  },
  {
    id: 'guide-003',
    name: 'Mohammed Asif',
    profileImage: '/images/guides/mohammed-asif.jpg',
    bio: 'Heritage specialist with deep knowledge of Islamic architecture and Nizami culture. Fluent in multiple languages and passionate about sharing Hyderabad\'s rich history.',
    specializations: ['Islamic Architecture', 'Nizami Heritage', 'Religious Sites', 'History'],
    languages: [
      { language: 'English', proficiency: 'Fluent' },
      { language: 'Hindi', proficiency: 'Native' },
      { language: 'Urdu', proficiency: 'Native' },
      { language: 'Arabic', proficiency: 'Intermediate' }
    ],
    location: {
      latitude: 17.3753,
      longitude: 78.4815,
      address: 'Golconda, Hyderabad, Telangana',
      neighborhood: 'Golconda'
    },
    blockchainVerification: {
      verified: true,
      verificationDate: '2024-09-01T11:45:00Z',
      certificateHash: 'def456ghi789jkl012',
      trustScore: 97,
      backgroundCheckStatus: 'approved'
    },
    certifications: {
      tourismLicense: {
        number: 'TG-TOUR-2024-003',
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
        monday: { available: true, hours: '08:00-17:00' },
        tuesday: { available: true, hours: '08:00-17:00' },
        wednesday: { available: true, hours: '08:00-17:00' },
        thursday: { available: true, hours: '08:00-17:00' },
        friday: { available: false, hours: '' }, // Friday prayers
        saturday: { available: true, hours: '08:00-18:00' },
        sunday: { available: true, hours: '08:00-18:00' }
      },
      bookedDates: [
        { start: '2025-09-21T08:00:00Z', end: '2025-09-21T16:00:00Z' },
        { start: '2025-09-24T09:00:00Z', end: '2025-09-24T14:00:00Z' }
      ],
      hourlyRate: 1800,
      currency: 'INR'
    },
    performance: {
      rating: 4.9,
      reviewCount: 312,
      completedTours: 567,
      responseTime: 1 // hours
    },
    preferences: {
      maxGroupSize: 10,
      tourTypes: ['Heritage Tours', 'Religious Tours', 'Photography Tours'],
      ageGroups: ['Adults', 'Seniors', 'Families', 'Students']
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');
    const language = searchParams.get('language');
    const availability = searchParams.get('availability');
    const maxRate = searchParams.get('maxRate');
    const minRating = searchParams.get('minRating');
    const search = searchParams.get('search');

    let filteredGuides = [...guides];

    // Filter by specialization
    if (specialization && specialization !== 'all') {
      filteredGuides = filteredGuides.filter(guide =>
        guide.specializations.some(spec => 
          spec.toLowerCase().includes(specialization.toLowerCase())
        )
      );
    }

    // Filter by language
    if (language && language !== 'all') {
      filteredGuides = filteredGuides.filter(guide =>
        guide.languages.some(lang => 
          lang.language.toLowerCase() === language.toLowerCase()
        )
      );
    }

    // Filter by availability (today/tomorrow/this week)
    if (availability === 'today' || availability === 'tomorrow') {
      const today = new Date();
      const targetDate = availability === 'today' ? today : new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      
      filteredGuides = filteredGuides.filter(guide => {
        const daySchedule = guide.availability.schedule[dayName as keyof typeof guide.availability.schedule];
        return daySchedule?.available;
      });
    }

    // Filter by maximum hourly rate
    if (maxRate) {
      const maxRateNum = parseInt(maxRate);
      filteredGuides = filteredGuides.filter(guide =>
        guide.availability.hourlyRate <= maxRateNum
      );
    }

    // Filter by minimum rating
    if (minRating) {
      const minRatingNum = parseFloat(minRating);
      filteredGuides = filteredGuides.filter(guide =>
        guide.performance.rating >= minRatingNum
      );
    }

    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredGuides = filteredGuides.filter(guide =>
        guide.name.toLowerCase().includes(searchTerm) ||
        guide.bio.toLowerCase().includes(searchTerm) ||
        guide.specializations.some(spec => 
          spec.toLowerCase().includes(searchTerm)
        )
      );
    }

    // Sort by trust score and rating
    filteredGuides.sort((a, b) => {
      const scoreA = (a.blockchainVerification.trustScore + a.performance.rating * 10) / 2;
      const scoreB = (b.blockchainVerification.trustScore + b.performance.rating * 10) / 2;
      return scoreB - scoreA;
    });

    return NextResponse.json({
      guides: filteredGuides,
      total: filteredGuides.length,
      filters: {
        specializations: Array.from(new Set(guides.flatMap(g => g.specializations))),
        languages: Array.from(new Set(guides.flatMap(g => g.languages.map(l => l.language)))),
        rateRange: {
          min: Math.min(...guides.map(g => g.availability.hourlyRate)),
          max: Math.max(...guides.map(g => g.availability.hourlyRate))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tour guides' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, bio, specializations, languages, location } = body;
    
    if (!name || !bio || !specializations || !languages || !location) {
      return NextResponse.json(
        { error: 'Missing required fields: name, bio, specializations, languages, location' },
        { status: 400 }
      );
    }

    // Generate new guide ID
    const newId = `guide-${Date.now()}`;
    
    const newGuide = {
      id: newId,
      name,
      profileImage: body.profileImage || '/images/guides/default-avatar.jpg',
      bio,
      specializations,
      languages,
      location,
      blockchainVerification: {
        verified: false,
        verificationDate: '',
        certificateHash: '',
        trustScore: 0,
        backgroundCheckStatus: 'pending'
      },
      certifications: body.certifications || {
        tourismLicense: null,
        firstAidCertified: false,
        accessibilityTraining: false,
        businessExperience: false
      },
      availability: body.availability || {
        schedule: {
          monday: { available: true, hours: '09:00-17:00' },
          tuesday: { available: true, hours: '09:00-17:00' },
          wednesday: { available: true, hours: '09:00-17:00' },
          thursday: { available: true, hours: '09:00-17:00' },
          friday: { available: true, hours: '09:00-17:00' },
          saturday: { available: true, hours: '09:00-17:00' },
          sunday: { available: true, hours: '09:00-17:00' }
        },
        bookedDates: [],
        hourlyRate: body.hourlyRate || 1000,
        currency: 'INR'
      },
      performance: {
        rating: 0,
        reviewCount: 0,
        completedTours: 0,
        responseTime: 24
      },
      preferences: body.preferences || {
        maxGroupSize: 6,
        tourTypes: ['Walking Tours'],
        ageGroups: ['Adults']
      }
    };

    // In a real app, save to database
    guides.push(newGuide);

    return NextResponse.json({
      message: 'Tour guide profile created successfully',
      guide: newGuide
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating guide:', error);
    return NextResponse.json(
      { error: 'Failed to create tour guide profile' },
      { status: 500 }
    );
  }
}