'use client'

import { useEffect, useState } from 'react'
import { AttractionCard } from '@/components/attractions/attraction-card'
import { Button } from '@/components/ui/button'
import { Attraction } from '@/types/attraction'

export default function AttractionsPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { value: 'all', label: 'All Attractions' },
    { value: 'historical', label: 'Historical' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'nature', label: 'Nature' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'religious', label: 'Religious' }
  ]

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true)
        const url = selectedCategory === 'all' 
          ? '/api/attractions' 
          : `/api/attractions?category=${selectedCategory}`
        
        const response = await fetch(url)
        const result = await response.json()
        
        if (result.success) {
          setAttractions(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch attractions:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAttractions()
  }, [selectedCategory])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore Hyderabad Attractions</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Discover the rich history, culture, and beauty of Hyderabad through our curated attractions.
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.value)}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted h-48 rounded-lg mb-4"></div>
              <div className="bg-muted h-4 rounded mb-2"></div>
              <div className="bg-muted h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      )}

      {!loading && attractions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No attractions found for the selected category.
          </p>
        </div>
      )}
    </div>
  )
}