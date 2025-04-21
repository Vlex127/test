"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert('Thank you for your message! We will respond shortly.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
            <Mail className="text-blue-400" size={32} />
            Contact Us
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions? Get in touch with our team or visit our knowledge base
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="text-blue-400" size={24} />
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="text-gray-400">iwunoayokunle@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="text-green-400" size={24} />
                <div>
                  <h3 className="text-xl font-semibold">Phone</h3>
                  <p className="text-gray-400">+2347046215136</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="text-purple-400" size={24} />
                <div>
                  <h3 className="text-xl font-semibold">Office</h3>
                  <p className="text-gray-400">123 Tech Valley Blvd</p>
                  <p className="text-gray-400">San Francisco, CA 94107</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 justify-center md:justify-start">
              <a href="github.com/Vlex127/" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://x.com/AyokunleIw43103" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}