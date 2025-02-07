'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'An error occurred during authentication.';
  if (error === 'UnauthorizedDomain') {
    errorMessage = 'Unauthorized email domain. Please use a valid email address.';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
      <p className="mb-4">{errorMessage}</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Homepage
      </Link>
    </div>
  );
}