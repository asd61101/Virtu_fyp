import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
    
    // Check login status
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedInStatus);
    };
    
    checkLoginStatus();
    
    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('loginStateChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChanged', checkLoginStatus);
    };
  }, []);

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
          
          <div className="hidden md:flex md:space-x-8 items-center">
            <Popover>
              <PopoverTrigger className="flex items-center gap-1 text-gray-700 hover:text-virtuspace-600">
                Features <ChevronDown size={16} />
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0">
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <div className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-md transition-colors">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-md text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">3D Ready</div>
                      <div className="text-sm font-medium">View in AR/VR</div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Link to="/gallery" className="text-gray-700 hover:text-virtuspace-600">
              Gallery
            </Link>
            
            <Link to="/pricing" className="text-gray-700 hover:text-virtuspace-600">
              Pricing
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button variant="outline" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-[#1087e0] hover:text-virtuspace-600">
                  <Link to="/auth?mode=login">
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-[#1087e0] hover:bg-virtuspace-600 text-white">
                  <Link to="/auth?mode=signup">
                    Sign Up Free
                  </Link>
                </Button>
              </>
            )}
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
            {[
              { name: 'Features', path: '/#features', dropdown: [
                { name: 'AI Floorplanning', path: '/ai-floorplanning' },
                { name: 'Interactive 3D', path: '/#interactive-3d' },
                { name: 'Mood Boards', path: '/#mood-boards' },
                { name: '360° Walkthrough', path: '/360-walkthrough' },
              ]},
              { name: 'Gallery', path: '/gallery' },
              { name: 'Pricing', path: '/pricing' },
            ].map((item) => 
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
                  variant="outline" 
                  asChild 
                  className="w-full"
                  onClick={toggleMenu}
                >
                  <Link to="/">Home</Link>
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full"
                    onClick={toggleMenu}
                  >
                    <Link to="/auth?mode=login" className="flex items-center justify-center gap-1">
                      <LogIn size={16} />
                      Login
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    className="w-full bg-[#1087e0] hover:bg-virtuspace-600"
                    onClick={toggleMenu}
                  >
                    <Link to="/auth?mode=signup" className="flex items-center justify-center gap-1">
                      <UserPlus size={16} />
                      Sign Up Free
                    </Link>
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
