
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const PharmacistCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div 
            className={cn(
              "opacity-0 transform translate-y-4",
              isVisible && "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
            )}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '3/4' }}>
              <img
                src="/lovable-uploads/a0377c5d-fae7-4aa9-94d1-38034eb630ac.png"
                alt="Professional pharmacist"
                className={cn(
                  "w-full h-full object-cover transition-all duration-700 ease-out",
                  !imageLoaded ? "filter blur-xl scale-105" : "filter blur-0 scale-100"
                )}
                onLoad={handleImageLoad}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/40 pointer-events-none"></div>
            </div>
          </div>
          
          {/* Content Column */}
          <div 
            className={cn(
              "space-y-6",
              "opacity-0 transform translate-y-4",
              isVisible && "opacity-100 translate-y-0 transition-all duration-1000 ease-out delay-300"
            )}
          >
            <div className="inline-block mb-2 px-4 py-2 bg-coral-light/20 text-coral rounded-full font-medium text-sm">Meet Our Team</div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 font-display">Expert Pharmacists At Your Service</h2>
            <p className="text-gray-700 text-lg mb-6">
              Our dedicated team of professional pharmacists is committed to providing you with the highest level of care. With extensive knowledge and years of experience, we're here to answer your questions and ensure you receive the right medications for your specific needs.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-coral/20 flex items-center justify-center mt-0.5 mr-3">
                  <span className="h-3 w-3 rounded-full bg-coral"></span>
                </div>
                <p className="text-gray-700">Personalized medication consultations</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-coral/20 flex items-center justify-center mt-0.5 mr-3">
                  <span className="h-3 w-3 rounded-full bg-coral"></span>
                </div>
                <p className="text-gray-700">Comprehensive health advice</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-coral/20 flex items-center justify-center mt-0.5 mr-3">
                  <span className="h-3 w-3 rounded-full bg-coral"></span>
                </div>
                <p className="text-gray-700">Medication management services</p>
              </li>
            </ul>
            <div className="pt-4">
              <Button className="bg-navy text-white hover:bg-navy-light transition-colors">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacistCard;
