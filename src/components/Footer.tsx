
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-virtuspace-700">VIRTUSPACE</span>
              <span className="ml-2 text-sm font-light text-gray-500">ARCHITECTURE</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Create stunning architectural designs with our intuitive platform. Virtuspace Architecture empowers architects and designers with powerful yet simple tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Gallery</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Support Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Virtuspace Architecture. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-500 hover:text-virtuspace-500 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-virtuspace-500 text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-virtuspace-500 text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
