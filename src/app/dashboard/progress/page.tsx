"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { BookOpen, Trophy, Clock, CheckCircle, Activity, Star } from 'lucide-react';

export default function ProgressPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  
  // Mock progress data
  const [progressData] = useState({
    stats: {
      totalCourses: 12,
      inProgress: 4,
      completed: 8,
      averageScore: 86
    },
    courses: [
      {
        id: 'js-adv',
        title: 'Advanced JavaScript',
        progress: 65,
        category: 'Programming',
        startDate: '2024-03-01',
        deadline: '2024-06-15',
        completed: false
      },
      {
        id: 'react-2024',
        title: 'React Masterclass',
        progress: 100,
        category: 'Frontend',
        completed: true
      }
    ],
    recentActivity: [
      { type: 'completed', course: 'React Basics', date: '2024-03-20' },
      { type: 'started', course: 'Node.js Fundamentals', date: '2024-03-18' },
      { type: 'achievement', text: 'Perfect Score in HTML5', date: '2024-03-15' }
    ]
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/login');
      else setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

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
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="text-yellow-400" size={28} />
            Learning Progress
          </h1>
          <button 
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => location.reload()}
          >
            <Activity size={18} /> Refresh Data
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* Progress Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <BookOpen className="text-blue-400" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Total Courses</p>
                <p className="text-2xl font-bold">{progressData.stats.totalCourses}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <Clock className="text-yellow-400" size={24} />
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold">{progressData.stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <CheckCircle className="text-green-400" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold">{progressData.stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <Star className="text-purple-400" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Avg. Score</p>
                <p className="text-2xl font-bold">{progressData.stats.averageScore}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Progress Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex gap-4 mb-6 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-2 px-4 ${
                activeTab === 'active' 
                  ? 'border-b-2 border-blue-500 text-blue-400' 
                  : 'hover:text-gray-300'
              }`}
            >
              Active Courses
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-2 px-4 ${
                activeTab === 'completed'
                  ? 'border-b-2 border-green-500 text-green-400'
                  : 'hover:text-gray-300'
              }`}
            >
              Completed Courses
            </button>
          </div>

          <div className="space-y-4">
            {progressData.courses
              .filter(course => 
                activeTab === 'active' ? !course.completed : course.completed
              )
              .map(course => (
                <div key={course.id} className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <span className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {course.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 rounded-full h-2"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {course.progress}%
                    </span>
                  </div>

                  {course.startDate && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <Clock size={14} />
                      {course.deadline ? (
                        <span>{course.startDate} - {course.deadline}</span>
                      ) : (
                        <span>Started on {course.startDate}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            
            {progressData.courses.filter(c => 
              activeTab === 'active' ? !c.completed : c.completed
            ).length === 0 && (
              <div className="text-center py-6 text-gray-400">
                No {activeTab === 'active' ? 'active' : 'completed'} courses found
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="text-purple-400" size={24} />
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {progressData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                  {activity.type === 'completed' ? (
                    <CheckCircle className="text-green-400" size={16} />
                  ) : activity.type === 'started' ? (
                    <BookOpen className="text-blue-400" size={16} />
                  ) : (
                    <Trophy className="text-yellow-400" size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {activity.type === 'completed' ? `Completed ${activity.course}` : 
                     activity.type === 'started' ? `Started ${activity.course}` : 
                     activity.text}
                  </p>
                  <p className="text-sm text-gray-400">{activity.date}</p>
                </div>
              </div>
            ))}
            
            {progressData.recentActivity.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                No recent activity found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}