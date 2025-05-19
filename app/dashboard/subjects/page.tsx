import React from 'react'
import { Card, CardDescription } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { StoryTable } from './StoryTable'
import { Story } from './columns'
import Link from 'next/link'

async function getStories(): Promise<Story[]> {
  const response = await fetch("https://fourir-website-newsfeed-api.onrender.com/api/news", {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stories: ${response.status}`);
  }

  const data = await response.json();
  
  // Handle different possible response formats
  if (Array.isArray(data)) {
    return data;
  } else if (data.data && Array.isArray(data.data)) {
    return data.data;
  } else if (data.stories && Array.isArray(data.stories)) {
    return data.stories;
  } else {
    throw new Error('Invalid response format from server');
  }
}

export default async function StoryPage() {
  try {
    const stories = await getStories();

    return (
      <div className='flex flex-col p-3 w-full'>
        <Card className='w-full p-5 mb-2'>
          <CardDescription className='flex flex-row items-center justify-between'>
            <div>
              <h2 className='text-2xl font-semibold'>
                List of All Stories
              </h2>
              <p className='text-[12px] font-thin'>
                List of all stories added by admin
              </p>
            </div>

            <Link
              href={'/dashboard/subjects/create'}
              className={buttonVariants()}
            >
              <CirclePlus className='size-4'/>
              Add Story
            </Link>
          </CardDescription>
        </Card>

        <Card className='w-full p-5'>
          {stories && stories.length > 0 ? (
            <StoryTable stories={stories} />
          ) : (
            <p className="text-center text-muted-foreground">No stories available</p>
          )}
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error fetching stories:', error);
    return (
      <div className='flex flex-col p-3 w-full'>
        <Card className='w-full p-5'>
          <p className="text-center text-red-500">
            Error loading stories. Please try again later.
          </p>
        </Card>
      </div>
    );
  }
}
