"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';

export default function MyCoursesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('teaching');
  const [teachingCourses, setTeachingCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: 'programming'
  });

  const fetchCourses = useCallback(async (uid: string) => {
    try {
      // Mock API calls
      setTeachingCourses([
        {
          id: 'py101',
          title: 'Python Fundamentals',
          enrolled: 45,
          progress: 82,
          lastUpdated: '2024-03-15',
          category: 'programming'
        }
      ]);
      
      setEnrolledCourses([
        {
          id: 'js-adv',
          title: 'Advanced JavaScript',
          instructor: 'Dr. CodeMaster',
          progress: 45,
          nextDeadline: '2024-04-01'
        }
      ]);
    } catch (err) {
      setError('Failed to load courses');
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
      await fetchCourses(user.uid);
    });
    return () => unsubscribe();
  }, [router, fetchCourses]);

  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;

    const course = {
      ...newCourse,
      id: Math.random().toString(36).substr(2, 9),
      enrolled: 0,
      progress: 0,
      lastUpdated: new Date().toISOString()
    };

    setTeachingCourses([...teachingCourses, course]);
    setNewCourse({ title: '', description: '', category: 'programming' });
  };

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
          <h1 className="text-3xl font-bold">Course Management</h1>
          <Link 
            href="/dashboard/my-courses/create"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <span>+</span> Create Course
          </Link>
        </div>

        <div className="flex gap-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('teaching')}
            className={`pb-2 px-4 ${
              activeTab === 'teaching' 
                ? 'border-b-2 border-blue-500 text-blue-400' 
                : 'hover:text-gray-300'
            }`}
          >
            Teaching Courses
          </button>
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`pb-2 px-4 ${
              activeTab === 'enrolled'
                ? 'border-b-2 border-green-500 text-green-400'
                : 'hover:text-gray-300'
            }`}
          >
            Enrolled Courses
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {activeTab === 'teaching' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachingCourses.map(course => (
              <div key={course.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {course.enrolled} students
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description || 'No description provided'}
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Last updated</span>
                  <span>{new Date(course.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    Enrolled
                  </span>
                  <span className="text-sm text-gray-400">
                    {course.instructor}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Your Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 rounded-full h-2"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>Next deadline</span>
                  <span>{new Date(course.nextDeadline).toLocaleDateString()}</span>
                </div>
                {/* Added Continue Button */}
                <div className="flex justify-end">
                  <Link
                    href={`/dashboard/courses/${course.id}`}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    Continue →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'teaching' && teachingCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No courses created yet</p>
            <Link
              href="/dashboard/my-courses/create"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg inline-flex items-center gap-2"
            >
              Create Your First Course
            </Link>
          </div>
        )}

        {activeTab === 'enrolled' && enrolledCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">Not enrolled in any courses yet</p>
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