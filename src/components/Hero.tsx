
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowDown, Activity, Stethoscope, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  onExploreClick: () => void;
}

const Hero = ({ title, subtitle, onExploreClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (!heroRef.current) return;
      const top = heroRef.current.getBoundingClientRect().top;
      const opacity = 1 - (Math.abs(top) / 500);
      
      if (heroRef.current) {
        heroRef.current.style.opacity = Math.max(opacity, 0).toString();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = () => {
    navigate('/search');
  };

  return (
    <div 
      ref={heroRef}
      className={cn(
        "relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero-pattern",
        "transition-opacity duration-700 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Decorative shapes */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-coral-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
            {/* Logo with heart animation */}
            <div className="flex justify-center md:justify-start mb-8">
              <Heart className={cn(
                "h-16 w-16 text-coral",
                "animate-pulse-soft"
              )} />
            </div>
            
            {/* Hero Title */}
            <h1 
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 font-display",
                "opacity-0 transform translate-y-4",
                isVisible && "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
              )}
            >
              {title}
            </h1>
            
            {/* Hero Subtitle */}
            <p 
              className={cn(
                "text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto md:mx-0",
                "opacity-0 transform translate-y-4",
                isVisible && "opacity-100 translate-y-0 transition-all duration-1000 ease-out delay-300"
              )}
            >
              {subtitle}
            </p>
            
            {/* CTA Buttons */}
            <div 
              className={cn(
                "flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-16",
                "opacity-0 transform translate-y-4",
                isVisible && "opacity-100 translate-y-0 transition-all duration-1000 ease-out delay-500"
              )}
            >
              <Button 
                className="bg-navy hover:bg-navy-light text-white px-8 py-6 rounded-md text-lg"
                onClick={() => navigate('#')}
              >
                Invoices
              </Button>
              <Button 
                variant="outline" 
                className="border-navy text-navy hover:bg-navy/5 px-8 py-6 rounded-md text-lg"
                onClick={handleExploreClick}
              >
                Clients
              </Button>
            </div>
            
            {/* Animated Healthcare Icons */}
            <div className="hidden md:flex justify-start gap-8 mt-12">
              <div className="animate-float" style={{ animationDelay: '0s' }}>
                <Activity className="h-10 w-10 text-coral" />
              </div>
              <div className="animate-float" style={{ animationDelay: '1.5s' }}>
                <Stethoscope className="h-10 w-10 text-navy" />
              </div>
              <div className="animate-float" style={{ animationDelay: '3s' }}>
                <Pill className="h-10 w-10 text-coral-light" />
              </div>
            </div>
          </div>
          
          {/* Right Column - Pharmacy Image */}
          <div 
            className={cn(
              "hidden md:block relative rounded-2xl overflow-hidden shadow-2xl",
              "opacity-0 transform translate-x-10",
              isVisible && "opacity-100 translate-x-0 transition-all duration-1000 ease-out delay-700"
            )}
          >
            <img 
              src="https://images.unsplash.com/photo-1586015555751-63c29b43b1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
              alt="EL-ZOHOR Pharmacy" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent"></div>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div 
          className={cn(
            "absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce",
            "opacity-0",
            isVisible && "opacity-70 transition-all duration-1000 ease-out delay-1000"
          )}
          onClick={onExploreClick}
        >
          <ArrowDown className="h-8 w-8 text-navy" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
