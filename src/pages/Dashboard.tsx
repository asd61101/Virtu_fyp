
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { 
  Plus, Search, Home, Folder, Layout, FileText, BarChart4,
  Settings2, HelpCircle, Users, Grid, ListIcon, Edit3, ImageIcon
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
    <div className="flex h-screen bg-[#121212]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A1A1A] border-r border-gray-800 hidden lg:block">
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          <h1 className="text-xl font-bold text-virtuspace-400">Virtuspace</h1>
        </div>
        
        <div className="p-4">
          <Button asChild className="w-full bg-virtuspace-600 hover:bg-virtuspace-700 shadow-sm">
            <Link to="/editor/new" className="flex items-center justify-center">
              <Plus size={16} className="mr-1" />
              New Project
            </Link>
          </Button>
        </div>
        
        <div className="px-3 py-2">
          <Input 
            placeholder="Search..." 
            className="bg-[#252525] border-gray-700 text-gray-300 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <nav className="mt-4">
          <div className="px-3 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main
            </p>
          </div>
          
          <div>
            <Link 
              to="/dashboard" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "dashboard" 
                  ? "bg-[#252525] text-virtuspace-400" 
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-300"
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
                  ? "bg-[#252525] text-virtuspace-400" 
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-300"
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
                  ? "bg-[#252525] text-virtuspace-400" 
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-300"
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
                  ? "bg-[#252525] text-virtuspace-400" 
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-300"
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
                  ? "bg-[#252525] text-virtuspace-400" 
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-300"
              }`}
              onClick={() => setActiveSidebar("analytics")}
            >
              <BarChart4 className="mr-3 h-5 w-5" />
              Analytics
            </Link>
          </div>
          
          <div className="mt-6">
            <div className="px-3 pb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Settings
              </p>
            </div>
            
            <Link 
              to="/team" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mx-2 ${
                activeSidebar === "team" 
                  ? "bg-[#252525] text-virtuspace-400" 
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-300"
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
                  ? "bg-[#252525] text-virtuspace-400" 
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-300"
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
                  ? "bg-[#252525] text-virtuspace-400" 
                  : "text-gray-400 hover:bg-[#252525] hover:text-gray-300"
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
        <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8 bg-[#121212]">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-10">
              <h1 className="text-3xl font-semibold text-white mb-2">Welcome, John</h1>
              <p className="text-gray-400">Where do you want to start?</p>
            </div>
            
            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6 hover:border-gray-700 transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-600/20 flex items-center justify-center">
                      <Plus className="h-5 w-5 text-virtuspace-400" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-white">Generate plan</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Generate a plan from defined constraints</p>
                </div>
              </div>
              
              <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6 hover:border-gray-700 transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-600/20 flex items-center justify-center">
                      <Edit3 className="h-5 w-5 text-virtuspace-400" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-white">Edit plan</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Upload and edit an existing plan</p>
                </div>
              </div>
              
              <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6 hover:border-gray-700 transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-600/20 flex items-center justify-center">
                      <Layout className="h-5 w-5 text-virtuspace-400" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-white">Render</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Upload a sketch or an image and turn it into a rendering</p>
                </div>
              </div>
              
              <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6 hover:border-gray-700 transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-600/20 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-virtuspace-400" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-white">Generate image</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Explore interior/exterior design styles</p>
                </div>
              </div>
            </div>
            
            {/* Projects section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Projects</h2>
                
                <div className="flex space-x-2">
                  <Button 
                    variant={view === "grid" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setView("grid")}
                    className={view === "grid" ? "bg-virtuspace-600 hover:bg-virtuspace-700" : "border-gray-700 text-gray-300"}
                  >
                    <Grid size={16} className="mr-1" />
                    Grid
                  </Button>
                  <Button 
                    variant={view === "list" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setView("list")}
                    className={view === "list" ? "bg-virtuspace-600 hover:bg-virtuspace-700" : "border-gray-700 text-gray-300"}
                  >
                    <ListIcon size={16} className="mr-1" />
                    List
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg aspect-square flex items-center justify-center hover:border-gray-700 transition-all cursor-pointer group">
                  <div className="text-gray-500 group-hover:text-virtuspace-400 transition-colors">
                    <Plus size={30} />
                    <p className="mt-2 text-sm font-medium">New Project</p>
                  </div>
                </div>
                {filteredProjects.length > 0 ? (
                  <ProjectList projects={filteredProjects} viewType={view} />
                ) : (
                  <div className="text-center py-12 col-span-2">
                    <div className="mx-auto w-14 h-14 bg-[#252525] rounded-full flex items-center justify-center mb-4">
                      <Search size={22} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">No projects found</h3>
                    <p className="text-gray-400 mt-2">
                      {searchQuery ? 
                        `No results found for "${searchQuery}"` : 
                        "Create your first project to get started"
                      }
                    </p>
                    {!searchQuery && (
                      <Button asChild className="mt-6 bg-virtuspace-600 hover:bg-virtuspace-700">
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
