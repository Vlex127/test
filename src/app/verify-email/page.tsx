"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { sendEmailVerification, onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isResent, setIsResent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      if (user.emailVerified) {
        router.push('/dashboard');
        return;
      }

      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleResendEmail = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    try {
      await sendEmailVerification(user);
      setIsResent(true);
      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) clearInterval(timer);
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/code-icon.svg"
              alt="CodeMaster Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-blue-400">CodeMaster</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-blue-400 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 shadow-lg text-center">
          <Image
            src="/email-icon.svg"
            alt="Email"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
          
          <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
          
          <p className="text-gray-400 mb-6">
            We've sent a verification email to{' '}
            <span className="text-blue-400">{user?.email}</span>.
            Please check your inbox and click the link to activate your account.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {isResent && !error && (
            <p className="text-green-500 mb-4">
              Verification email resent successfully!
            </p>
          )}

          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={loading || countdown > 0}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : countdown > 0 ? 
                `Resend in ${countdown}s` : 
                'Resend Verification Email'}
            </button>

            <p className="text-gray-400 text-sm">
              Didn't receive the email? Check your spam folder or{' '}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300">
                try another email address
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-gray-400">
          {/* Footer content */}
        </div>
      </footer>
    </div>
  );
}