
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Heart, Search, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LoginModal from './LoginModal';
import ThemeToggler from './ThemeToggler';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    closeMobileMenu();
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSearchClick = () => {
    navigate('/search');
    closeMobileMenu();
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in",
          isScrolled ? "bg-white dark:bg-navy dark:bg-opacity-95 shadow-md py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="/" 
                className="flex items-center gap-2 text-navy dark:text-white hover:opacity-90 transition-opacity"
              >
                <Heart className="h-8 w-8 text-coral animate-pulse-soft" />
                <span className="font-display text-xl sm:text-2xl font-bold">EL-ZOHOR PHARMACY</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className="text-navy dark:text-white font-medium hover:text-pharmacy-accent transition-colors"
              >
                Home
              </a>
              <div className="relative group">
                <button className="flex items-center text-navy dark:text-white font-medium hover:text-pharmacy-accent transition-colors">
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-navy ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-light">Prescription Filling</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-light">Medical Consultation</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-light">Health Checkups</a>
                </div>
              </div>
              <a 
                href="#" 
                className="text-navy dark:text-white font-medium hover:text-pharmacy-accent transition-colors"
              >
                Products
              </a>
              <a 
                href="#" 
                className="text-navy dark:text-white font-medium hover:text-pharmacy-accent transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggler className="mr-2" />
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 text-navy dark:text-white hover:text-pharmacy-accent transition-colors"
                onClick={handleSearchClick}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Button>
              <Button 
                className="bg-navy dark:bg-coral text-white hover:bg-navy-light dark:hover:bg-coral-light transition-colors"
                onClick={openLoginModal}
              >
                <UserCircle className="mr-2 h-5 w-5" />
                Login
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggler />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                aria-label="Menu"
                className="text-navy dark:text-white"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white dark:bg-navy transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          "md:hidden"
        )}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
          <a 
            href="/" 
            className="block px-3 py-4 text-base font-medium text-navy dark:text-white border-b border-gray-100 dark:border-navy-light"
            onClick={closeMobileMenu}
          >
            Home
          </a>
          <button 
            className="text-left px-3 py-4 text-base font-medium text-navy dark:text-white border-b border-gray-100 dark:border-navy-light"
          >
            Services
          </button>
          <a 
            href="#" 
            className="block px-3 py-4 text-base font-medium text-navy dark:text-white border-b border-gray-100 dark:border-navy-light"
            onClick={closeMobileMenu}
          >
            Products
          </a>
          <a 
            href="#" 
            className="block px-3 py-4 text-base font-medium text-navy dark:text-white border-b border-gray-100 dark:border-navy-light"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
          <div className="pt-4 flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-center dark:text-white dark:border-gray-600"
              onClick={handleSearchClick}
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
            <Button 
              className="w-full justify-center bg-navy dark:bg-coral text-white hover:bg-navy-light dark:hover:bg-coral-light"
              onClick={openLoginModal}
            >
              <UserCircle className="mr-2 h-5 w-5" />
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default NavBar;
