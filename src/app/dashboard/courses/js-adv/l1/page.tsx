"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, BookOpen, ChevronLeft, ChevronRight, MonitorPlay, FileText, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function LessonPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('content');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  const lessonData = {
    title: 'Closures & Scope',
    duration: '25 min',
    progress: 25,
    videoUrl: '/placeholder-video.mp4',
    content: `
      Closures are a fundamental concept in JavaScript that allow functions to retain 
      access to their lexical scope even when executed outside that scope. This lesson 
      covers:
      
      - Lexical scoping principles
      - Closure creation patterns
      - Practical use cases
      - Memory considerations
    `,
    resources: [
      { name: 'Lesson Notes', type: 'pdf', url: '#' },
      { name: 'Exercise Files', type: 'zip', url: '#' }
    ],
    quiz: [
      {
        question: "What's the output of the following code?",
        code: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  }
}
const counter = createCounter();
console.log(counter(), counter());`,
        options: ['1, 2', '0, 1', '1, 1', '2, 2'],
        correct: 0
      }
    ]
  };

  const handleAnswerSubmit = () => {
    setShowFeedback(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <Link href="/dashboard/courses/js-adv" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
              <ChevronLeft size={20} />
              Back to Course
            </Link>
            <div className="bg-gray-800 rounded-xl p-4">
              <span className="text-sm text-gray-400">Progress: {lessonData.progress}%</span>
              <div className="w-32 bg-gray-700 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${lessonData.progress}%` }}
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-4">
            <Code className="text-blue-400" size={32} />
            {lessonData.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-2">
              <MonitorPlay size={18} />
              {lessonData.duration}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={18} />
              Intermediate Level
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video & Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 rounded-xl aspect-video">
              <video 
                src={lessonData.videoUrl}
                controls
                className="w-full h-full rounded-xl"
              />
            </div>

            {/* Content Tabs */}
            <div className="flex gap-4 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-2 px-4 ${
                  activeTab === 'content' 
                    ? 'border-b-2 border-blue-500 text-blue-400' 
                    : 'hover:text-gray-300'
                }`}
              >
                Lesson Content
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
            </div>

            {/* Content Section */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <pre className="whitespace-pre-wrap font-sans text-gray-300 bg-gray-800 p-6 rounded-xl">
                  {lessonData.content}
                </pre>

                {/* Code Example */}
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-lg font-medium mb-4">Example: Counter Closure</h3>
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono">
                    {`function createCounter() {
  let count = 0;
  return () => ++count;
}
const counter = createCounter();
console.log(counter(), counter()); // 1, 2`}
                  </pre>
                </div>

                {/* Quiz Section */}
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-lg font-medium mb-4">Knowledge Check</h3>
                  {lessonData.quiz.map((q, index) => (
                    <div key={index} className="space-y-4">
                      <p className="font-medium">{q.question}</p>
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono">
                        {q.code}
                      </pre>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedAnswer(option)}
                            className={`p-3 rounded-lg text-left ${
                              selectedAnswer === option
                                ? 'bg-blue-500/20 border-blue-500'
                                : 'bg-gray-700/50 hover:bg-gray-700'
                            } border transition-colors`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {showFeedback && (
                        <div className={`p-4 rounded-lg flex items-center gap-3 ${
                          selectedAnswer === q.options[q.correct] 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {selectedAnswer === q.options[q.correct] ? (
                            <CheckCircle size={20} />
                          ) : (
                            <XCircle size={20} />
                          )}
                          {selectedAnswer === q.options[q.correct]
                            ? "Correct! Great job understanding closures."
                            : "Almost there! Remember closures retain their lexical environment."}
                        </div>
                      )}
                      <button
                        onClick={handleAnswerSubmit}
                        disabled={!selectedAnswer}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg disabled:opacity-50"
                      >
                        Check Answer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Section */}
            {activeTab === 'resources' && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <FileText className="text-green-400" size={20} />
                  Lesson Resources
                </h3>
                <div className="space-y-3">
                  {lessonData.resources.map((res, index) => (
                    <a
                      key={index}
                      href={res.url}
                      className="flex justify-between items-center bg-gray-700/50 hover:bg-gray-700 p-4 rounded-lg transition-colors"
                    >
                      <span>{res.name}</span>
                      <span className="text-gray-400 text-sm uppercase">
                        ({res.type})
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Sidebar */}
          <div className="bg-gray-800 rounded-xl p-6 h-fit">
            <h3 className="text-lg font-medium mb-4">Lesson Navigation</h3>
            <div className="space-y-4">
              <button 
                className="w-full bg-gray-700/50 hover:bg-gray-700 p-3 rounded-lg flex justify-between items-center opacity-50 cursor-not-allowed"
                disabled
              >
                <span className="text-gray-400">Previous Lesson</span>
                <ChevronLeft className="text-gray-400" />
              </button>
              
              <Link
                href="/dashboard/courses/js-adv/l2"
                className="w-full bg-blue-500/20 hover:bg-blue-500/30 p-3 rounded-lg flex justify-between items-center border border-blue-500/50 transition-colors"
              >
                <span>Next: Currying & Composition</span>
                <ChevronRight className="text-blue-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}