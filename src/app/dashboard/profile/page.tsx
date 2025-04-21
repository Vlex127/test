"use client";
import { useState, useEffect, useCallback } from 'react';
import { auth } from '@/lib/firebase/config';
import { updateProfile, updateEmail, User, sendEmailVerification } from 'firebase/auth';
import Image from 'next/image';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCooldown, setResendCooldown] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) return;
      setUser(user);
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    });
    return () => unsubscribe();
  }, []);

  const handleError = useCallback((error: any) => {
    const code = error.code || '';
    switch(code) {
      case 'auth/invalid-display-name':
        return 'Display name must be under 128 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/requires-recent-login':
        return 'Please re-authenticate to update email';
      default:
        return 'Failed to update profile';
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      await updateProfile(user, { displayName });
      setSuccess('Display name updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(handleError(err));
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleUpdateEmail = async () => {
    if (!user || !email) return;
    
    try {
      await updateEmail(user, email);
      setSuccess('Email updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(handleError(err));
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleResendVerification = async () => {
    if (!user || resendCooldown) return;
    
    try {
      await sendEmailVerification(user);
      setResendCooldown(true);
      setTimeout(() => setResendCooldown(false), 30000);
      setSuccess('Verification email sent');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to send verification email');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto text-gray-50"> {/* Brighter text */}
      <div className="bg-gray-800 p-8 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Profile Settings</h1> {/* Brighter title */}

        <div className="space-y-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative group cursor-pointer">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full border-2 border-gray-600 group-hover:border-blue-400 transition-colors"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold">
                  {user?.email?.[0]?.toUpperCase() || 'A'}
                </div>
              )}
               <div className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full border-2 border-gray-800 text-gray-200"> {/* Brighter edit icon */}
                ✎
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{displayName || 'Anonymous'}</h2>
              <p className="text-gray-400">{user?.email}</p>
              {user && !user.emailVerified && (
                <button
                  onClick={handleResendVerification}
                  disabled={resendCooldown}
                  className="text-sm mt-2 text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
                >
                  {resendCooldown ? 'Resend available in 30s' : 'Verify Email'}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onBlur={handleUpdateProfile}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleUpdateEmail}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 disabled:opacity-50"
                disabled={!user?.providerData.some(provider => provider.providerId === 'password')}
              />
            </div>
          </div>
        </div>
      </div>

      {(error || success) && (
        <div className={`p-4 rounded-lg ${
          error ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
        }`}>
          {error || success}
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Account Security</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Password</span>
            <button className="text-blue-400 hover:text-blue-300">
              Change Password
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span>Two-Factor Authentication</span>
            <button className="text-blue-400 hover:text-blue-300">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}