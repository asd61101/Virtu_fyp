
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const heroImageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroImageRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / 40;
      const moveY = (clientY - innerHeight / 2) / 40;
      
      heroImageRef.current.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-virtuspace-100 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-virtuspace-200 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-48 left-1/3 w-64 h-64 bg-virtuspace-300 rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="mt-10 lg:mt-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-block px-3 py-1 mb-5 rounded-full bg-virtuspace-100 text-virtuspace-600 font-medium text-sm">
              All-in-one architecture design platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Design your dream <span className="text-virtuspace-500">spaces</span> with ease
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Virtuspace Architecture brings professional-grade design tools to everyone. Create stunning 2D & 3D architectural designs with our intuitive platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="bg-virtuspace-500 hover:bg-virtuspace-600 text-white rounded-full px-8">
                <Link to="/auth?mode=signup">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-virtuspace-100 flex items-center justify-center text-virtuspace-500 font-medium">+1k</div>
              </div>
              <div className="text-sm text-gray-600">
                Trusted by thousands of architects & designers worldwide
              </div>
            </div>
          </div>
          
          <div className="relative lg:h-[38rem] flex items-center justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div 
              ref={heroImageRef} 
              className="w-full h-full relative transition-transform duration-75 ease-out"
            >
              <div className="absolute inset-0 glass rounded-2xl overflow-hidden shadow-xl border border-white/30">
                <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800/10 backdrop-blur-sm flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="pt-10 h-full bg-gray-50">
                  <img 
                    src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80" 
                    alt="Modern Architecture Design" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-virtuspace-100 flex items-center justify-center text-virtuspace-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Design complete</div>
                    <div className="text-sm font-medium">Modern Villa</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 glass rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-virtuspace-100 flex items-center justify-center text-virtuspace-500">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
