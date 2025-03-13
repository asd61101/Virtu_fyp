
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Eye, Share2, Layout, Smartphone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Walkthrough360 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Immersive <span className="text-virtuspace-600">360° Walkthroughs</span> of Your Designs
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Transform your architectural designs into interactive 360° experiences. Let clients explore every corner of your space before it's built.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-virtuspace-500 hover:bg-virtuspace-600">
                  <Link to="/auth?mode=signup">Try 360° Walkthrough Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#demo">See Live Demo</a>
                </Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 relative">
              <img 
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="360 Walkthrough Visualization" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-virtuspace-600/80 rounded-full w-20 h-20 flex items-center justify-center cursor-pointer hover:bg-virtuspace-700/80 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Demo Section */}
        <section id="demo" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience Our 360° Walkthrough</h2>
              <p className="text-lg text-gray-600">
                Explore this interactive demo to see how your clients can experience your designs in immersive 360° detail
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-xl aspect-video relative">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <Compass className="h-16 w-16 mx-auto mb-4 text-virtuspace-400" />
                  <p className="text-xl">Interactive 360° Demo</p>
                  <p className="text-sm text-gray-400 mt-2">Click and drag to look around</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-virtuspace-500 hover:bg-virtuspace-600">
                <Link to="/auth?mode=signup">Create Your Own 360° Walkthrough</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-virtuspace-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">360° Walkthrough Features</h2>
              <p className="text-lg text-gray-600">
                Discover the powerful features that make our 360° walkthrough tool indispensable for architects and designers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Eye className="h-8 w-8 text-virtuspace-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Realistic Rendering</h3>
                    <p className="text-gray-600">Photorealistic rendering technology creates immersive environments with accurate lighting, textures, and materials.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Share2 className="h-8 w-8 text-virtuspace-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Sharing</h3>
                    <p className="text-gray-600">Share your 360° walkthroughs instantly with clients via link, email, or embed them directly on your website.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Layout className="h-8 w-8 text-virtuspace-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Interactive Hotspots</h3>
                    <p className="text-gray-600">Add interactive elements that provide additional information or navigation within your 360° walkthrough.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Smartphone className="h-8 w-8 text-virtuspace-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">VR Compatible</h3>
                    <p className="text-gray-600">Experience your designs in virtual reality with compatible headsets for the most immersive walkthrough possible.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-virtuspace-50 p-8 md:p-12 rounded-2xl">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                      alt="Client" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <svg className="h-8 w-8 text-virtuspace-300 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-lg text-gray-700 mb-4">The 360° walkthrough feature has completely transformed how we present designs to clients. They're able to truly understand the space before construction begins, which has significantly reduced revision requests and increased client satisfaction.</p>
                    <div>
                      <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                      <p className="text-gray-600">Principal Architect, Modern Spaces</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-virtuspace-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Give Your Clients the Ultimate Virtual Experience?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of architects and designers who use our 360° Walkthrough tool to bring their designs to life.
            </p>
            <Button asChild size="lg" className="bg-white text-virtuspace-600 hover:bg-gray-100">
              <Link to="/auth?mode=signup" className="px-8">Start Creating Today</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Walkthrough360;
