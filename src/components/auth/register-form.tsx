'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface RegisterFormData {
  email: string;
  name: string;
  profileType: string;
  interests: string[];
  budget: { min: number; max: number; currency: string };
  groupSize: number;
  dietaryRestrictions: string[];
  spiceLevel: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
}

export function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    name: '',
    profileType: '',
    interests: [],
    budget: { min: 50, max: 200, currency: 'USD' },
    groupSize: 1,
    dietaryRestrictions: [],
    spiceLevel: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleDietaryChange = (restriction: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: checked 
        ? [...prev.dietaryRestrictions, restriction]
        : prev.dietaryRestrictions.filter(r => r !== restriction)
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Tourist Profile</CardTitle>
        <CardDescription>
          Tell us about yourself to get personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileType">What describes you best?</Label>
              <Select value={formData.profileType} onValueChange={(value: string) => setFormData(prev => ({ ...prev, profileType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-time">First-time visitor</SelectItem>
                  <SelectItem value="foodie">Food enthusiast</SelectItem>
                  <SelectItem value="business">Business traveler</SelectItem>
                  <SelectItem value="family">Family trip</SelectItem>
                  <SelectItem value="budget">Budget traveler</SelectItem>
                  <SelectItem value="accessibility">Accessibility needs</SelectItem>
                  <SelectItem value="tech-savvy">Tech-savvy explorer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What interests you?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['historical', 'cultural', 'entertainment', 'religious', 'nature', 'cuisine'].map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox 
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked: boolean) => handleInterestChange(interest, checked)}
                  />
                  <Label htmlFor={interest} className="capitalize">{interest}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Budget and Group */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Travel Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Budget Range (USD per day)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="0"
                    value={formData.budget.min}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ 
                      ...prev, 
                      budget: { ...prev.budget, min: parseInt(e.target.value) || 0 }
                    }))}
                    placeholder="Min"
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    min="0"
                    value={formData.budget.max}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ 
                      ...prev, 
                      budget: { ...prev.budget, max: parseInt(e.target.value) || 0 }
                    }))}
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <Input
                  id="groupSize"
                  type="number"
                  min="1"
                  value={formData.groupSize}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value) || 1 }))}
                />
              </div>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Food Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['vegetarian', 'vegan', 'gluten-free', 'halal', 'kosher', 'no-dairy'].map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox 
                    id={restriction}
                    checked={formData.dietaryRestrictions.includes(restriction)}
                    onCheckedChange={(checked: boolean) => handleDietaryChange(restriction, checked)}
                  />
                  <Label htmlFor={restriction} className="capitalize">{restriction.replace('-', ' ')}</Label>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="spiceLevel">Spice Level Preference</Label>
              <Select value={formData.spiceLevel} onValueChange={(value: string) => setFormData(prev => ({ ...prev, spiceLevel: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}