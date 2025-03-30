
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-coral-light/20 text-coral rounded-full font-medium text-sm">Meet Our Team</div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12 font-display">Expert Pharmacists At Your Service</h2>
          
          {/* Image Display - Centered */}
          <div 
            className={cn(
              "opacity-0 transform translate-y-4 mx-auto",
              isVisible && "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
            )}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl mx-auto" style={{ maxWidth: '400px', aspectRatio: '3/4' }}>
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
        </div>
      </div>
    </div>
  );
};

export default PharmacistCard;
