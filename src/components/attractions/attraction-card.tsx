import { Attraction } from '@/types/attraction'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Star, Users } from 'lucide-react'
import Link from 'next/link'

interface AttractionCardProps {
  attraction: Attraction
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <Card className="overflow-hidden">
      {attraction.images.length > 0 && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={attraction.images[0].url}
            alt={attraction.images[0].alt}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              // Fallback for missing images
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgOTBMMTIwIDYwSDE2MFYzMEwyMDAgNjBIMTYwVjkwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'
            }}
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{attraction.name}</CardTitle>
            <CardDescription className="mt-1">
              {attraction.location.neighborhood}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{attraction.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({attraction.reviewCount})
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {attraction.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {attraction.location.address}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {attraction.schedule.openingTime} - {attraction.schedule.closingTime}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className={`h-4 w-4 ${getCrowdLevelColor(attraction.realTimeData.crowdLevel)}`} />
            <span className={getCrowdLevelColor(attraction.realTimeData.crowdLevel)}>
              {attraction.realTimeData.crowdLevel} crowd
            </span>
            {attraction.realTimeData.waitTime > 0 && (
              <span className="text-muted-foreground">
                • {attraction.realTimeData.waitTime}min wait
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">₹{attraction.pricing.entryFee}</span>
            {attraction.pricing.freeForChildren && (
              <span className="text-muted-foreground ml-1">(Free for children)</span>
            )}
          </div>
          
          <Link href={`/attractions/${attraction.id}`}>
            <Button size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}