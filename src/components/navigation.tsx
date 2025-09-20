'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Home, Utensils, Users, MessageCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Attractions', href: '/attractions', icon: MapPin },
  { name: 'Restaurants', href: '/restaurants', icon: Utensils },
  { name: 'Guides', href: '/guides', icon: Users },
  { name: 'AI Assistant', href: '/assistant', icon: MessageCircle },
  { name: 'Profile', href: '/profile', icon: User },
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
        
        {/* Mobile navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <MapPin className="h-6 w-6" />
              <span className="font-bold">Tourist Friendly</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}