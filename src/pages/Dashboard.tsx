
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { 
  Plus, Search, Home, Folder, Layout, FileText, BarChart4,
  Settings2, HelpCircle, Users, Grid, ListIcon, Edit3, ImageIcon,
  Calculator
} from "lucide-react";
import ProjectList from "@/components/dashboard/ProjectList";

// Mock projects data
const mockProjects = [
  {
    id: "1",
    title: "Modern Villa Design",
    description: "A spacious modern villa with an open floor plan",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    lastModified: "2 days ago",
  },
  {
    id: "2",
    title: "Urban Apartment Layout",
    description: "Compact urban apartment design with efficient space usage",
    thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    lastModified: "1 week ago",
  },
  {
    id: "3",
    title: "Commercial Office Space",
    description: "Modern office layout with collaborative spaces",
    thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    lastModified: "2 weeks ago",
  },
  {
    id: "4",
    title: "Restaurant Floor Plan",
    description: "Elegant restaurant layout with bar and outdoor seating",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    lastModified: "1 month ago",
  },
];

const Dashboard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSidebar, setActiveSidebar] = useState("dashboard");

  // Filter projects based on search query
  const filteredProjects = mockProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden lg:block">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-virtuspace-500">Virtuspace</h1>
        </div>
        
        <div className="p-4">
          <Button asChild className="w-full bg-virtuspace-500 hover:bg-virtuspace-600 shadow-sm">
            <Link to="/editor/new" className="flex items-center justify-center">
              <Plus size={16} className="mr-1" />
              New Project
            </Link>
          </Button>
        </div>
        
        <div className="px-3 py-2">
          <Input 
            placeholder="Search..." 
            className="bg-gray-50 border-gray-200 text-gray-700 placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <nav className="mt-4">
          <div className="px-3 pb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </p>
          </div>
          
          <div>
            <Link 
              to="/dashboard" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "dashboard" 
                  ? "bg-virtuspace-50 text-virtuspace-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setActiveSidebar("dashboard")}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            
            <Link 
              to="/projects" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "projects" 
                  ? "bg-virtuspace-50 text-virtuspace-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setActiveSidebar("projects")}
            >
              <Folder className="mr-3 h-5 w-5" />
              Projects
            </Link>
            
            <Link 
              to="/templates" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "templates" 
                  ? "bg-virtuspace-50 text-virtuspace-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setActiveSidebar("templates")}
            >
              <Layout className="mr-3 h-5 w-5" />
              Templates
            </Link>
            
            <Link 
              to="/documents" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "documents" 
                  ? "bg-virtuspace-50 text-virtuspace-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setActiveSidebar("documents")}
            >
              <FileText className="mr-3 h-5 w-5" />
              Documents
            </Link>
            
            <Link 
              to="/analytics" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "analytics" 
                  ? "bg-virtuspace-50 text-virtuspace-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setActiveSidebar("analytics")}
            >
              <BarChart4 className="mr-3 h-5 w-5" />
              Analytics
            </Link>
          </div>
          
          <div className="mt-6">
            <div className="px-3 pb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Settings
              </p>
            </div>
            
            <Link 
              to="/team" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "team" 
                  ? "bg-virtuspace-50 text-virtuspace-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setActiveSidebar("team")}
            >
              <Users className="mr-3 h-5 w-5" />
              Team
            </Link>
            
            <Link 
              to="/settings" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "settings" 
                  ? "bg-virtuspace-50 text-virtuspace-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setActiveSidebar("settings")}
            >
              <Settings2 className="mr-3 h-5 w-5" />
              Settings
            </Link>
            
            <Link 
              to="/help" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "help" 
                  ? "bg-virtuspace-50 text-virtuspace-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setActiveSidebar("help")}
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              Help & Support
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNav />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">Welcome, John</h1>
              <p className="text-gray-600">Where do you want to start?</p>
            </div>
            
            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-cols-5 gap-4 mb-8">
              <Link to="/ai-floorplanning" className="bg-white rounded-lg border border-gray-200 p-4 hover:border-virtuspace-300 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-100 flex items-center justify-center">
                      <Plus className="h-5 w-5 text-virtuspace-600" />
                    </div>
                    <h3 className="ml-3 text-base font-medium text-gray-900">AI Floorplanning</h3>
                  </div>
                  <p className="text-xs text-gray-600">Generate a plan from defined constraints</p>
                </div>
              </Link>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-virtuspace-300 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-100 flex items-center justify-center">
                      <Edit3 className="h-5 w-5 text-virtuspace-600" />
                    </div>
                    <h3 className="ml-3 text-base font-medium text-gray-900">Edit plan</h3>
                  </div>
                  <p className="text-xs text-gray-600">Upload and edit an existing plan</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-virtuspace-300 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-100 flex items-center justify-center">
                      <Layout className="h-5 w-5 text-virtuspace-600" />
                    </div>
                    <h3 className="ml-3 text-base font-medium text-gray-900">Render</h3>
                  </div>
                  <p className="text-xs text-gray-600">Upload a sketch or an image and turn it into a rendering</p>
                </div>
              </div>
              
              <Link to="/360-walkthrough" className="bg-white rounded-lg border border-gray-200 p-4 hover:border-virtuspace-300 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-100 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-virtuspace-600" />
                    </div>
                    <h3 className="ml-3 text-base font-medium text-gray-900">360° Walkthrough</h3>
                  </div>
                  <p className="text-xs text-gray-600">Explore interior/exterior design styles</p>
                </div>
              </Link>
              
              <Link to="/cost-estimation" className="bg-white rounded-lg border border-gray-200 p-4 hover:border-virtuspace-300 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-100 flex items-center justify-center">
                      <Calculator className="h-5 w-5 text-virtuspace-600" />
                    </div>
                    <h3 className="ml-3 text-base font-medium text-gray-900">Cost Estimation</h3>
                  </div>
                  <p className="text-xs text-gray-600">Calculate project costs and material estimates</p>
                </div>
              </Link>
            </div>
            
            {/* Projects section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                
                <div className="flex space-x-2">
                  <Button 
                    variant={view === "grid" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setView("grid")}
                    className={view === "grid" ? "bg-virtuspace-500 hover:bg-virtuspace-600" : "border-gray-300 text-gray-700"}
                  >
                    <Grid size={16} className="mr-1" />
                    Grid
                  </Button>
                  <Button 
                    variant={view === "list" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setView("list")}
                    className={view === "list" ? "bg-virtuspace-500 hover:bg-virtuspace-600" : "border-gray-300 text-gray-700"}
                  >
                    <ListIcon size={16} className="mr-1" />
                    List
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg h-[258px] flex items-center justify-center hover:border-virtuspace-300 hover:shadow-md transition-all cursor-pointer group">
                  <div className="text-gray-500 group-hover:text-virtuspace-500 transition-colors">
                    <Plus size={24} />
                    <p className="mt-2 text-sm font-medium">New Project</p>
                  </div>
                </div>
                {filteredProjects.length > 0 ? (
                  <div className="col-span-1 sm:col-span-3 lg:col-span-3">
                    <ProjectList projects={filteredProjects} viewType={view} />
                  </div>
                ) : (
                  <div className="text-center py-10 col-span-3">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Search size={20} className="text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                    <p className="text-gray-600 mt-1 text-sm">
                      {searchQuery ? 
                        `No results found for "${searchQuery}"` : 
                        "Create your first project to get started"
                      }
                    </p>
                    {!searchQuery && (
                      <Button asChild className="mt-4 bg-virtuspace-500 hover:bg-virtuspace-600">
                        <Link to="/editor/new">
                          <Plus size={16} className="mr-1" />
                          Create Project
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
