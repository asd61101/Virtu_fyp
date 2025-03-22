
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check if user is logged in from localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Features', path: '/#features', dropdown: [
      { name: 'AI Floorplanning', path: '/ai-floorplanning' },
      { name: 'Interactive 3D', path: '/#interactive-3d' },
      { name: 'Mood Boards', path: '/#mood-boards' },
      { name: '360° Walkthrough', path: '/360-walkthrough' },
    ]},
    { name: 'Gallery', path: '/gallery' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-virtuspace-700">VIRTUSPACE</span>
              <span className="ml-2 text-sm font-light text-gray-500">ARCHITECTURE</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => 
                item.dropdown ? (
                  <div key={item.name} className="relative group">
                    <button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-virtuspace-600 transition-colors">
                      {item.name}
                      <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-virtuspace-50 hover:text-virtuspace-600"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-virtuspace-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <Button asChild className="bg-virtuspace-500 hover:bg-virtuspace-600">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild className="text-virtuspace-500 hover:text-virtuspace-600">
                    <Link to="/auth?mode=login">Login</Link>
                  </Button>
                  <Button asChild className="bg-virtuspace-500 hover:bg-virtuspace-600">
                    <Link to="/auth?mode=signup">Sign Up Free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-virtuspace-600 focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => 
              item.dropdown ? (
                <div key={item.name} className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-700">{item.name}</div>
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        onClick={toggleMenu}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-virtuspace-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-virtuspace-600"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-3 px-5 py-3">
              {isLoggedIn ? (
                <Button 
                  asChild 
                  className="w-full bg-virtuspace-500 hover:bg-virtuspace-600"
                  onClick={toggleMenu}
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full"
                    onClick={toggleMenu}
                  >
                    <Link to="/auth?mode=login">Login</Link>
                  </Button>
                  <Button 
                    asChild 
                    className="w-full bg-virtuspace-500 hover:bg-virtuspace-600"
                    onClick={toggleMenu}
                  >
                    <Link to="/auth?mode=signup">Sign Up Free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
