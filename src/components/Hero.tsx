
import { useState, useEffect, useRef } from 'react';
import { Heart, ArrowDown } from 'lucide-react';
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
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo with heart animation */}
          <div className="flex justify-center mb-8">
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
              "text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto",
              "opacity-0 transform translate-y-4",
              isVisible && "opacity-100 translate-y-0 transition-all duration-1000 ease-out delay-300"
            )}
          >
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row justify-center gap-4 mb-16",
              "opacity-0 transform translate-y-4",
              isVisible && "opacity-100 translate-y-0 transition-all duration-1000 ease-out delay-500"
            )}
          >
            <Button 
              className="bg-navy hover:bg-navy-light text-white px-8 py-6 rounded-md text-lg"
              onClick={() => window.location.href = 'tel:01066677826'}
            >
              Call Now
            </Button>
            <Button 
              variant="outline" 
              className="border-navy text-navy hover:bg-navy/5 px-8 py-6 rounded-md text-lg"
              onClick={onExploreClick}
            >
              Explore Services
            </Button>
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
    </div>
  );
};

export default Hero;
