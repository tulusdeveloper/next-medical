// pages/index.js
import Image from 'next/image';
import { FaHeartbeat, FaUserMd, FaCalendarAlt, FaFileInvoiceDollar, FaFlask, FaAmbulance } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}


interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}
export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto p-6 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="HMS Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-blue-600 ml-2">MediCare HMS</span>
          </div>
          <div className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            <a href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Login</a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg mb-16">
          <h1 className="text-5xl font-bold mb-4">Revolutionize Your Hospital Management</h1>
          <p className="text-xl mb-8">Empowering healthcare professionals with cutting-edge technology for superior patient care.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300">
            Start Free Trial
          </button>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Comprehensive Healthcare Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard icon={FaHeartbeat} title="Patient Care Management" description="Streamline patient records, treatment plans, and follow-ups." />
            <FeatureCard icon={FaUserMd} title="Staff Scheduling" description="Optimize doctor and nurse schedules for maximum efficiency." />
            <FeatureCard icon={FaCalendarAlt} title="Appointment System" description="Simplify booking and reduce wait times for patients." />
            <FeatureCard icon={FaFileInvoiceDollar} title="Integrated Billing" description="Automate invoicing and insurance claim processing." />
            <FeatureCard icon={FaFlask} title="Lab Integration" description="Seamlessly manage lab orders and results within the system." />
            <FeatureCard icon={FaAmbulance} title="Emergency Services" description="Coordinate rapid response and resource allocation in critical situations." />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-blue-50 rounded-lg shadow-inner mb-16">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Trusted by Healthcare Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <TestimonialCard quote="This system has transformed our hospital operations. Patient care has never been more efficient." name="Dr. Sarah Johnson" title="Chief of Surgery, Metro General Hospital" />
            <TestimonialCard quote="The integrated approach of MediCare HMS has significantly reduced our administrative overhead." name="Michael Chen" title="Hospital Administrator, Westside Medical Center" />
            <TestimonialCard quote="From ER to long-term care, this system adapts to all our needs. It's truly comprehensive." name="Dr. Emily Rodriguez" title="Emergency Medicine Director, County Health" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
          <p className="mb-8 text-lg">Discover how MediCare HMS can transform your healthcare facility</p>
          <form className="max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 mb-4 rounded-md text-gray-800" />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">Request Demo</button>
          </form>
          <div className="mt-12 space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <Icon className="text-5xl text-blue-600 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}