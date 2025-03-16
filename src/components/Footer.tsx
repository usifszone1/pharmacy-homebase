
import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={className}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-navy mb-4">About EL-ZOHOR PHARMACY</h3>
            <p className="text-gray-600 mb-4">
              We are dedicated to providing exceptional pharmaceutical care and health services to our community. With a focus on patient well-being, we offer personalized attention and professional advice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-navy mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pharmacy-accent transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pharmacy-accent transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pharmacy-accent transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pharmacy-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-navy mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Phone: 01066677826</li>
              <li className="text-gray-600">Landline: +2043232222</li>
              <li className="text-gray-600">Website: zohour.site</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} EL-ZOHOR PHARMACY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
