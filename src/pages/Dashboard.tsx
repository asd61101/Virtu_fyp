
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, PenLine, Layout, ImageIcon, Home, Folder, 
  FileText, BarChart4, Settings2, HelpCircle, Users, MoreHorizontal
} from "lucide-react";
import ProjectCard from "@/components/dashboard/ProjectCard";

// Mock projects data
const mockProjects = [
  {
    id: "1",
    name: "Modern Villa Design",
    description: "A spacious modern villa with an open floor plan",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: "2023-09-15T09:00:00Z",
    updatedAt: "2023-09-20T14:30:00Z",
    type: "residential",
  },
  {
    id: "2",
    name: "Urban Apartment Layout",
    description: "Compact urban apartment design with efficient space usage",
    thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: "2023-08-10T11:20:00Z",
    updatedAt: "2023-09-01T16:45:00Z",
    type: "residential",
  },
  {
    id: "3",
    name: "Commercial Office Space",
    description: "Modern office layout with collaborative spaces",
    thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: "2023-07-22T13:15:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
    type: "commercial",
  },
  {
    id: "4",
    name: "Restaurant Floor Plan",
    description: "Elegant restaurant layout with bar and outdoor seating",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    createdAt: "2023-06-15T15:45:00Z",
    updatedAt: "2023-07-10T09:20:00Z",
    type: "restaurant",
  },
];

const Dashboard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on search query
  const filteredProjects = mockProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProject = (id: string) => {
    // In a real app, this would call an API to delete the project
    console.log(`Delete project ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-500">Virtuspace</h1>
        </div>
        
        <div className="p-4">
          <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
            <Link to="/editor/new" className="flex items-center justify-center">
              <Plus size={16} className="mr-2" />
              New Project
            </Link>
          </Button>
        </div>
        
        <div className="px-4 py-2">
          <Input 
            placeholder="Search..." 
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              MAIN
            </p>
          </div>
          
          <Link 
            to="/dashboard" 
            className="flex items-center px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 border-r-4 border-blue-500"
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link 
            to="/projects" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Folder className="mr-3 h-5 w-5" />
            Projects
          </Link>
          
          <Link 
            to="/templates" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Layout className="mr-3 h-5 w-5" />
            Templates
          </Link>
          
          <Link 
            to="/documents" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <FileText className="mr-3 h-5 w-5" />
            Documents
          </Link>
          
          <Link 
            to="/analytics" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <BarChart4 className="mr-3 h-5 w-5" />
            Analytics
          </Link>
          
          <div className="px-4 mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              SETTINGS
            </p>
          </div>
          
          <Link 
            to="/team" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Users className="mr-3 h-5 w-5" />
            Team
          </Link>
          
          <Link 
            to="/settings" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Settings2 className="mr-3 h-5 w-5" />
            Settings
          </Link>
          
          <Link 
            to="/help" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <HelpCircle className="mr-3 h-5 w-5" />
            Help & Support
          </Link>
        </nav>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-end px-4">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <span className="font-medium">JD</span>
              </div>
              <span className="font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900">Welcome, John</h1>
              <p className="text-gray-600 mt-1">Where do you want to start?</p>
            </div>
            
            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <Link to="/ai-floorplanning" className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-4">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">AI Floorplanning</h3>
                </div>
                <p className="text-sm text-gray-600">Generate a plan from defined constraints</p>
              </Link>
              
              <Link to="#" className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-4">
                    <PenLine className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Edit plan</h3>
                </div>
                <p className="text-sm text-gray-600">Upload and edit an existing plan</p>
              </Link>
              
              <Link to="#" className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-4">
                    <Layout className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Render</h3>
                </div>
                <p className="text-sm text-gray-600">Upload a sketch or an image and turn it into a rendering</p>
              </Link>
              
              <Link to="/360-walkthrough" className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-4">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">360° Walkthrough</h3>
                </div>
                <p className="text-sm text-gray-600">Explore interior/exterior design styles</p>
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
                    className={view === "grid" ? "bg-blue-500 hover:bg-blue-600" : ""}
                  >
                    Grid
                  </Button>
                  <Button 
                    variant={view === "list" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setView("list")}
                    className={view === "list" ? "bg-blue-500 hover:bg-blue-600" : ""}
                  >
                    List
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* New Project Card */}
                <Link 
                  to="/editor/new"
                  className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-6 h-64 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">New Project</p>
                </Link>
                
                {/* Project Cards */}
                {filteredProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={{
                      id: project.id,
                      name: project.name,
                      description: project.description,
                      thumbnail: project.thumbnail,
                      createdAt: project.createdAt,
                      updatedAt: project.updatedAt,
                      type: project.type as any
                    }} 
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
