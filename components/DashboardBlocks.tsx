'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Bot, User, Loader2 } from 'lucide-react';

const DashboardBlocks = () => {
    const [newsFeedCount, setNewsFeedCount] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getNewsFeedCount = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                console.log('Fetching news count...');
                const response = await fetch('https://fourir-website-newsfeed-api.onrender.com/api/news/count', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error('Error response:', errorData);
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Received data:', data);
                
                if (!data.success) {
                    throw new Error(data.message || 'Failed to fetch news count');
                }

                if (typeof data.count !== 'number') {
                    throw new Error('Invalid response format');
                }

                setNewsFeedCount(data.count);
            } catch (err) {
                console.error('Detailed error:', err);
                setError('Failed to fetch news feed count. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        getNewsFeedCount();
    }, []);

    return (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total News Feed</CardTitle>
                    <User className='size-4 text-muted-foreground'/>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Loading...</span>
                        </div>
                    ) : error ? (
                        <div className="text-red-500">
                            {error}
                        </div>
                    ) : (
                        <h2 className='text-2xl font-bold'>
                            {newsFeedCount}
                        </h2>
                    )}
                    <p className='text-xs text-muted-foreground'>
                        Added by admin
                    </p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>AI interactions</CardTitle>
                    <Bot className='size-4 text-muted-foreground'/>
                </CardHeader>
                <CardContent>
                    <h2 className='text-2xl font-bold'>
                        +19056
                    </h2>
                    <p className='text-xs text-muted-foreground'>
                        Total prompts made to the AI!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardBlocks;