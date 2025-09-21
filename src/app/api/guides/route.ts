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
      tourTypes: ['Food Tours', 'Walking Tours', 'Market Tours'],

    let filteredGuides = [...guides];

    // Filter by specialization
    if (specialization && specialization !== 'all') {
      filteredGuides = filteredGuides.filter(guide =>
        guide.specializations.some(spec => 

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