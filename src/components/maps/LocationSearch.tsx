'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { loadGoogleMaps, LocationCoordinates, MapLocation, getCurrentLocation } from '@/lib/google-maps';

export interface LocationSearchProps {
  onLocationSelect: (location: MapLocation) => void;
  placeholder?: string;
  className?: string;
  showCurrentLocationButton?: boolean;
}

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export default function LocationSearch({
  onLocationSelect,
  placeholder = 'Search for a location...',
  className = '',
  showCurrentLocationButton = true
}: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const autocompleteService = useRef<any>(null);
  const placesService = useRef<any>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize Google Places services
  useEffect(() => {
    const initServices = async () => {
      try {
        const google = await loadGoogleMaps();
        
        autocompleteService.current = new google.maps.places.AutocompleteService();
        
        // Create a dummy map for PlacesService (required by Google Maps API)
        const dummyMap = new google.maps.Map(document.createElement('div'));
        placesService.current = new google.maps.places.PlacesService(dummyMap);
      } catch (error) {
        console.error('Failed to initialize Places services:', error);
      }
    };

    initServices();
  }, []);

  // Debounced search function
  const searchPlaces = async (searchQuery: string) => {
    if (!autocompleteService.current || !searchQuery.trim()) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    
    try {
      const request = {
        input: searchQuery,
        componentRestrictions: { country: 'in' }, // Restrict to India
        location: new (window as any).google.maps.LatLng(17.3616, 78.4747), // Hyderabad center
        radius: 50000, // 50km radius
        types: ['establishment', 'geocode'] // Include both places and addresses
      };

      autocompleteService.current.getPlacePredictions(
        request,
        (predictions: PlacePrediction[] | null, status: any) => {
          setIsLoading(false);
          
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && predictions) {
            setPredictions(predictions.slice(0, 5)); // Limit to 5 suggestions
            setShowSuggestions(true);
          } else {
            setPredictions([]);
          }
        }
      );
    } catch (error) {
      console.error('Error searching places:', error);
      setIsLoading(false);
      setPredictions([]);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (value: string) => {
    setQuery(value);
    
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer
    debounceTimer.current = setTimeout(() => {
      searchPlaces(value);
    }, 300);
  };

  // Handle place selection
  const handlePlaceSelect = async (prediction: PlacePrediction) => {
    if (!placesService.current) return;

    setQuery(prediction.description);
    setShowSuggestions(false);
    setPredictions([]);
    setIsLoading(true);

    try {
      const request = {
        placeId: prediction.place_id,
        fields: ['name', 'formatted_address', 'geometry']
      };

      placesService.current.getDetails(request, (place: any, status: any) => {
        setIsLoading(false);
        
        if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && place) {
          const location: MapLocation = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            name: place.name,
            address: place.formatted_address
          };
          
          onLocationSelect(location);
        }
      });
    } catch (error) {
      console.error('Error getting place details:', error);
      setIsLoading(false);
    }
  };

  // Handle current location
  const handleCurrentLocation = async () => {
    setIsLoading(true);
    
    try {
      const coords = await getCurrentLocation();
      const location: MapLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        name: 'Current Location',
        address: 'Your current location'
      };
      
      onLocationSelect(location);
      setQuery('Current Location');
    } catch (error) {
      console.error('Error getting current location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (predictions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle input blur (with delay to allow clicks on suggestions)
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="pl-10 pr-4"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && predictions.length > 0 && (
            <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto">
              <CardContent className="p-0">
                {predictions.map((prediction) => (
                  <button
                    key={prediction.place_id}
                    onClick={() => handlePlaceSelect(prediction)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 flex items-start gap-3"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">
                        {prediction.structured_formatting.main_text}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {prediction.structured_formatting.secondary_text}
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {showCurrentLocationButton && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleCurrentLocation}
            disabled={isLoading}
            title="Use current location"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}