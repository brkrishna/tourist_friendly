import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, MessageCircle, Heart, Star, Clock } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Sarah!
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your Hyderabad adventure
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Places Visited</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-600">Days Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Saved Places</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Itinerary */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Itinerary</CardTitle>
              <CardDescription>September 20, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Charminar Visit</h4>
                    <p className="text-sm text-gray-600">9:00 AM - 11:00 AM</p>
                    <p className="text-sm mt-1">Explore the iconic monument and surrounding markets</p>
                  </div>
                  <Button variant="outline" size="sm">Details</Button>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Lunch at Shah Ghouse</h4>
                    <p className="text-sm text-gray-600">12:30 PM - 1:30 PM</p>
                    <p className="text-sm mt-1">Authentic Hyderabadi biryani experience</p>
                  </div>
                  <Button variant="outline" size="sm">Navigate</Button>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Golconda Fort Tour</h4>
                    <p className="text-sm text-gray-600">3:00 PM - 6:00 PM</p>
                    <p className="text-sm mt-1">Guided tour with historical insights</p>
                  </div>
                  <Button variant="outline" size="sm">Upcoming</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & AI Assistant */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with AI Assistant
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Find Nearby Restaurants
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Modify Itinerary
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                View Saved Places
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Rated Charminar ⭐⭐⭐⭐⭐</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Saved Hussain Sagar Lake</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span>Asked AI about vegetarian food</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span>Checked in at Laad Bazaar</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weather & Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Weather</span>
                  <span className="text-sm font-medium">28°C, Sunny</span>
                </div>
                <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                  ✅ Perfect weather for outdoor activities
                </div>
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  💡 Low crowd levels at Golconda Fort today
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}