import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

let loader: Loader | null = null;
let googleMapsPromise: Promise<any> | null = null;

export function getGoogleMapsLoader(): Loader {
  if (!loader) {
    loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places', 'geometry']
    });
  }
  return loader;
}

export async function loadGoogleMaps(): Promise<any> {
  if (!googleMapsPromise) {
    googleMapsPromise = getGoogleMapsLoader().load();
  }
  return googleMapsPromise;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface MapLocation extends LocationCoordinates {
  address?: string;
  name?: string;
}

// Default location: Hyderabad city center (near Charminar)
export const DEFAULT_LOCATION: LocationCoordinates = {
  latitude: 17.3616,
  longitude: 78.4747
};

// Hyderabad city bounds for map constraints
export const HYDERABAD_BOUNDS = {
  north: 17.6868,
  south: 17.2403,
  east: 78.6677,
  west: 78.2677
};

// Get user's current location with fallback
export async function getCurrentLocation(): Promise<LocationCoordinates> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported, using default location');
      resolve(DEFAULT_LOCATION);
      return;
    }

    const timeoutId = setTimeout(() => {
      console.warn('Geolocation timeout, using default location');
      resolve(DEFAULT_LOCATION);
    }, 10000); // 10 second timeout

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        
        // Check if coordinates are within reasonable bounds for Hyderabad area
        if (
          coords.latitude >= HYDERABAD_BOUNDS.south &&
          coords.latitude <= HYDERABAD_BOUNDS.north &&
          coords.longitude >= HYDERABAD_BOUNDS.west &&
          coords.longitude <= HYDERABAD_BOUNDS.east
        ) {
          resolve(coords);
        } else {
          console.warn('Location outside Hyderabad area, using default location');
          resolve(DEFAULT_LOCATION);
        }
      },
      (error) => {
        clearTimeout(timeoutId);
        console.warn('Geolocation error:', error.message, '- using default location');
        resolve(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Calculate distance between two coordinates (in kilometers)
export function calculateDistance(
  point1: LocationCoordinates,
  point2: LocationCoordinates
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (point2.latitude - point1.latitude) * (Math.PI / 180);
  const dLon = (point2.longitude - point1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.latitude * (Math.PI / 180)) *
    Math.cos(point2.latitude * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Format distance for display
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)}km`;
}

// Get directions URL for Google Maps
export function getDirectionsUrl(
  destination: LocationCoordinates,
  origin?: LocationCoordinates
): string {
  const destParam = `${destination.latitude},${destination.longitude}`;
  const originParam = origin ? `${origin.latitude},${origin.longitude}` : '';
  
  return `https://www.google.com/maps/dir/${originParam}/${destParam}`;
}