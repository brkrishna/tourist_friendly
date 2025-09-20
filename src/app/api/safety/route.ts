import { NextRequest, NextResponse } from 'next/server';

// Mock safety zones data - in production this would come from a database
const safetyZones = [
  {
    id: 'safety-001',
    name: 'Banjara Hills Safe Zone',
    type: 'residential',
    status: 'safe',
    riskLevel: 'low',
    coordinates: {
      center: { latitude: 17.4126, longitude: 78.4484 },
      radius: 2000, // meters
      polygon: [
        { latitude: 17.4200, longitude: 78.4400 },
        { latitude: 17.4200, longitude: 78.4550 },
        { latitude: 17.4050, longitude: 78.4550 },
        { latitude: 17.4050, longitude: 78.4400 }
      ]
    },
    lastUpdated: '2025-09-20T12:00:00Z',
    safetyScore: 95,
    features: {
      policeStations: [
        {
          name: 'Banjara Hills Police Station',
          distance: 500,
          phone: '+91-40-2339-5555',
          latitude: 17.4150,
          longitude: 78.4450
        }
      ],
      hospitals: [
        {
          name: 'Apollo Hospital',
          distance: 800,
          phone: '+91-40-2342-2222',
          latitude: 17.4200,
          longitude: 78.4500,
          type: 'multi-specialty'
        }
      ],
      emergencyServices: [
        {
          name: 'Tourist Helpline',
          phone: '+91-40-2345-6789',
          type: 'tourist_support'
        }
      ],
      publicTransport: {
        metroStations: ['Jubilee Hills Checkpost', 'Peddamma Gudi'],
        busStops: 15,
        autoAvailability: 'high'
      },
      lighting: 'excellent',
      cctv: 'high-coverage',
      crowdDensity: 'moderate'
    },
    alerts: [],
    recommendations: [
      'Well-lit area suitable for evening walks',
      'Multiple transport options available',
      'Tourist-friendly with English signage'
    ]
  },
  {
    id: 'safety-002',
    name: 'Old City Heritage Zone',
    type: 'heritage',
    status: 'caution',
    riskLevel: 'medium',
    coordinates: {
      center: { latitude: 17.3616, longitude: 78.4747 },
      radius: 1500,
      polygon: [
        { latitude: 17.3700, longitude: 78.4650 },
        { latitude: 17.3700, longitude: 78.4850 },
        { latitude: 17.3500, longitude: 78.4850 },
        { latitude: 17.3500, longitude: 78.4650 }
      ]
    },
    lastUpdated: '2025-09-20T10:30:00Z',
    safetyScore: 72,
    features: {
      policeStations: [
        {
          name: 'Charminar Police Station',
          distance: 300,
          phone: '+91-40-2452-4242',
          latitude: 17.3616,
          longitude: 78.4747
        }
      ],
      hospitals: [
        {
          name: 'Osmania General Hospital',
          distance: 1200,
          phone: '+91-40-2670-1111',
          latitude: 17.3700,
          longitude: 78.4800,
          type: 'government'
        }
      ],
      emergencyServices: [
        {
          name: 'Heritage Site Security',
          phone: '+91-40-2451-2345',
          type: 'site_security'
        }
      ],
      publicTransport: {
        metroStations: ['Charminar'],
        busStops: 8,
        autoAvailability: 'moderate'
      },
      lighting: 'moderate',
      cctv: 'moderate-coverage',
      crowdDensity: 'high'
    },
    alerts: [
      {
        id: 'alert-001',
        type: 'crowding',
        severity: 'medium',
        message: 'High tourist crowd expected during weekend evenings',
        validUntil: '2025-09-22T18:00:00Z'
      },
      {
        id: 'alert-002',
        type: 'traffic',
        severity: 'low',
        message: 'Construction work near Laad Bazaar entrance',
        validUntil: '2025-09-25T17:00:00Z'
      }
    ],
    recommendations: [
      'Visit during daylight hours for better safety',
      'Stay in groups, especially in crowded market areas',
      'Keep valuables secure in busy bazaars',
      'Use official guides for heritage site tours'
    ]
  },
  {
    id: 'safety-003',
    name: 'HITEC City Business Zone',
    type: 'business',
    status: 'safe',
    riskLevel: 'low',
    coordinates: {
      center: { latitude: 17.4435, longitude: 78.3772 },
      radius: 3000,
      polygon: [
        { latitude: 17.4600, longitude: 78.3600 },
        { latitude: 17.4600, longitude: 78.3950 },
        { latitude: 17.4270, longitude: 78.3950 },
        { latitude: 17.4270, longitude: 78.3600 }
      ]
    },
    lastUpdated: '2025-09-20T14:15:00Z',
    safetyScore: 92,
    features: {
      policeStations: [
        {
          name: 'HITEC City Police Station',
          distance: 1000,
          phone: '+91-40-2311-4444',
          latitude: 17.4450,
          longitude: 78.3800
        }
      ],
      hospitals: [
        {
          name: 'Continental Hospitals',
          distance: 2000,
          phone: '+91-40-6777-6777',
          latitude: 17.4300,
          longitude: 78.3900,
          type: 'private'
        }
      ],
      emergencyServices: [
        {
          name: 'Corporate Security',
          phone: '+91-40-2311-9999',
          type: 'private_security'
        }
      ],
      publicTransport: {
        metroStations: ['HITEC City', 'Durgam Cheruvu'],
        busStops: 12,
        autoAvailability: 'high'
      },
      lighting: 'excellent',
      cctv: 'comprehensive-coverage',
      crowdDensity: 'low'
    },
    alerts: [],
    recommendations: [
      'Modern area with excellent infrastructure',
      'Safe for solo travelers and late hours',
      'Good connectivity to airport and city center'
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latitude = parseFloat(searchParams.get('latitude') || '0');
    const longitude = parseFloat(searchParams.get('longitude') || '0');
    const radius = parseFloat(searchParams.get('radius') || '5000'); // 5km default
    const riskLevel = searchParams.get('riskLevel');
    const type = searchParams.get('type');
    const includeAlerts = searchParams.get('includeAlerts') === 'true';

    let filteredZones = [...safetyZones];

    // Filter by location if provided
    if (latitude && longitude) {
      filteredZones = filteredZones.filter(zone => {
        const distance = calculateDistance(
          latitude, longitude,
          zone.coordinates.center.latitude,
          zone.coordinates.center.longitude
        );
        return distance <= radius;
      });
    }

    // Filter by risk level
    if (riskLevel && riskLevel !== 'all') {
      filteredZones = filteredZones.filter(zone => zone.riskLevel === riskLevel);
    }

    // Filter by type
    if (type && type !== 'all') {
      filteredZones = filteredZones.filter(zone => zone.type === type);
    }

    // Filter out expired alerts if not explicitly requested
    if (!includeAlerts) {
      filteredZones = filteredZones.map(zone => ({
        ...zone,
        alerts: zone.alerts.filter(alert => 
          new Date(alert.validUntil) > new Date()
        )
      }));
    }

    // Calculate summary statistics
    const summary = {
      totalZones: filteredZones.length,
      safeZones: filteredZones.filter(z => z.status === 'safe').length,
      cautionZones: filteredZones.filter(z => z.status === 'caution').length,
      warningZones: filteredZones.filter(z => z.status === 'warning').length,
      activeAlerts: filteredZones.reduce((sum, zone) => sum + zone.alerts.length, 0),
      averageSafetyScore: filteredZones.length > 0 ? 
        filteredZones.reduce((sum, zone) => sum + zone.safetyScore, 0) / filteredZones.length : 0
    };

    return NextResponse.json({
      zones: filteredZones,
      summary,
      searchParams: {
        center: latitude && longitude ? { latitude, longitude } : null,
        radius,
        filters: { riskLevel, type }
      }
    });
  } catch (error) {
    console.error('Error fetching safety zones:', error);
    return NextResponse.json(
      { error: 'Failed to fetch safety zones' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields for reporting safety concerns
    const { type, latitude, longitude, description } = body;
    
    if (!type || !latitude || !longitude || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: type, latitude, longitude, description' },
        { status: 400 }
      );
    }

    // Validate report type
    const validTypes = ['incident', 'infrastructure', 'crowding', 'traffic', 'lighting', 'other'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid report type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Create new safety report
    const reportId = `report-${Date.now()}`;
    
    const safetyReport = {
      id: reportId,
      type,
      location: { latitude, longitude },
      description,
      severity: body.severity || 'medium',
      reportedBy: body.userId || 'anonymous',
      timestamp: new Date().toISOString(),
      status: 'pending',
      images: body.images || [],
      contact: body.contact || null
    };

    // In a real app, this would:
    // 1. Save to database
    // 2. Notify authorities
    // 3. Update nearby safety zones
    // 4. Send confirmation to user

    return NextResponse.json({
      message: 'Safety report submitted successfully',
      report: safetyReport,
      response: {
        referenceNumber: reportId,
        estimatedResponseTime: '2-4 hours',
        emergencyContact: '+91-100',
        status: 'Report received and will be reviewed by local authorities'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating safety report:', error);
    return NextResponse.json(
      { error: 'Failed to create safety report' },
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