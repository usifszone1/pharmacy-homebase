
import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Globe, Clock, AlertCircle, Heart, Pill, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoSectionProps {
  address: string;
  phone: string;
  landline: string;
  website: string;
}

const InfoSection = ({ address, phone, landline, website }: InfoSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
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

  const infoCards = [
    {
      icon: <MapPin className="h-8 w-8 text-coral" />,
      title: "Our Location",
      content: address,
      delay: 0,
    },
    {
      icon: <Phone className="h-8 w-8 text-coral" />,
      title: "Contact Us",
      content: (
        <>
          <p>Mobile: <a href={`tel:${phone}`} className="hover:underline">{phone}</a></p>
          <p>Landline: <a href={`tel:${landline}`} className="hover:underline">{landline}</a></p>
        </>
      ),
      delay: 100,
    },
    {
      icon: <Globe className="h-8 w-8 text-coral" />,
      title: "Website",
      content: (
        <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {website}
        </a>
      ),
      delay: 200,
    },
    {
      icon: <Clock className="h-8 w-8 text-coral" />,
      title: "Working Hours",
      content: (
        <>
          <p>Monday - Friday: 9AM - 10PM</p>
          <p>Saturday - Sunday: 10AM - 8PM</p>
        </>
      ),
      delay: 300,
    },
  ];

  const services = [
    {
      icon: <Pill className="h-10 w-10 text-navy" />,
      title: "Prescription Services",
      description: "Fast and accurate prescription filling with expert pharmacist consultation.",
      delay: 0,
    },
    {
      icon: <Stethoscope className="h-10 w-10 text-navy" />,
      title: "Health Checkups",
      description: "Regular health monitoring including blood pressure, glucose, and cholesterol tests.",
      delay: 100,
    },
    {
      icon: <AlertCircle className="h-10 w-10 text-navy" />,
      title: "Medical Advice",
      description: "Professional guidance on medications, side effects, and drug interactions.",
      delay: 200,
    },
    {
      icon: <Heart className="h-10 w-10 text-navy" />,
      title: "Wellness Products",
      description: "High-quality vitamins, supplements, and personal care products.",
      delay: 300,
    },
  ];

  return (
    <div ref={sectionRef} className="py-16 md:py-24">
      <div className="container-custom">
        {/* Contact Information */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-display">Essential Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about reaching us and our services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoCards.map((card, index) => (
              <div
                key={index}
                className={cn(
                  "info-card group",
                  "opacity-0 transform translate-y-4",
                  isVisible && "opacity-100 translate-y-0 transition-all duration-700 ease-out"
                )}
                style={{ transitionDelay: `${card.delay}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-blue-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{card.title}</h3>
                  <div className="text-gray-600">{card.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Services Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-display">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide a wide range of pharmacy services to care for your health.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl border border-gray-100 hover:border-blue-100 bg-white shadow-card hover:shadow-card-hover transition-all duration-300",
                  "opacity-0 transform translate-y-4",
                  isVisible && "opacity-100 translate-y-0 transition-all duration-700 ease-out"
                )}
                style={{ transitionDelay: `${400 + service.delay}ms` }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
