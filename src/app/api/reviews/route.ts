import { NextRequest, NextResponse } from 'next/server';

// Mock reviews data - in production this would come from a database
const reviews = [
  {
    id: 'review-001',
    entityType: 'guide',
    entityId: 'guide-001',
    entityName: 'Rajesh Kumar',
    userId: 'user-001',
    userName: 'Sarah Johnson',
    userAvatar: '/avatars/user-001.jpg',
    rating: 5,
    title: 'Exceptional heritage tour experience!',
    content: 'Rajesh was incredibly knowledgeable about Golconda Fort history. His storytelling brought the ancient walls to life. The photography spots he showed us were amazing, and his insights into the diamond trade era were fascinating. Highly recommend for anyone interested in Hyderabad\'s rich heritage.',
    images: [
      '/reviews/review-001-img1.jpg',
      '/reviews/review-001-img2.jpg'
    ],
    date: '2025-09-18T14:30:00Z',
    verified: true,
    helpful: 12,
    responses: [
      {
        id: 'response-001',
        from: 'guide',
        fromName: 'Rajesh Kumar',
        content: 'Thank you so much Sarah! It was wonderful sharing our heritage with your family. Hope to see you again soon!',
        date: '2025-09-18T18:45:00Z'
      }
    ],
    bookingId: 'booking-completed-001',
    tags: ['knowledgeable', 'friendly', 'photography', 'heritage', 'storytelling']
  },
  {
    id: 'review-002',
    entityType: 'restaurant',
    entityId: 'rest-001',
    entityName: 'Paradise Biryani',
    userId: 'user-002',
    userName: 'Mike Chen',
    userAvatar: '/avatars/user-002.jpg',
    rating: 4,
    title: 'Authentic Hyderabadi flavors',
    content: 'The biryani was absolutely delicious - perfectly spiced and the meat was tender. Service was quick despite the crowd. The ambiance is casual but the food quality makes up for it. Must try the mutton biryani!',
    images: [
      '/reviews/review-002-img1.jpg'
    ],
    date: '2025-09-17T20:15:00Z',
    verified: true,
    helpful: 8,
    responses: [],
    bookingId: 'booking-completed-002',
    tags: ['authentic', 'biryani', 'spicy', 'quick-service', 'crowded']
  },
  {
    id: 'review-003',
    entityType: 'guide',
    entityId: 'guide-002',
    entityName: 'Priya Sharma',
    userId: 'user-003',
    userName: 'David Wilson',
    userAvatar: '/avatars/user-003.jpg',
    rating: 5,
    title: 'Perfect cultural immersion',
    content: 'Priya provided an incredible cultural tour of Old City. Her explanations of local customs, architecture, and hidden gems were enlightening. She was patient with our questions and made sure we experienced authentic local life. The handicraft workshop visit was a highlight!',
    images: [],
    date: '2025-09-16T16:00:00Z',
    verified: true,
    helpful: 15,
    responses: [
      {
        id: 'response-003',
        from: 'guide',
        fromName: 'Priya Sharma',
        content: 'Thank you David! It was my pleasure showing you around our beautiful Old City. I\'m glad you enjoyed the handicraft experience!',
        date: '2025-09-16T19:30:00Z'
      }
    ],
    bookingId: 'booking-completed-003',
    tags: ['cultural', 'authentic', 'patient', 'knowledgeable', 'local-experience']
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');
    const userId = searchParams.get('userId');
    const rating = searchParams.get('rating');
    const verified = searchParams.get('verified');
    const sortBy = searchParams.get('sortBy') || 'date';
    const order = searchParams.get('order') || 'desc';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredReviews = [...reviews];

    // Apply filters
    if (entityType) {
      filteredReviews = filteredReviews.filter(review => review.entityType === entityType);
    }

    if (entityId) {
      filteredReviews = filteredReviews.filter(review => review.entityId === entityId);
    }

    if (userId) {
      filteredReviews = filteredReviews.filter(review => review.userId === userId);
    }

    if (rating) {
      const ratingNum = parseInt(rating);
      filteredReviews = filteredReviews.filter(review => review.rating === ratingNum);
    }

    if (verified === 'true') {
      filteredReviews = filteredReviews.filter(review => review.verified === true);
    }

    // Sort reviews
    filteredReviews.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'helpful':
          aValue = a.helpful;
          bValue = b.helpful;
          break;
        case 'date':
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
      }

      if (order === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    // Calculate statistics
    const stats = {
      total: filteredReviews.length,
      averageRating: filteredReviews.length > 0 ? 
        filteredReviews.reduce((sum, review) => sum + review.rating, 0) / filteredReviews.length : 0,
      ratingDistribution: {
        5: filteredReviews.filter(r => r.rating === 5).length,
        4: filteredReviews.filter(r => r.rating === 4).length,
        3: filteredReviews.filter(r => r.rating === 3).length,
        2: filteredReviews.filter(r => r.rating === 2).length,
        1: filteredReviews.filter(r => r.rating === 1).length
      },
      verifiedCount: filteredReviews.filter(r => r.verified).length
    };

    // Apply pagination
    const paginatedReviews = filteredReviews.slice(offset, offset + limit);

    return NextResponse.json({
      reviews: paginatedReviews,
      pagination: {
        total: filteredReviews.length,
        limit,
        offset,
        hasMore: offset + limit < filteredReviews.length
      },
      stats
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { entityType, entityId, userId, rating, content } = body;
    
    if (!entityType || !entityId || !userId || !rating || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: entityType, entityId, userId, rating, content' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate entity type
    if (!['guide', 'restaurant', 'experience', 'transport'].includes(entityType)) {
      return NextResponse.json(
        { error: 'Invalid entity type. Must be: guide, restaurant, experience, or transport' },
        { status: 400 }
      );
    }

    // Check if user has already reviewed this entity
    const existingReview = reviews.find(r => 
      r.entityType === entityType && 
      r.entityId === entityId && 
      r.userId === userId
    );

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this entity. Please update your existing review instead.' },
        { status: 400 }
      );
    }

    // Generate new review ID
    const newId = `review-${Date.now()}`;
    
    const newReview = {
      id: newId,
      entityType,
      entityId,
      entityName: body.entityName || 'Unknown',
      userId,
      userName: body.userName || 'Anonymous',
      userAvatar: body.userAvatar || '/avatars/default.jpg',
      rating,
      title: body.title || '',
      content,
      images: body.images || [],
      date: new Date().toISOString(),
      verified: body.bookingId ? true : false, // Verified if linked to a booking
      helpful: 0,
      responses: [],
      bookingId: body.bookingId || null,
      tags: body.tags || []
    };

    // In a real app, save to database and send notifications
    reviews.push(newReview);

    return NextResponse.json({
      message: 'Review created successfully',
      review: newReview,
      moderation: {
        status: 'approved',
        note: 'Review has been automatically approved'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, action, ...updateData } = body;
    
    if (!reviewId) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const reviewIndex = reviews.findIndex(r => r.id === reviewId);
    
    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    switch (action) {
      case 'mark_helpful':
        reviews[reviewIndex].helpful += 1;
        return NextResponse.json({
          message: 'Review marked as helpful',
          newHelpfulCount: reviews[reviewIndex].helpful
        });

      case 'add_response':
        if (!updateData.content || !updateData.fromName) {
          return NextResponse.json(
            { error: 'Response content and fromName are required' },
            { status: 400 }
          );
        }
        const newResponse = {
          id: `response-${Date.now()}`,
          from: updateData.from || 'entity',
          fromName: updateData.fromName,
          content: updateData.content,
          date: new Date().toISOString()
        };
        reviews[reviewIndex].responses.push(newResponse);
        return NextResponse.json({
          message: 'Response added successfully',
          response: newResponse
        });

      case 'update_content':
        if (updateData.content) reviews[reviewIndex].content = updateData.content;
        if (updateData.title) reviews[reviewIndex].title = updateData.title;
        if (updateData.rating) reviews[reviewIndex].rating = updateData.rating;
        if (updateData.tags) reviews[reviewIndex].tags = updateData.tags;
        return NextResponse.json({
          message: 'Review updated successfully',
          review: reviews[reviewIndex]
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}