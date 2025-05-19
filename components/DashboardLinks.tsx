'use client'
import { cn } from '@/lib/utils'
import { Book, HomeIcon} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const dashboardLinks = [
    {
        id: 0,
        name: 'Dashboard',
        href: '/dashboard',
        icon: HomeIcon
    },
  
    {
        id: 2,
        name: 'News Feed',
        href: '/dashboard/subjects',
        icon: Book
    },
  
   
]

const DashboardLinks = () => {
    const pathname = usePathname()
  return (
    <>
        {dashboardLinks.map((link) => (
            <Link href={link.href} key={link.id} className={cn(
                pathname === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground',
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:text-primary"
            )}>
                <link.icon className='size-4' />
                {link.name}
            </Link>
        ))}
    </>
  )
}

export default DashboardLinks