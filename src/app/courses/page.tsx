"use client";
import { useRouter } from 'next/navigation';
// Fixed import including Clock
import { BookOpen, Lock, Star, Users, Clock } from 'lucide-react';

export default function CoursesPage() {
  const router = useRouter();

  // Handler for all button clicks
  const handleActionClick = () => {
    router.push('/login');
  };

  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Web Development Basics",
      description: "Learn HTML, CSS, and JavaScript fundamentals",
      duration: "6 weeks",
      difficulty: "Beginner",
      rating: 4.8
    },
    {
      id: 2,
      title: "React Masterclass",
      description: "Advanced React patterns and best practices",
      duration: "8 weeks",
      difficulty: "Intermediate",
      rating: 4.7
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      description: "Build scalable server-side applications",
      duration: "10 weeks",
      difficulty: "Advanced",
      rating: 4.9
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-blue-400" size={32} />
            Available Courses
          </h1>
          <p className="text-gray-400 text-lg">
            Click any course to start learning (login required)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div 
              key={course.id}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all cursor-pointer"
              onClick={handleActionClick}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={18} />
                  {course.rating}
                </span>
              </div>
              
              <p className="text-gray-400 mb-4">{course.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="flex items-center gap-2 text-sm text-blue-400">
                  <Clock size={16} />
                  {course.duration}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  course.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  course.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {course.difficulty}
                </span>
              </div>

              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg flex items-center justify-center gap-2"
                onClick={handleActionClick}
              >
                <Lock size={16} />
                Enroll Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleActionClick}
            className="bg-gray-800 hover:bg-gray-750 px-8 py-3 rounded-xl flex items-center gap-2 mx-auto"
          >
            <Users size={20} />
            <span className="text-lg">View All Enrollments</span>
          </button>
        </div>
      </div>
    </div>
  );
}