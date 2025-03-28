
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">Synerthree</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#ideas" 
            className="text-gray-700 hover:text-brand-orange font-medium transition-colors"
          >
            Ideas
          </a>
          <a 
            href="#features" 
            className="text-gray-700 hover:text-brand-orange font-medium transition-colors"
          >
            Features
          </a>
          <a 
            href="#about" 
            className="text-gray-700 hover:text-brand-orange font-medium transition-colors"
          >
            About
          </a>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            Join Now
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#ideas" 
              className="text-gray-700 hover:text-brand-orange font-medium py-2 transition-colors"
              onClick={toggleMenu}
            >
              Ideas
            </a>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-brand-orange font-medium py-2 transition-colors"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-brand-orange font-medium py-2 transition-colors"
              onClick={toggleMenu}
            >
              About
            </a>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full">
              Join Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
