"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, BookText, Clock, ChevronRight, GraduationCap, Download, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdvancedJSCourse() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('content');
  const [progress, setProgress] = useState(45);
  const [modules, setModules] = useState([
    {
      id: 'm1',
      title: 'Advanced Functions',
      completed: true,
      lessons: [
        { id: 'l1', title: 'Closures & Scope', duration: '25 min', completed: true },
        { id: 'l2', title: 'Currying & Composition', duration: '35 min', completed: true },
        { id: 'l3', title: 'Memoization Patterns', duration: '40 min', completed: false }
      ]
    },
    {
      id: 'm2',
      title: 'Modern Patterns',
      completed: false,
      lessons: [
        { id: 'l4', title: 'Module Systems', duration: '30 min', completed: false },
        { id: 'l5', title: 'Proxy & Reflection', duration: '45 min', completed: false },
        { id: 'l6', title: 'Iterators & Generators', duration: '50 min', completed: false }
      ]
    }
  ]);

  const courseData = {
    title: 'Advanced JavaScript',
    instructor: 'Dr. CodeMaster',
    category: 'Programming',
    startDate: '2024-03-01',
    deadline: '2024-04-01',
    description: 'Master advanced JavaScript concepts including functional programming patterns, modern ES+ features, and performance optimization techniques.',
    resources: [
      { name: 'Course Handbook', type: 'pdf', url: '#' },
      { name: 'Code Samples', type: 'zip', url: '#' }
    ]
  };

  const handleLessonStart = (lessonId: string) => {
    router.push(`/dashboard/courses/js-adv/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-6">
            ← Back to Courses
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Code className="text-blue-400" size={32} />
                {courseData.title}
              </h1>
              <p className="text-gray-400 mt-2">{courseData.description}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 min-w-72">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-blue-400">{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-2 px-4 ${
              activeTab === 'content' 
                ? 'border-b-2 border-blue-500 text-blue-400' 
                : 'hover:text-gray-300'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`pb-2 px-4 ${
              activeTab === 'resources'
                ? 'border-b-2 border-green-500 text-green-400'
                : 'hover:text-gray-300'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`pb-2 px-4 ${
              activeTab === 'discussions'
                ? 'border-b-2 border-purple-500 text-purple-400'
                : 'hover:text-gray-300'
            }`}
          >
            Discussions
          </button>
        </div>

        {/* Course Content */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Modules Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <BookText className="text-blue-400" size={24} />
                Course Modules
              </h2>
              <div className="space-y-4">
                {modules.map(module => (
                  <div key={module.id} className="bg-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">{module.title}</h3>
                      <span className={`text-sm ${
                        module.completed ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {module.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {module.lessons.map(lesson => (
                        <div 
                          key={lesson.id}
                          className="flex justify-between items-center bg-gray-700/50 hover:bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors"
                          onClick={() => handleLessonStart(lesson.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              lesson.completed ? 'bg-green-400' : 'bg-gray-500'
                            }`} />
                            <span>{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">{lesson.duration}</span>
                            <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                              {lesson.completed ? 'Review' : 'Start'}
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Overview */}
            <div className="bg-gray-800 rounded-xl p-6 h-fit">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <GraduationCap className="text-green-400" size={20} />
                Course Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Instructor</p>
                  <p className="font-medium">{courseData.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Start Date</p>
                  <p className="font-medium">
                    {new Date(courseData.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Next Deadline</p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="text-yellow-400" size={16} />
                    {new Date(courseData.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Download className="text-green-400" size={24} />
              Course Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseData.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center justify-between transition-colors"
                >
                  <span>{resource.name}</span>
                  <span className="text-gray-400 text-sm uppercase">
                    ({resource.type})
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className="text-purple-400" size={24} />
              Course Discussions
            </h2>
            <div className="text-center py-12 text-gray-400">
              Discussion forum coming soon
            </div>
          </div>
        )}
      </div>
    </div>
  );
}