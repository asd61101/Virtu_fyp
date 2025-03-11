import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { 
  Plus, Search, Home, Folder, Layout, FileText, BarChart4,
  Settings2, HelpCircle, Users, Grid, ListIcon
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden lg:block">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-virtuspace-600">Virtuspace</h1>
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
            className="bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search size={16} className="text-gray-400" />}
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
                  : "text-gray-700 hover:bg-gray-100"
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
                  : "text-gray-700 hover:bg-gray-100"
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
                  : "text-gray-700 hover:bg-gray-100"
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
                  : "text-gray-700 hover:bg-gray-100"
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
                  : "text-gray-700 hover:bg-gray-100"
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
                  : "text-gray-700 hover:bg-gray-100"
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
                  : "text-gray-700 hover:bg-gray-100"
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
                  : "text-gray-700 hover:bg-gray-100"
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
            {/* Page header section */}
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="px-6 py-5 sm:flex sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Welcome back, John</h1>
                  <p className="mt-1 text-sm text-gray-500">Here's what's happening with your projects today</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button asChild className="bg-virtuspace-600 hover:bg-virtuspace-700 shadow-sm">
                    <Link to="/editor/new" className="flex items-center">
                      <Plus size={16} className="mr-1" />
                      New Project
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Stats cards */}
              <div className="border-t border-gray-200 px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-virtuspace-100 rounded-md p-3">
                        <Folder className="h-6 w-6 text-virtuspace-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Active Projects</p>
                        <p className="text-2xl font-semibold text-gray-900">7</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                        <Layout className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Completed</p>
                        <p className="text-2xl font-semibold text-gray-900">12</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Team Members</p>
                        <p className="text-2xl font-semibold text-gray-900">4</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent projects section */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200 flex flex-wrap items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
                
                <div className="flex space-x-2 mt-3 sm:mt-0">
                  <Button 
                    variant={view === "grid" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setView("grid")}
                    className={view === "grid" ? "bg-virtuspace-600 hover:bg-virtuspace-700" : ""}
                  >
                    <Grid size={16} className="mr-1" />
                    Grid
                  </Button>
                  <Button 
                    variant={view === "list" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setView("list")}
                    className={view === "list" ? "bg-virtuspace-600 hover:bg-virtuspace-700" : ""}
                  >
                    <ListIcon size={16} className="mr-1" />
                    List
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                {filteredProjects.length > 0 ? (
                  <ProjectList projects={filteredProjects} viewType={view} />
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Search size={22} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                    <p className="text-gray-500 mt-2">
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
