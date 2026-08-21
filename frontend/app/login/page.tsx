'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { ThemeSwitcher } from '@/components/layout/ThemeSwitcher';
import { Logo } from '@/components/ui/Logo';
import { ApiError } from '@/lib/api';

export default function LoginPage() {
  const { loginAsGuest } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGuestLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginAsGuest();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not start a guest session');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-bg px-4">
      <div className="absolute right-6 top-6">
        <ThemeSwitcher />
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-display text-base font-semibold text-ink">Pyramid</span>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-card">
          <div className="text-center">
            <h1 className="font-display text-2xl font-semibold text-ink">
              Let&apos;s get back on track
            </h1>
            <p className="mt-2 text-sm text-muted">
              Enter your email below to login to your account.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full rounded-full"
              onClick={handleGuestLogin}
              isLoading={isLoading}
            >
              Continue as Guest
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full rounded-full"
              type="button"
              disabled
              title="Not wired up for this assessment — guest login is the primary flow"
            >
              <GoogleIcon />
              Login with Google
            </Button>

            {error && <p className="text-center text-sm text-danger">{error}</p>}
          </div>
        </div>

        <p className="max-w-sm text-center text-xs text-muted">
          By clicking continue, you agree to our{' '}
          <Link href="#" className="underline hover:text-ink">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="underline hover:text-ink">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}
