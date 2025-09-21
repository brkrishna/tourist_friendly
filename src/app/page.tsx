import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Utensils, Users, Shield, MessageCircle, Star } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: MapPin,
      title: 'Discover Attractions',
      description: 'Explore historical sites, cultural landmarks, and hidden gems in Hyderabad',
      href: '/attractions'
    },
    {
      icon: Utensils,
      title: 'Local Cuisine',
      description: 'Find the best restaurants and authentic Hyderabadi dishes',
      href: '/restaurants'
    },
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Get personalized recommendations and travel planning help',
      href: '/assistant'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Welcome to Tourist Friendly
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your comprehensive guide to exploring Hyderabad with AI-powered recommendations, 
          safety features, and authentic local experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/attractions">
            <Button size="lg">Explore Attractions</Button>
          </Link>
          <Link href="/assistant">
            <Button variant="outline" size="lg">Plan with AI</Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Everything You Need for Your Hyderabad Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  {feature.description}
                </CardDescription>
                <Link href={feature.href}>
                  <Button className="w-full" variant="outline">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-12 bg-muted/50 rounded-lg">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Travel with Confidence</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced safety features including geo-fencing, emergency contacts, 
            and real-time location sharing to keep you secure while exploring.
          </p>
        </div>
        <div className="text-center">
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Curated Attractions</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-muted-foreground">Local Restaurants</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">4.8</div>
            <div className="text-muted-foreground flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              Average Rating
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}