
import { cn } from '@/lib/utils';
import NavDesktopLinks from './NavDesktopLinks';
import NavActions from './NavActions';

interface NavMobileMenuProps {
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

const NavMobileMenu = ({ isMobileMenuOpen, closeMobileMenu }: NavMobileMenuProps) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        "md:hidden"
      )}
      style={{ top: '60px' }}
    >
      <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
        <a 
          href="/" 
          className="block px-3 py-4 text-base font-medium text-foreground border-b border-gray-100"
          onClick={closeMobileMenu}
        >
          Home
        </a>
        <a 
          href="#" 
          className="block px-3 py-4 text-base font-medium text-foreground border-b border-gray-100"
          onClick={closeMobileMenu}
        >
          Invoices
        </a>
        <a 
          href="/clients" 
          className="block px-3 py-4 text-base font-medium text-foreground border-b border-gray-100"
          onClick={closeMobileMenu}
        >
          Clients
        </a>
        <NavActions closeMobileMenu={closeMobileMenu} isMobile={true} />
      </div>
    </div>
  );
};

export default NavMobileMenu;
