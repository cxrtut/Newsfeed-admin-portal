import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button' 

const Hero = () => {
  return (
    <section className='relative flex flex-col items-center justify-center py-12 lg:py-20'>
        <div className='text-center'>
            <span className='text-sm text-gray-500 font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full'>
                Welcome to 4IR LAB
            </span>
            <h1 className='mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter'>
                Admin Portal <span className='block -mt-2 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text'>News Feed!</span>
            </h1>
            <p className='max-w-xl mx-auto mt-4 text-md text-muted-foreground'>
                Stram of news stories, articles, and other information, typically provided by a website.
            </p>
            <div className='mt-10 mb-12'>
                <Link
                    href={'/login'}
                    className='mt-5'
                >
                    <Button>Get Admin Access</Button>
                </Link>
            </div>
        </div>

       
    </section>
  )
}

export default Hero