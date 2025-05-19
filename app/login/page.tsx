'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear any previous error messages
    setErrorMessage('');

    try {
      const response = await fetch('https://fourir-website-newsfeed-api.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:username, password:password }),
      });

     

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid response from server - expected JSON');
      }

      if (data.token) {
        // Save the token in localStorage
        localStorage.setItem('token', data.token);

        
      } else {
        setErrorMessage(data.message || 'Login failed - Invalid credentials');
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        setErrorMessage(
          error.message === 'Failed to fetch' 
            ? 'Unable to connect to the server. Please check if the backend is running on port 5000.'
            : error.message
        );
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      // Redirect to dashboard after successful login
      redirect('/dashboard');
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="w-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your login details to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
            <div className="flex flex-col gap-y-2 mb-3">
              <Label>Username</Label>
              <Input
                name="username"
                type="text"
                required
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                required
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <form onSubmit={handleLogin}>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login;
