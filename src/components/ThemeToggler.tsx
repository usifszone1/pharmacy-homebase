
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Globe } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface ThemeTogglerProps {
  className?: string;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ className }) => {
  const { theme, language, toggleTheme, toggleLanguage } = useTheme();

  return (
    <div className={cn("flex gap-2", className)}>
      <Toggle 
        aria-label="Toggle theme"
        pressed={theme === 'dark'}
        onPressedChange={toggleTheme}
        className="border border-input rounded-full p-2 hover:bg-muted data-[state=on]:bg-navy data-[state=on]:text-white"
      >
        {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
      </Toggle>
      
      <ToggleGroup type="single" value={language} onValueChange={(value) => value && toggleLanguage()}>
        <ToggleGroupItem 
          value="en" 
          aria-label="English"
          className={cn(
            "border border-input rounded-full p-2 text-xs font-medium",
            language === 'en' ? "bg-navy text-white" : "hover:bg-muted"
          )}
        >
          EN
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="ar" 
          aria-label="Arabic"
          className={cn(
            "border border-input rounded-full p-2 text-xs font-medium",
            language === 'ar' ? "bg-navy text-white" : "hover:bg-muted"
          )}
        >
          AR
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ThemeToggler;
