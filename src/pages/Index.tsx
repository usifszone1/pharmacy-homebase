
import { useRef } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import PharmacistCard from '@/components/PharmacistCard';
import Footer from '@/components/Footer';

const Index = () => {
  const infoSectionRef = useRef<HTMLDivElement>(null);

  const scrollToInfoSection = () => {
    infoSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-pharmacy-bg dark:bg-navy-dark transition-colors duration-300">
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
      
      <Footer className="border-t border-gray-200 dark:border-gray-700" />
    </div>
  );
};

export default Index;
