
import { Layout, Layers, Zap, Compass, PanelLeft, MessageSquare } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Layout className="h-8 w-8 text-virtuspace-500" />,
      title: "Intuitive Floor Plans",
      description: "Create precise 2D floor plans with our easy-to-use drag-and-drop editor. No technical knowledge required.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Layers className="h-8 w-8 text-virtuspace-500" />,
      title: "3D Visualization",
      description: "Transform your floor plans into photorealistic 3D models with a single click. Preview your design from any angle.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Zap className="h-8 w-8 text-virtuspace-500" />,
      title: "AI Design Assistant",
      description: "Our AI analyzes your space and suggests optimal furniture arrangements and design improvements.",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <PanelLeft className="h-8 w-8 text-virtuspace-500" />,
      title: "Mood Boards",
      description: "Collect and organize design inspiration with customizable mood boards to visualize your aesthetic.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Compass className="h-8 w-8 text-virtuspace-500" />,
      title: "360° Walkthrough",
      description: "Experience your design in an immersive 360° virtual walkthrough. Share with clients and stakeholders.",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-virtuspace-500" />,
      title: "Collaboration Tools",
      description: "Work together with team members and clients in real-time with comments, notes, and shared access.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Every Designer</h2>
          <p className="text-xl text-gray-600">
            Virtuspace Architecture provides all the tools you need to bring your architectural visions to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card relative p-8 rounded-2xl border border-gray-200 bg-white hover:border-virtuspace-200 transition-all duration-300 animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 h-48 rounded-lg overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="rounded-full bg-virtuspace-50 w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ready to revolutionize your architectural workflow?</h3>
          <a 
            href="/auth?mode=signup" 
            className="inline-flex items-center px-8 py-3 bg-virtuspace-500 text-white rounded-full font-medium hover:bg-virtuspace-600 transition-colors"
          >
            Start Your Free Trial
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
