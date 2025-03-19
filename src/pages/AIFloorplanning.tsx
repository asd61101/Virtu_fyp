
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MousePointerClick, Cpu, LayoutGrid, PanelLeft, Zap, Play } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AIFloorplanning = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Revolutionize Your <span className="text-virtuspace-600">Floor Planning</span> with AI
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Design perfect floor plans in minutes, not hours. Our AI-powered tool understands spatial relationships, optimizes for flow, and makes suggestions based on your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-virtuspace-500 hover:bg-virtuspace-600">
                  <Link to="/floor-plan-generator">Try AI Floorplanning Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1574691250077-03a929faece5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="AI Floor Planning Visualization" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  console.log("Image failed to load, falling back to default");
                }}
              />
            </div>
          </div>
        </section>
        
        {/* Demo Video Section */}
        <section id="demo" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Watch AI Floorplanning in Action</h2>
              <p className="text-lg text-gray-600">
                See how our AI transforms simple requirements into detailed, optimized floor plans in minutes
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-xl aspect-video relative">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white bg-black bg-opacity-30 opacity-100 hover:opacity-0 transition-opacity">
                <div className="bg-virtuspace-600/80 rounded-full w-20 h-20 flex items-center justify-center cursor-pointer hover:bg-virtuspace-700/80 transition-colors">
                  <Play className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-virtuspace-500 hover:bg-virtuspace-600">
                <Link to="/floor-plan-generator">Create Your Own AI Floor Plan</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How AI Floorplanning Works</h2>
              <p className="text-lg text-gray-600">
                Our AI-powered floor planning tool makes designing your space simpler than ever before
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-6">
                  <MousePointerClick className="h-6 w-6 text-virtuspace-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">1. Input Your Requirements</h3>
                <p className="text-gray-600">Tell our AI what you need - room dimensions, number of rooms, or specific requirements for your space.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-6">
                  <Cpu className="h-6 w-6 text-virtuspace-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">2. AI Generated Options</h3>
                <p className="text-gray-600">Our AI analyzes thousands of floor plans and generates multiple optimized layouts for your specific needs.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-6">
                  <LayoutGrid className="h-6 w-6 text-virtuspace-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">3. Customize & Finalize</h3>
                <p className="text-gray-600">Fine-tune your preferred design with our easy editor and export production-ready floor plans.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-virtuspace-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Floorplanning Features</h2>
              <p className="text-lg text-gray-600">
                Explore the powerful features that make our AI floor planning tool the choice of professionals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Zap className="h-8 w-8 text-virtuspace-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Floor Plan Generation</h3>
                    <p className="text-gray-600">Generate complete floor plans in seconds based on your room requirements and preferences.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="mr-4">
                    <PanelLeft className="h-8 w-8 text-virtuspace-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Smart Space Optimization</h3>
                    <p className="text-gray-600">AI analyzes spatial relationships to maximize usable space and improve flow throughout your design.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Cpu className="h-8 w-8 text-virtuspace-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Multiple Design Variations</h3>
                    <p className="text-gray-600">Explore different floor plan options for the same space to find the perfect layout for your needs.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="mr-4">
                    <LayoutGrid className="h-8 w-8 text-virtuspace-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Professional Export Options</h3>
                    <p className="text-gray-600">Export your floor plans in multiple formats suitable for professional use, including CAD and PDF.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-virtuspace-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of architects and designers who use our AI Floorplanning tool to create stunning, functional spaces in minutes.
            </p>
            <Button asChild size="lg" className="bg-white text-virtuspace-600 hover:bg-gray-100">
              <Link to="/floor-plan-generator" className="px-8">Start Your Free Trial Today</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIFloorplanning;
