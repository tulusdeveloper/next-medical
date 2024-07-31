// pages/index.js
import Image from 'next/image';
import { FaHeartbeat, FaUserMd, FaCalendarAlt, FaFileInvoiceDollar } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto p-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Hospital Management System</div>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-md mb-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Hospital Management System</h1>
          <p className="text-lg mb-8">Streamline your hospital operations with our comprehensive, user-friendly system.</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition duration-300">
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <FaHeartbeat className="text-6xl text-teal-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Patient Management</h3>
              <p className="text-gray-600">Efficiently manage patient records and appointments.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <FaUserMd className="text-6xl text-teal-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Doctor Management</h3>
              <p className="text-gray-600">Organize doctor schedules and information seamlessly.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <FaCalendarAlt className="text-6xl text-teal-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Appointment Scheduling</h3>
              <p className="text-gray-600">Simplify appointment booking and management.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <FaFileInvoiceDollar className="text-6xl text-teal-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Billing System</h3>
              <p className="text-gray-600">Handle billing and payments with ease.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-100 rounded-lg shadow-md mb-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"This system has transformed the way we manage our hospital operations. Highly recommended!"</p>
              <h3 className="text-xl font-bold">Dr. John Doe</h3>
              <p className="text-gray-600">Chief Medical Officer</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"User-friendly and efficient. Our staff loves it!"</p>
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-gray-600">Hospital Administrator</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"A comprehensive solution for managing our patient records and appointments."</p>
              <h3 className="text-xl font-bold">Dr. Emily Brown</h3>
              <p className="text-gray-600">General Practitioner</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-10">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="mb-8">For inquiries, please email us at info@hospitalmanagementsystem.com</p>
          <div className="space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
