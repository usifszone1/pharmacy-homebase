
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLogoProps {
  isScrolled: boolean;
}

const NavLogo = ({ isScrolled }: NavLogoProps) => {
  return (
    <div className="flex items-center">
      <a 
        href="/" 
        className="flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity group"
      >
        <Heart className="h-8 w-8 text-coral animate-pulse-soft group-hover:text-coral-light transition-colors" />
        <span className="font-display text-xl sm:text-2xl font-bold bg-gradient-to-r from-navy to-coral-light bg-clip-text text-transparent">EL-ZOHOR PHARMACY</span>
      </a>
    </div>
  );
};

export default NavLogo;
