"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config'; // Update path to your Firebase config
import { 
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Send verification email
      await sendEmailVerification(userCredential.user);
      
      router.push('/verify-email');
    } catch (err: any) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError('');

    try {
      const authProvider = provider === 'google' 
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();

      await signInWithPopup(auth, authProvider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(getFirebaseError(err.code) || `${provider} signup failed`);
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseError = (code: string) => {
    switch(code) {
      case 'auth/email-already-in-use':
        return 'Email already registered';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      default:
        return 'Signup failed';
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
            <Link href="/login" className="hover:text-blue-400 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
          
          <form className="space-y-6" onSubmit={handleEmailSignUp}>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="John Doe"
                required
              />
            </div>

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
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300">
                Login here
              </Link>
            </div>
          </form>

          <div className="my-8 flex items-center before:flex-1 before:border-t before:border-gray-600 after:flex-1 after:border-t after:border-gray-600">
            <span className="px-4 text-gray-400">Or sign up with</span>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => handleOAuthSignUp('google')}
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
              onClick={() => handleOAuthSignUp('github')}
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