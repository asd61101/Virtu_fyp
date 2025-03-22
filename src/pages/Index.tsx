
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose Virtuspace?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Create stunning architectural designs with our intuitive tools and bring your vision to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtuspace-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface designed for professionals and beginners alike. No steep learning curve.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtuspace-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Professional Tools</h3>
              <p className="text-gray-600">Access to professional-grade architectural tools that meet industry standards.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtuspace-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">3D Visualization</h3>
              <p className="text-gray-600">Turn your 2D plans into stunning 3D visualizations with just a few clicks.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-virtuspace-500 hover:bg-virtuspace-600">
              <Link to={isLoggedIn ? "/dashboard" : "/auth"} className="flex items-center">
                {isLoggedIn ? "Go to Dashboard" : "Get Started Free"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        
        <Features />
        
        <section className="bg-virtuspace-50 py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Ready to Transform Your Architectural Design Process?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of architects and designers who use Virtuspace to bring their visions to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-virtuspace-500 hover:bg-virtuspace-600">
                <Link to={isLoggedIn ? "/dashboard" : "/auth"}>{isLoggedIn ? "Go to Dashboard" : "Try Virtuspace Free"}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
