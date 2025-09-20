'use client';

import { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps, LocationCoordinates, MapLocation, DEFAULT_LOCATION, HYDERABAD_BOUNDS } from '@/lib/google-maps';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export interface GoogleMapProps {
  center?: LocationCoordinates;
  zoom?: number;
  markers?: MapLocation[];
  onLocationSelect?: (location: MapLocation) => void;
  onMapClick?: (location: LocationCoordinates) => void;
  showUserLocation?: boolean;
  className?: string;
  height?: string;
}

export default function GoogleMap({
  center = DEFAULT_LOCATION,
  zoom = 12,
  markers = [],
  onLocationSelect,
  onMapClick,
  showUserLocation = true,
  className = '',
  height = '400px'
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LocationCoordinates | null>(null);

  // Initialize Google Map
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const google = await loadGoogleMaps();
        
        if (!isMounted || !mapRef.current) return;

        // Create map instance
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: center.latitude, lng: center.longitude },
          zoom,
          restriction: {
            latLngBounds: HYDERABAD_BOUNDS,
            strictBounds: false
          },
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // Add click listener
        if (onMapClick) {
          map.addListener('click', (event: any) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            onMapClick({ latitude: lat, longitude: lng });
          });
        }

        // Get user location if enabled
        if (showUserLocation && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (!isMounted) return;
              
              const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              setUserLocation(coords);

              // Add user location marker
              new google.maps.Marker({
                position: { lat: coords.latitude, lng: coords.longitude },
                map,
                title: 'Your Location',
                icon: {
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" fill="#4285f4" stroke="#ffffff" stroke-width="2"/>
                      <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                    </svg>
                  `),
                  scaledSize: new google.maps.Size(24, 24)
                }
              });
            },
            (error) => {
              console.warn('Geolocation error:', error.message);
            }
          );
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load Google Maps:', err);
        if (isMounted) {
          setError('Failed to load map. Please check your internet connection.');
          setIsLoading(false);
        }
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [center.latitude, center.longitude, zoom, onMapClick, showUserLocation]);

  // Update markers when they change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData, index) => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: markerData.latitude, lng: markerData.longitude },
        map: mapInstanceRef.current,
        title: markerData.name || markerData.address || `Location ${index + 1}`,
        animation: (window as any).google.maps.Animation.DROP
      });

      // Add click listener for marker selection
      if (onLocationSelect) {
        marker.addListener('click', () => {
          onLocationSelect(markerData);
        });
      }

      // Add info window
      if (markerData.name || markerData.address) {
        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              ${markerData.name ? `<h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${markerData.name}</h3>` : ''}
              ${markerData.address ? `<p style="margin: 0; font-size: 12px; color: #666;">${markerData.address}</p>` : ''}
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });
      }

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers if there are any
    if (markers.length > 1) {
      const bounds = new (window as any).google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend({ lat: marker.latitude, lng: marker.longitude });
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  }, [markers, onLocationSelect]);

  if (error) {
    return (
      <div className={`${className}`} style={{ height }}>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${className}`} style={{ height }}>
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className={`w-full rounded-lg ${className}`} 
      style={{ height }}
    />
  );
}