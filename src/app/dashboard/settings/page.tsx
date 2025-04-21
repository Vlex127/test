"use client";
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { User } from 'firebase/auth';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('my-courses');
  const [teachingCourses, setTeachingCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [newCourseForm, setNewCourseForm] = useState({
    title: '',
    description: '',
    category: 'programming'
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) return;
      setUser(user);
      fetchTeachingCourses(user.uid);
      fetchEnrolledCourses(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const fetchTeachingCourses = async (uid) => {
    // Mock teaching courses
    setTeachingCourses([
      {
        id: 'py101',
        title: 'Python Fundamentals',
        enrolled: 45,
        progress: 82,
        lastUpdated: '2024-03-15'
      },
      {
        id: 'web-dev',
        title: 'Full Stack Web Development',
        enrolled: 28,
        progress: 65,
        lastUpdated: '2024-03-18'
      }
    ]);
  };

  const fetchEnrolledCourses = async (uid) => {
    // Mock enrolled courses
    setEnrolledCourses([
      {
        id: 'js-adv',
        title: 'Advanced JavaScript',
        instructor: 'Dr. CodeMaster',
        progress: 45,
        nextDeadline: '2024-04-01'
      },
      {
        id: 'data-sci',
        title: 'Data Science Essentials',
        instructor: 'Prof. DataWiz',
        progress: 78,
        nextDeadline: '2024-03-25'
      }
    ]);
  };

  const createNewCourse = async () => {
    if (!newCourseForm.title) return;
    const newCourse = {
      id: Math.random().toString(36).substr(2, 9),
      ...newCourseForm,
      enrolled: 0,
      progress: 0,
      lastUpdated: new Date().toISOString()
    };
    setTeachingCourses([...teachingCourses, newCourse]);
    setNewCourseForm({ title: '', description: '', category: 'programming' });
  };

  const enrollInCourse = async (courseCode) => {
    const mockCourse = {
      id: courseCode,
      title: `Course ${courseCode.toUpperCase()}`,
      instructor: 'Prof. Example',
      progress: 0,
      nextDeadline: '2024-04-15'
    };
    setEnrolledCourses([...enrolledCourses, mockCourse]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Courses sidebar */}
          <div className="w-64 space-y-2">
            <h2 className="text-xl font-bold mb-6">Course Management</h2>
            <button
              onClick={() => setActiveTab('my-courses')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'my-courses' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
            >
              🎓 My Courses
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'enrollments' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
            >
              📚 Enrollments
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'progress' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
            >
              📈 Progress Overview
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === 'my-courses' && (
              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Teaching Courses</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <input
                        type="text"
                        placeholder="Course Title"
                        value={newCourseForm.title}
                        onChange={(e) => setNewCourseForm({...newCourseForm, title: e.target.value})}
                        className="w-full mb-2 bg-gray-600 text-white px-3 py-2 rounded"
                      />
                      <textarea
                        placeholder="Course Description"
                        value={newCourseForm.description}
                        onChange={(e) => setNewCourseForm({...newCourseForm, description: e.target.value})}
                        className="w-full mb-2 bg-gray-600 text-white px-3 py-2 rounded"
                      />
                      <select
                        value={newCourseForm.category}
                        onChange={(e) => setNewCourseForm({...newCourseForm, category: e.target.value})}
                        className="w-full mb-2 bg-gray-600 text-white px-3 py-2 rounded"
                      >
                        <option value="programming">Programming</option>
                        <option value="data-science">Data Science</option>
                        <option value="web-dev">Web Development</option>
                      </select>
                      <button
                        onClick={createNewCourse}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                      >
                        Create New Course
                      </button>
                    </div>
                    {teachingCourses.map(course => (
                      <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-lg font-medium">{course.title}</h4>
                          <span className="text-sm text-gray-400">{course.enrolled} students</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-500 rounded-full h-2"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>{course.progress}% Complete</span>
                          <span>Last updated: {course.lastUpdated}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'enrollments' && (
              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Enrolled Courses</h3>
                  <div className="bg-gray-700 p-4 rounded-lg mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Course Code"
                        className="flex-1 bg-gray-600 text-white px-3 py-2 rounded"
                        id="courseCode"
                      />
                      <button
                        onClick={() => {
                          const courseCode = document.getElementById('courseCode').value;
                          enrollInCourse(courseCode);
                        }}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {enrolledCourses.map(course => (
                      <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-lg font-medium">{course.title}</h4>
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
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {enrolledCourses.map(course => (
                      <div key={course.id} className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-lg font-medium mb-2">{course.title}</h4>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}