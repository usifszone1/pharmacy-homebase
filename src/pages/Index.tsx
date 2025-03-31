
import { useRef } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import WhatsAppClaimForm from '@/components/WhatsAppClaimForm';
import { getOrganizations } from '@/utils/database';

const Index = () => {
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const claimFormRef = useRef<HTMLDivElement>(null);
  const organizations = getOrganizations(); // Get the list of organizations

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
        
        {/* WhatsApp Claim Form Section */}
        <div 
          ref={claimFormRef}
          className="py-16 md:py-24 bg-gray-50"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <WhatsAppClaimForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer className="border-t border-gray-200" />
    </div>
  );
};

export default Index;
