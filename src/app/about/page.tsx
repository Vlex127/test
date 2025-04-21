"use client";
import { Rocket, Users, Code, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  const teamMembers = [
    { 
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Full-stack developer with passion for education',
      initials: 'AC'
    },
    {
      name: 'Samantha Wu',
      role: 'CTO',
      bio: 'Cloud architecture expert & system designer',
      initials: 'SW'
    },
    {
      name: 'James Park',
      role: 'Lead Instructor',
      bio: 'Developer advocate & curriculum specialist',
      initials: 'JP'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
            <Rocket className="text-blue-400" size={32} />
            About CourseMaster
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering developers worldwide with cutting-edge AI learning solutions
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We believe in democratizing AI education through interactive learning
                experiences. Our platform combines expert knowledge with intelligent
                mentorship to help developers of all levels achieve their goals.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-blue-500/20 p-6 rounded-xl flex items-center gap-4">
                <Users className="text-blue-400" size={28} />
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-gray-400 text-sm">Active Learners</div>
                </div>
              </div>
              <div className="bg-green-500/20 p-6 rounded-xl flex items-center gap-4">
                <Code className="text-green-400" size={28} />
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-gray-400 text-sm">Courses & Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map(member => (
              <div 
                key={member.initials}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl mb-4">
                  {member.initials}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Code className="text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hands-On Learning</h3>
              <p className="text-gray-400 text-sm">
                Practical projects and real-world scenarios
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-400 text-sm">
                Industry-vetted curriculum standards
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Users className="text-yellow-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-400 text-sm">
                Peer learning and expert mentorship
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Rocket className="text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">
                Cutting-edge technologies and methods
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push('/courses')}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl text-lg flex items-center gap-2 mx-auto"
          >
            <Rocket size={20} />
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
}