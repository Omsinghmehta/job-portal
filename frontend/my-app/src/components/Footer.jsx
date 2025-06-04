import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1717a2] text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 ">About <span className='underline'>TalentBridge</span></h2>
          <p className="text-sm">
            Your go-to platform for the latest and top job opportunities across various industries. We help bridge the gap between talent and employers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/jobs" className="hover:underline">Jobs</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <ul className="text-sm space-y-2">
            <li>Email: support@TalentBridge.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: New Delhi, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm py-4 border-t border-white/20">
        &copy; {new Date().getFullYear()} TalentBridge. All rights reserved.
      </div>
    </footer>
  );
}
