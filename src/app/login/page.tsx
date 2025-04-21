"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) router.push('/dashboard');
    } catch (err: any) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError('');

    try {
      const authProvider = provider === 'google' 
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();

      await signInWithPopup(auth, authProvider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(getFirebaseError(err.code) || `${provider} login failed`);
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseError = (code: string) => {
    switch(code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'Account disabled';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later';
      default:
        return 'Login failed';
    }
  };

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
            <Link href="/signup" className="hover:text-blue-400 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back</h1>
          
          <form className="space-y-6" onSubmit={handleEmailLogin}>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up here
              </Link>
            </div>
          </form>

          <div className="my-8 flex items-center before:flex-1 before:border-t before:border-gray-600 after:flex-1 after:border-t after:border-gray-600">
            <span className="px-4 text-gray-400">Or continue with</span>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => handleOAuthLogin('google')}
              disabled={loading}
              className="p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Image
                src="/google-icon.svg"
                alt="Google"
                width={24}
                height={24}
              />
            </button>
            <button 
              onClick={() => handleOAuthLogin('github')}
              disabled={loading}
              className="p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Image
                src="/github-icon.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </button>
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