
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-virtuspace-500 transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/#features" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Pricing</Link></li>
              <li><Link to="/gallery" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Gallery</Link></li>
              <li><Link to="/integrations" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Integrations</Link></li>
              <li><Link to="/updates" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Updates</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/documentation" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Documentation</Link></li>
              <li><Link to="/tutorials" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Tutorials</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Blog</Link></li>
              <li><Link to="/support" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Support Center</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-virtuspace-500 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-virtuspace-500 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Virtuspace Architecture. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/privacy" className="text-gray-500 hover:text-virtuspace-500 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-virtuspace-500 text-sm">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-500 hover:text-virtuspace-500 text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
