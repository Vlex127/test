"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, CheckCircle, AlertCircle, BookOpen } from 'react-feather';

export default function EnrollmentsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('current');
  const [enrollments, setEnrollments] = useState([]);

  // Mock enrollment statuses
  const statusConfig = {
    enrolled: { color: 'bg-green-500', icon: <CheckCircle size={16} /> },
    pending: { color: 'bg-yellow-500', icon: <Clock size={16} /> },
    completed: { color: 'bg-blue-500', icon: <BookOpen size={16} /> },
    cancelled: { color: 'bg-red-500', icon: <AlertCircle size={16} /> }
  };

  const fetchEnrollments = useCallback(async (uid: string) => {
    try {
      // Mock API response
      setEnrollments([
        {
          id: 'js-adv',
          title: 'Advanced JavaScript',
          instructor: 'Dr. CodeMaster',
          progress: 65,
          status: 'enrolled',
          startDate: '2024-03-01',
          endDate: '2024-06-01',
          deadline: '2024-04-15'
        },
        {
          id: 'react-2024',
          title: 'React Masterclass',
          instructor: 'React Expert',
          progress: 100,
          status: 'completed',
          startDate: '2024-01-01',
          endDate: '2024-03-01'
        },
        {
          id: 'node-101',
          title: 'Node.js Fundamentals',
          instructor: 'Backend Specialist',
          progress: 0,
          status: 'pending',
          startDate: '2024-04-01'
        }
      ]);
    } catch (err) {
      setError('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      await fetchEnrollments(user.uid);
    });
    return () => unsubscribe();
  }, [router, fetchEnrollments]);

  const getStatusBadge = (status) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusConfig[status].color} bg-opacity-20 text-${statusConfig[status].color.replace('bg-', '')}`}>
      {statusConfig[status].icon}
      <span className="ml-2 capitalize">{status}</span>
    </span>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Course Enrollments</h1>
          <button
            onClick={() => router.push('/dashboard/courses')}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <span>+</span> Browse Courses
          </button>
        </div>

        <div className="flex gap-4 mb-6 border-b border-gray-700">
          {['current', 'completed', 'pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 ${
                activeTab === tab 
                  ? 'border-b-2 border-green-500 text-green-400' 
                  : 'hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Enrollments
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrollments
            .filter(e => 
              activeTab === 'current' ? e.status === 'enrolled' :
              activeTab === 'completed' ? e.status === 'completed' :
              e.status === 'pending'
            )
            .map(enrollment => (
              <div key={enrollment.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{enrollment.title}</h3>
                  {getStatusBadge(enrollment.status)}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-sm">Instructor:</span>
                    <span className="font-medium">{enrollment.instructor}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {enrollment.startDate} - {enrollment.endDate || 'Present'}
                  </span>
                </div>

                {enrollment.status === 'enrolled' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Progress</span>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 rounded-full h-2"
                        style={{ width: `${enrollment.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {(enrollment.deadline || enrollment.status === 'pending') && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="text-yellow-500" size={16} />
                      <span className={enrollment.status === 'pending' ? 'text-yellow-500' : 'text-gray-400'}>
                        {enrollment.status === 'pending' 
                          ? 'Awaiting approval' 
                          : `Next deadline: ${enrollment.deadline}`}
                      </span>
                    </div>
                    {enrollment.status === 'enrolled' && (
                      <Link
                        href={`/dashboard/courses/${enrollment.id}`}
                        className="text-green-400 hover:text-green-300 text-sm flex items-center gap-2"
                      >
                        Continue Learning
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>

        {enrollments.filter(e => 
          activeTab === 'current' ? e.status === 'enrolled' :
          activeTab === 'completed' ? e.status === 'completed' :
          e.status === 'pending'
        ).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
              {activeTab === 'current' ? 'No active enrollments' :
               activeTab === 'completed' ? 'No completed courses' : 
               'No pending enrollments'}
            </p>
            <button
              onClick={() => router.push('/dashboard/courses')}
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg"
            >
              Browse Available Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}