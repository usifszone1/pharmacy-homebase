
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Heart, Search, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isSignedIn } = useUser();

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

  const handleSearchClick = () => {
    navigate('/search');
    closeMobileMenu();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in backdrop-blur-md",
          isScrolled ? "bg-background/90 shadow-md py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="/" 
                className="flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity group"
              >
                <Heart className="h-8 w-8 text-coral animate-pulse-soft group-hover:text-coral-light transition-colors" />
                <span className="font-display text-xl sm:text-2xl font-bold bg-gradient-to-r from-navy to-coral-light bg-clip-text text-transparent">EL-ZOHOR PHARMACY</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className="text-foreground font-medium hover:text-pharmacy-accent transition-colors"
              >
                Home
              </a>
              <a 
                href="#" 
                className="text-foreground font-medium hover:text-pharmacy-accent transition-colors"
              >
                Invoices
              </a>
              <a 
                href="/clients" 
                className="text-foreground font-medium hover:text-pharmacy-accent transition-colors"
              >
                Clients
              </a>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="text-foreground hover:text-pharmacy-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 text-foreground hover:text-pharmacy-accent transition-colors"
                onClick={handleSearchClick}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Button>
              
              <SignedOut>
                <SignInButton mode="modal">
                  <Button 
                    className="bg-navy hover:bg-navy-light transition-colors"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </SignedIn>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="text-foreground"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </SignedIn>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                aria-label="Menu"
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
          <div className="pt-4 flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-center"
              onClick={handleSearchClick}
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
            
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  className="w-full justify-center bg-navy text-white hover:bg-navy-light"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
