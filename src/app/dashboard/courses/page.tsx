"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { Star, Clock, BookOpen, Trophy } from 'lucide-react';

export default function CoursesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock course data
  const [courses] = useState([
    {
      id: 'js-101',
      title: 'JavaScript Fundamentals',
      instructor: 'Dr. CodeMaster',
      duration: '6 weeks',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolled: 1500,
      category: 'Programming',
      image: '/courses/js-fundamentals.jpg',
      progress: 0,
      isEnrolled: false
    },
    {
      id: 'react-2024',
      title: 'React Masterclass 2024',
      instructor: 'React Expert',
      duration: '8 weeks',
      difficulty: 'Intermediate',
      rating: 4.7,
      enrolled: 980,
      category: 'Frontend',
      image: '/courses/react-masterclass.jpg',
      progress: 65,
      isEnrolled: true
    },
    {
      id: 'node-advanced',
      title: 'Advanced Node.js',
      instructor: 'Backend Specialist',
      duration: '10 weeks',
      difficulty: 'Advanced',
      rating: 4.9,
      enrolled: 650,
      category: 'Backend',
      image: '/courses/node-advanced.jpg',
      progress: 0,
      isEnrolled: false
    }
  ]);

  const categories = ['all', ...new Set(courses.map(course => course.category))];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/login');
      else setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  }, []);

  const filteredCourses = courses
    .filter(course => 
      (selectedCategory === 'all' || course.category.toLowerCase() === selectedCategory) &&
      (course.title.toLowerCase().includes(searchQuery) ||
      course.instructor.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'enrolled') return b.enrolled - a.enrolled;
      return a.title.localeCompare(b.title);
    });

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">
            <BookOpen className="inline mr-3 text-blue-400" size={28} />
            Browse Courses
          </h1>
          <button
            onClick={() => router.push('/dashboard/enrollments')}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Trophy size={18} />
            View My Enrollments
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* Controls Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-gray-700 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />
            
            <div className="flex gap-2 items-center">
              <span className="text-gray-400">Category:</span>
              <select 
                className="bg-gray-700 rounded-lg px-4 py-2 flex-1"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-gray-400">Sort by:</span>
              <select
                className="bg-gray-700 rounded-lg px-4 py-2 flex-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="rating">Rating</option>
                <option value="enrolled">Popularity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:shadow-xl">
              <div className="relative mb-4">
                <img 
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="absolute top-2 right-2 bg-blue-500/80 text-white px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
              </div>

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400" size={18} />
                  <span>{course.rating}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-gray-400 text-sm">
                  <p>By {course.instructor}</p>
                  <p>{course.duration}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  course.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  course.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {course.difficulty}
                </span>
              </div>

              {course.isEnrolled ? (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Your Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg mt-4 flex items-center justify-center gap-2">
                  <BookOpen size={16} />
                  Enroll Now
                </button>
              )}
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No courses found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}