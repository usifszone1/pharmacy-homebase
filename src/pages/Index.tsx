
import { useRef } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import PharmacistCard from '@/components/PharmacistCard';
import { Footer } from '@/components/ui/sidebar';

const Index = () => {
  const infoSectionRef = useRef<HTMLDivElement>(null);

  const scrollToInfoSection = () => {
    infoSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-pharmacy-bg">
      <NavBar />
      
      <main>
        <Hero 
          title="EL-ZOHOR PHARMACY" 
          subtitle="Your Trusted Health Partner"
          onExploreClick={scrollToInfoSection}
        />
        
        <div ref={infoSectionRef}>
          <InfoSection 
            address="ش 6 أكتوبر - سور النادي الرياضي بجوار مسجد الاستاد - كفر الشيخ"
            phone="01066677826"
            landline="+2043232222"
            website="zohour.site"
          />
        </div>
        
        <PharmacistCard />
      </main>
      
      <Footer className="border-t border-gray-200">
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
      </Footer>
    </div>
  );
};

export default Index;
