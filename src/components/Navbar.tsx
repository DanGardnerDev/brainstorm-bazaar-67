
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Don't show the navbar on login or signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  // Check if we're on a dashboard page (authenticated pages)
  const isAuthenticatedPage = ["/dashboard", "/profile", "/ideas"].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">Synerthree</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isAuthenticatedPage ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-brand-orange font-medium transition-colors"
              >
                Ideas
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-brand-orange font-medium transition-colors"
              >
                Profile
              </Link>
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700">
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
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
              <Link to="/login">
                <Button variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy/5 mr-2">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
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
            {isAuthenticatedPage ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-brand-orange font-medium py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  Ideas
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-brand-orange font-medium py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link 
                  to="/login"
                  className="text-gray-700 hover:text-brand-orange font-medium py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
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
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy/5">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
