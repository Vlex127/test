"use client";
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [teachingCourses, setTeachingCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Course data fetching
  const fetchCourses = useCallback(async (uid: string) => {
    // Mock course data
    setTeachingCourses([
      {
        id: 'py101',
        title: 'Python Fundamentals',
        enrolled: 45,
        progress: 82,
        lastUpdated: new Date().toISOString()
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
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }
      await user.getIdToken(true);
      setUser(user);
      fetchCourses(user.uid);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, fetchCourses]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (err) {
      setError('Failed to logout. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-16 w-16 bg-gray-800 rounded-full mx-auto"></div>
          <div className="h-4 bg-gray-800 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/code-icon.svg"
              alt="CodeMaster Logo"
              width={40}
              height={40}
              className="hover:rotate-12 transition-transform"
            />
            <span className="text-2xl font-bold text-blue-400">CodeMaster</span>
          </Link>
          
          <div className="flex items-center gap-6 relative">
            <div 
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              ref={dropdownRef}
            >
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-transparent hover:border-blue-400 transition-colors"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-gray-300 font-semibold">
                  {user?.displayName || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 ${
                      pathname === '/dashboard' ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    <Image src="/dashboard-icon.png" alt="" width={16} height={16} />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 ${
                      pathname.startsWith('/dashboard/profile') ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    <Image src="/profile-icon.png" alt="" width={16} height={16} />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 ${
                      pathname.startsWith('/dashboard/settings') ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    <Image src="/settings-icon.png" alt="" width={16} height={16} />
                    Settings
                  </Link>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>


         

        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Management Sidebar */}
          <aside className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Course Navigation</h3>
              <nav className="space-y-2">
                <Link 
                  href="/dashboard/my-courses"
                  className={`block p-2 rounded-lg ${pathname === '/dashboard/my-courses' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  🎓 My Courses
                </Link>
                <Link
                  href="/dashboard/enrollments"
                  className={`block p-2 rounded-lg ${pathname === '/dashboard/enrollments' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  📚 Enrollments
                </Link>
                <Link
                  href="/dashboard/progress"
                  className={`block p-2 rounded-lg ${pathname === '/dashboard/progress' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  📈 Learning Progress
                </Link>
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-8">
            {/* Course Content Area */}
            {pathname === '/dashboard/my-courses' && (
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-6">Teaching Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teachingCourses.map(course => (
                      <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-medium">{course.title}</h3>
                          <span className="text-sm text-gray-400">
                            {course.enrolled} students
                          </span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-500 rounded-full h-2"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>{course.progress}% Complete</span>
                          <span>Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {pathname === '/dashboard/enrollments' && (
              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>
                <div className="space-y-4">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{course.title}</h3>
                        <span className="text-sm text-gray-400">{course.instructor}</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-green-500 rounded-full h-2"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{course.progress}% Completed</span>
                        <span>Next deadline: {course.nextDeadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pathname === '/dashboard/progress' && (
              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Learning Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">{course.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-600 rounded-full h-3">
                          <div
                            className="bg-purple-500 rounded-full h-3"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{course.progress}%</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        Recent Activity: Last studied 2 days ago
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/80 text-white rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-4 p-1 hover:bg-red-400/20 rounded-full"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}