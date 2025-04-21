import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/code-icon.svg"
              alt="CodeMaster Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-blue-400">CodeMaster</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-blue-400 transition-colors">
              Login
            </Link>
            <Link href="/courses" className="hover:text-blue-400 transition-colors">
              Courses
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Master Programming with <span className="text-blue-400">Interactive</span> Learning
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Learn to code through hands-on exercises, real-world projects, and expert mentorship
          </p>
          <Link
  href="/login"
  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
>
  Start Learning Free
</Link>
        </div>
        <div className="mt-16 border border-gray-700 rounded-xl p-4 bg-gray-800 max-w-4xl mx-auto">
          <div className="flex gap-4 overflow-x-auto">
            <div className="flex-shrink-0 w-64 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-blue-400 mb-2">Python Basics</h3>
              <p className="text-sm text-gray-400">Start your coding journey</p>
            </div>
            <div className="flex-shrink-0 w-64 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-blue-400 mb-2">Web Development</h3>
              <p className="text-sm text-gray-400">Build modern websites</p>
            </div>
            <div className="flex-shrink-0 w-64 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-blue-400 mb-2">Data Science</h3>
              <p className="text-sm text-gray-400">Analyze & visualize data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose CodeMaster?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <Image src="/interactive-icon.svg" alt="Interactive" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Coding</h3>
              <p className="text-gray-400">Practice directly in your browser with real-time feedback</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <Image src="/mentor-icon.svg" alt="Mentorship" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Mentors</h3>
              <p className="text-gray-400">Get guidance from industry professionals</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
                <Image src="/certificate-icon.svg" alt="Certification" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certifications</h3>
              <p className="text-gray-400">Earn recognized credentials for your skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Student Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/student1.png"
                alt="Student"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <p className="text-blue-400">Full Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-400">
              "CodeMaster transformed my career. The hands-on projects gave me the confidence to
              apply for developer roles."
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/student2.png"
                alt="Student"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">Michael Chen</h3>
                <p className="text-blue-400">Data Analyst</p>
              </div>
            </div>
            <p className="text-gray-400">
              "The mentorship program is exceptional. I went from beginner to job-ready in 6 months!"
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Coding Journey Today</h2>
          <p className="text-xl mb-8">Join over 500,000 students worldwide</p>
          <Link
  href="/login"
  className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
>
  Get Started Now
</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-gray-400">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Footer content remains the same */}
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">CodeMaster</h3>
              <p>Empowering the next generation of developers</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Courses</h3>
              <ul className="space-y-2">
                <li>Web Development</li>
                <li>Mobile Development</li>
                <li>Data Science</li>
                <li>Machine Learning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <Image src="/twitter-icon.svg" alt="Twitter" width={24} height={24} />
                <Image src="/github-icon.svg" alt="GitHub" width={24} height={24} />
                <Image src="/linkedin-icon.svg" alt="LinkedIn" width={24} height={24} />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p>© 2024 CodeMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}