'use client';

import { useState, useEffect } from 'react';
import { MapPin, Filter, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LocationCoordinates, calculateDistance, formatDistance } from '@/lib/google-maps';
import { Attraction } from '@/types/attraction';

export interface LocationFilterProps {
  userLocation?: LocationCoordinates;
  items: Attraction[];
  onFilteredItemsChange: (items: Attraction[]) => void;
  className?: string;
}

interface FilterState {
  maxDistance: number; // in kilometers
  category: string;
  priceRange: string;
  sortBy: 'distance' | 'rating' | 'price' | 'name';
}

export default function LocationFilter({
  userLocation,
  items,
  onFilteredItemsChange,
  className = ''
}: LocationFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    maxDistance: 25, // 25km default
    category: 'all',
    priceRange: 'all',
    sortBy: 'distance'
  });

  const [isOpen, setIsOpen] = useState(false);
  const [filteredCount, setFilteredCount] = useState(items.length);

  // Get unique categories from items
  const categories = Array.from(new Set(items.map(item => item.category)));
  
  // Get price ranges
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'budget', label: 'Budget (₹0-500)' },
    { value: 'moderate', label: 'Moderate (₹500-2000)' },
    { value: 'premium', label: 'Premium (₹2000+)' }
  ];

  // Filter and sort items
  useEffect(() => {
    let filtered = [...items];

    // Filter by distance if user location is available
    if (userLocation && filters.maxDistance > 0) {
      filtered = filtered.filter(item => {
        if (!item.location) return true; // Include items without location
        
        const distance = calculateDistance(userLocation, item.location);
        return distance <= filters.maxDistance;
      });
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(item => {
        const price = item.pricing.entryFee;
        
        switch (filters.priceRange) {
          case 'free':
            return price === 0;
          case 'budget':
            return price >= 0 && price <= 500;
          case 'moderate':
            return price > 500 && price <= 2000;
          case 'premium':
            return price > 2000;
          default:
            return true;
        }
      });
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'distance':
          if (!userLocation || !a.location || !b.location) return 0;
          const distanceA = calculateDistance(userLocation, a.location);
          const distanceB = calculateDistance(userLocation, b.location);
          return distanceA - distanceB;
          
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
          
        case 'price':
          return (a.pricing.entryFee || 0) - (b.pricing.entryFee || 0);
          
        case 'name':
          return a.name.localeCompare(b.name);
          
        default:
          return 0;
      }
    });

    setFilteredCount(filtered.length);
    onFilteredItemsChange(filtered);
  }, [items, filters, userLocation, onFilteredItemsChange]);

  // Handle filter changes
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      maxDistance: 25,
      category: 'all',
      priceRange: 'all',
      sortBy: 'distance'
    });
  };

  // Get active filter count
  const activeFiltersCount = [
    filters.category !== 'all',
    filters.priceRange !== 'all',
    userLocation && filters.maxDistance < 25
  ].filter(Boolean).length;

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        
        <div className="text-sm text-gray-600">
          {filteredCount} of {items.length} places
        </div>
        
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Clear all
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Distance Filter */}
            {userLocation && (
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Maximum Distance: {filters.maxDistance}km
                </label>
                <Slider
                  value={[filters.maxDistance]}
                  onValueChange={(value: number[]) => updateFilter('maxDistance', value[0])}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1km</span>
                  <span>50km</span>
                </div>
              </div>
            )}

            <Separator />

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-3 block">Category</label>
              <Select
                value={filters.category}
                onValueChange={(value) => updateFilter('category', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Price Range Filter */}
            <div>
              <label className="text-sm font-medium mb-3 block">Price Range</label>
              <Select
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Sort By */}
            <div>
              <label className="text-sm font-medium mb-3 block">Sort By</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => updateFilter('sortBy', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.category}
              <button
                onClick={() => updateFilter('category', 'all')}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          )}
          
          {filters.priceRange !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {priceRanges.find(r => r.value === filters.priceRange)?.label}
              <button
                onClick={() => updateFilter('priceRange', 'all')}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          )}
          
          {userLocation && filters.maxDistance < 25 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Within {filters.maxDistance}km
              <button
                onClick={() => updateFilter('maxDistance', 25)}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}