import { NextRequest, NextResponse } from 'next/server';

// Mock function to get booking by ID - in production this would query the database
const getBookingById = (id: string) => {
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
        verificationStatus: true,
        blockNumber: 15487623,
        gasUsed: '0.002 ETH',
        timestamp: '2025-09-20T14:30:00Z'
      },
      communication: {
        messages: [
          {
            id: 'msg-001',
            from: 'guide',
            fromName: 'Rajesh Kumar',
            message: 'Looking forward to showing you around Golconda Fort! I recommend wearing comfortable shoes.',
            timestamp: '2025-09-20T15:30:00Z',
            read: true
          },
          {
            id: 'msg-002',
            from: 'user',
            fromName: 'Tourist',
            message: 'Great! We are very excited. Any specific photography spots you recommend?',
            timestamp: '2025-09-20T16:45:00Z',
            read: true
          }
        ],
        lastContact: '2025-09-20T16:45:00Z'
      },
      location: {
        meetingPoint: 'Golconda Fort Main Entrance',
        latitude: 17.3833,
        longitude: 78.4011,
        address: 'Golconda, Hyderabad, Telangana 500008',
        directions: 'Take Metro to MGBS, then auto/cab to Golconda Fort',
        landmarks: ['Near Qutb Shahi Tombs', 'Behind Ibrahim Bagh']
      },
      itinerary: [
        {
          time: '10:00 AM',
          activity: 'Meet at Main Entrance',
          duration: '15 min',
          description: 'Brief introduction and safety instructions'
        },
        {
          time: '10:15 AM',
          activity: 'Explore Lower Fort',
          duration: '45 min',
          description: 'Visit the palace ruins and royal chambers'
        },
        {
          time: '11:00 AM',
          activity: 'Climb to Top Fort',
          duration: '60 min',
          description: 'Panoramic views and photography session'
        },
        {
          time: '12:00 PM',
          activity: 'Acoustic Demonstration',
          duration: '30 min',
          description: 'Famous hand-clapping echo experience'
        },
        {
          time: '12:30 PM',
          activity: 'Historical Stories',
          duration: '45 min',
          description: 'Tales of diamond trade and royal legacy'
        },
        {
          time: '1:15 PM',
          activity: 'Wrap-up & Photos',
          duration: '15 min',
          description: 'Final questions and group photos'
        }
      ],
      cancellation: {
        policy: '24 hours advance notice required',
        refundPercentage: 100,
        deadline: '2025-09-24T10:00:00Z'
      },
      emergency: {
        guidePhone: '+91-9876543210',
        emergencyContact: '+91-9123456789',
        nearestHospital: 'Gandhi Hospital - 5km away'
      }
    }
  ];
  
  return bookings.find(booking => booking.id === id);
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params;
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = getBookingById(bookingId);
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Calculate additional info
    const now = new Date();
    const bookingDate = new Date(booking.dateTime);
    const isUpcoming = bookingDate > now;
    const timeUntil = isUpcoming ? bookingDate.getTime() - now.getTime() : 0;
    
    const enhancedBooking = {
      ...booking,
      computed: {
        isUpcoming,
        isPast: bookingDate < now,
        isToday: bookingDate.toDateString() === now.toDateString(),
        timeUntil: {
          days: Math.floor(timeUntil / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60))
        },
        duration: {
          hours: Math.floor(booking.duration / 60),
          minutes: booking.duration % 60
        },
        endTime: new Date(bookingDate.getTime() + booking.duration * 60000).toISOString()
      },
      actions: {
        canCancel: isUpcoming && booking.status !== 'cancelled',
        canReschedule: isUpcoming && booking.status === 'confirmed',
        canMessage: booking.status === 'confirmed',
        canReview: booking.status === 'completed',
        canPayment: booking.pricing.paymentStatus === 'unpaid'
      }
    };

    return NextResponse.json(enhancedBooking);
  } catch (error) {
    console.error('Error fetching booking details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking details' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params;
    const body = await request.json();
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = getBookingById(bookingId);
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Handle different update types
    const { action, ...updateData } = body;

    switch (action) {
      case 'cancel':
        if (booking.status === 'cancelled') {
          return NextResponse.json(
            { error: 'Booking is already cancelled' },
            { status: 400 }
          );
        }
        // Update status and handle refunds
        return NextResponse.json({
          message: 'Booking cancelled successfully',
          refund: {
            amount: booking.pricing.totalPrice,
            currency: booking.pricing.currency,
            processTime: '3-5 business days'
          }
        });

      case 'reschedule':
        if (!updateData.newDateTime) {
          return NextResponse.json(
            { error: 'New date/time is required for rescheduling' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          message: 'Reschedule request sent',
          newDateTime: updateData.newDateTime,
          status: 'pending_reschedule'
        });

      case 'add_message':
        if (!updateData.message) {
          return NextResponse.json(
            { error: 'Message content is required' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          message: 'Message sent successfully',
          messageId: `msg-${Date.now()}`
        });

      case 'update_details':
        return NextResponse.json({
          message: 'Booking details updated successfully',
          updatedFields: Object.keys(updateData)
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params;
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = getBookingById(bookingId);
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if booking can be deleted
    if (booking.status === 'confirmed' || booking.status === 'completed') {
      return NextResponse.json(
        { error: 'Cannot delete confirmed or completed bookings. Please cancel instead.' },
        { status: 400 }
      );
    }

    // In production, this would delete from database
    return NextResponse.json({
      message: 'Booking deleted successfully',
      deletedBookingId: bookingId
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}