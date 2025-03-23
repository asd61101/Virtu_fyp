
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-r from-blue-50 to-blue-100/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="pt-24 lg:pt-0">
            <div className="inline-block px-3 py-1 mb-5 rounded-full bg-virtuspace-100 text-virtuspace-600 font-medium text-sm">
              All-in-one architecture design platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
              Design your dream <span className="text-[#1087e0]">spaces</span> with ease
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Virtuspace Architecture brings professional-grade design tools to everyone. Create stunning 2D & 3D architectural designs with our intuitive platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="bg-[#1087e0] hover:bg-virtuspace-600 text-white rounded-full px-8">
                <Link to="/auth?mode=signup" className="flex items-center">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 border-gray-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-virtuspace-100 flex items-center justify-center text-virtuspace-500 font-medium">+1k</div>
              </div>
              <div className="text-sm text-gray-600">
                Trusted by thousands of architects & designers worldwide
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end">
            <img 
              src="public/lovable-uploads/c14281d7-75ce-448f-928b-209e3372a7aa.png" 
              alt="Modern Architecture" 
              className="w-full max-w-lg h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
