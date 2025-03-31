
import { useNavigate } from 'react-router-dom';
import { Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

interface NavActionsProps {
  closeMobileMenu: () => void;
  isMobile?: boolean;
}

const NavActions = ({ closeMobileMenu, isMobile = false }: NavActionsProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const handleSearchClick = () => {
    navigate('/search');
    closeMobileMenu();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // For mobile view, we'll render the items differently
  if (isMobile) {
    return (
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
    );
  }

  // Desktop view
  return (
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
  );
};

export default NavActions;
