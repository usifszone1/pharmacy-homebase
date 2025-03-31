
import { cn } from '@/lib/utils';

interface NavDesktopLinksProps {
  closeMobileMenu: () => void;
}

const NavDesktopLinks = ({ closeMobileMenu }: NavDesktopLinksProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <a 
        href="/" 
        className="text-foreground font-medium hover:text-pharmacy-accent transition-colors"
        onClick={closeMobileMenu}
      >
        Home
      </a>
      <a 
        href="#" 
        className="text-foreground font-medium hover:text-pharmacy-accent transition-colors"
        onClick={closeMobileMenu}
      >
        Invoices
      </a>
      <a 
        href="/clients" 
        className="text-foreground font-medium hover:text-pharmacy-accent transition-colors"
        onClick={closeMobileMenu}
      >
        Clients
      </a>
    </nav>
  );
};

export default NavDesktopLinks;
