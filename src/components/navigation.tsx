'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Home, Utensils, Users, MessageCircle, User, Menu, LogIn, UserPlus, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Attractions', href: '/attractions', icon: MapPin },
  { name: 'Restaurants', href: '/restaurants', icon: Utensils },
  { name: 'Maps', href: '/maps', icon: Map },
  { name: 'Guides', href: '/guides', icon: Users },
  { name: 'AI Assistant', href: '/assistant', icon: MessageCircle },
  { name: 'Dashboard', href: '/dashboard', icon: User },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <MapPin className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Tourist Friendly
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Desktop auth buttons */}
        <div className="ml-auto hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </Link>
        </div>
        
        {/* Mobile navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6" />
            <span className="font-bold">Tourist Friendly</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                <UserPlus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}