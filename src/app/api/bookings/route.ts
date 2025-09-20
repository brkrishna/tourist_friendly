import { NextRequest, NextResponse } from 'next/server';

// Mock bookings data - in production this would come from a database
const bookings = [
  {
    id: 'booking-001',
    userId: 'user-001',
    type: 'guide',
    entityId: 'guide-001',
    entityName: 'Rajesh Kumar - Heritage Tour',
    dateTime: '2025-09-25T10:00:00Z',
    duration: 240, // 4 hours in minutes
    groupSize: 4,
    status: 'confirmed',
    pricing: {
      basePrice: 6000,
      totalPrice: 6000,
      currency: 'INR',
      paymentStatus: 'paid'
    },
    details: {
      specialRequests: 'Photography focus, early morning preferred',
      accessibilityNeeds: [],
      dietaryRequirements: []
    },
    blockchain: {
      transactionHash: 'tx-abc123def456',
      verificationStatus: true
    },
    communication: {
      messages: [
        {
          from: 'guide',
          message: 'Looking forward to showing you around Golconda Fort!',
          timestamp: '2025-09-20T15:30:00Z'
        }
      ],
      lastContact: '2025-09-20T15:30:00Z'
    },
    location: {
      meetingPoint: 'Golconda Fort Main Entrance',
      latitude: 17.3833,
      longitude: 78.4011,
      address: 'Golconda, Hyderabad, Telangana 500008'
    }
  },
  {
    id: 'booking-002',
    userId: 'user-001',
    type: 'restaurant',
    entityId: 'rest-001',
    entityName: 'Paradise Biryani - Dinner',
    dateTime: '2025-09-23T19:30:00Z',
    duration: 120, // 2 hours
    groupSize: 2,
    status: 'confirmed',
    pricing: {
      basePrice: 1600,
      totalPrice: 1600,
      currency: 'INR',
      paymentStatus: 'paid'
    },
    details: {
      specialRequests: 'Window seating preferred',
      accessibilityNeeds: [],
      dietaryRequirements: ['vegetarian options']
    },
    blockchain: {
      transactionHash: '',
      verificationStatus: false
    },
    communication: {
      messages: [
        {
          from: 'restaurant',
          message: 'Your table for 2 is confirmed for 7:30 PM',
          timestamp: '2025-09-20T12:15:00Z'
        }
      ],
      lastContact: '2025-09-20T12:15:00Z'
    },
    location: {
      meetingPoint: 'Paradise Biryani Restaurant',
      latitude: 17.3850,
      longitude: 78.4867,
      address: 'Secunderabad, Hyderabad, Telangana 500003'
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const upcoming = searchParams.get('upcoming');

    let filteredBookings = [...bookings];

    // Filter by user ID
    if (userId) {
      filteredBookings = filteredBookings.filter(booking => booking.userId === userId);
    }

    // Filter by status
    if (status && status !== 'all') {
      filteredBookings = filteredBookings.filter(booking => booking.status === status);
    }

    // Filter by type
    if (type && type !== 'all') {
      filteredBookings = filteredBookings.filter(booking => booking.type === type);
    }

    // Filter upcoming bookings
    if (upcoming === 'true') {
      const now = new Date();
      filteredBookings = filteredBookings.filter(booking => 
        new Date(booking.dateTime) > now
      );
    }

    // Sort by date (upcoming first)
    filteredBookings.sort((a, b) => 
      new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

    return NextResponse.json({
      bookings: filteredBookings,
      total: filteredBookings.length,
      summary: {
        confirmed: filteredBookings.filter(b => b.status === 'confirmed').length,
        pending: filteredBookings.filter(b => b.status === 'pending').length,
        completed: filteredBookings.filter(b => b.status === 'completed').length,
        cancelled: filteredBookings.filter(b => b.status === 'cancelled').length
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { userId, type, entityId, dateTime, groupSize } = body;
    
    if (!userId || !type || !entityId || !dateTime || !groupSize) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, type, entityId, dateTime, groupSize' },
        { status: 400 }
      );
    }

    // Validate booking type
    if (!['guide', 'restaurant', 'experience', 'transport'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid booking type. Must be: guide, restaurant, experience, or transport' },
        { status: 400 }
      );
    }

    // Check for conflicts (basic validation)
    const requestedDate = new Date(dateTime);
    if (requestedDate <= new Date()) {
      return NextResponse.json(
        { error: 'Booking date must be in the future' },
        { status: 400 }
      );
    }

    // Generate new booking ID
    const newId = `booking-${Date.now()}`;
    
    const newBooking = {
      id: newId,
      userId,
      type,
      entityId,
      entityName: body.entityName || `${type} booking`,
      dateTime,
      duration: body.duration || 120, // default 2 hours
      groupSize,
      status: 'pending',
      pricing: {
        basePrice: body.basePrice || 0,
        totalPrice: body.totalPrice || body.basePrice || 0,
        currency: body.currency || 'INR',
        paymentStatus: 'unpaid'
      },
      details: {
        specialRequests: body.specialRequests || '',
        accessibilityNeeds: body.accessibilityNeeds || [],
        dietaryRequirements: body.dietaryRequirements || []
      },
      blockchain: {
        transactionHash: '',
        verificationStatus: false
      },
      communication: {
        messages: [],
        lastContact: new Date().toISOString()
      },
      location: body.location || null
    };

    // In a real app, save to database and send notifications
    bookings.push(newBooking);

    return NextResponse.json({
      message: 'Booking created successfully',
      booking: newBooking,
      nextSteps: [
        'Payment confirmation required',
        'Confirmation email will be sent',
        type === 'guide' ? 'Guide will be notified' : `${type} will be notified`
      ]
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status, paymentStatus } = body;
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Update booking status
    if (status) {
      bookings[bookingIndex].status = status;
    }

    // Update payment status
    if (paymentStatus) {
      bookings[bookingIndex].pricing.paymentStatus = paymentStatus;
    }

    // Add blockchain verification for guide bookings
    if (status === 'confirmed' && bookings[bookingIndex].type === 'guide') {
      bookings[bookingIndex].blockchain = {
        transactionHash: `tx-${Date.now()}`,
        verificationStatus: true
      };
    }

    return NextResponse.json({
      message: 'Booking updated successfully',
      booking: bookings[bookingIndex]
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}