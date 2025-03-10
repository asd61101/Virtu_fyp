
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, Search, Settings, Bell, LogOut, 
  User, ChevronDown, Grid, List as ListIcon,
  Home, Folder, Layout, PanelLeft
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

  // Filter projects based on search query
  const filteredProjects = mockProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-white border-r border-gray-200 z-20">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-virtuspace-700">Virtuspace</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-5">
          <div className="space-y-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              General
            </p>
            <Link to="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-virtuspace-50 text-virtuspace-700">
              <Home className="mr-3 h-5 w-5 text-virtuspace-500" />
              Dashboard
            </Link>
            <Link to="/projects" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-virtuspace-600">
              <Folder className="mr-3 h-5 w-5 text-gray-400" />
              Projects
            </Link>
            <Link to="/templates" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-virtuspace-600">
              <Layout className="mr-3 h-5 w-5 text-gray-400" />
              Templates
            </Link>
          </div>
          
          <div className="mt-8 space-y-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Settings
            </p>
            <Link to="/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-virtuspace-600">
              <Settings className="mr-3 h-5 w-5 text-gray-400" />
              Settings
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-500 hover:text-virtuspace-600">
              <PanelLeft size={20} />
            </button>
            
            {/* Search bar */}
            <div className="flex-1 max-w-lg mx-auto md:mx-0 md:ml-6 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 border-gray-300 focus:border-virtuspace-500 focus:ring-virtuspace-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-4 ml-4">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <Bell size={20} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-virtuspace-100 flex items-center justify-center">
                      <User size={18} className="text-virtuspace-600" />
                    </div>
                    <span className="hidden md:inline text-sm font-medium">John Doe</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <User size={16} className="mr-2" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings size={16} className="mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 cursor-pointer">
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, John</h1>
                <p className="text-gray-500 mt-1">Here's an overview of your architectural projects</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button asChild className="bg-virtuspace-500 hover:bg-virtuspace-600 shadow-sm">
                  <Link to="/editor/new" className="flex items-center">
                    <Plus size={20} className="mr-2" />
                    New Project
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-r from-blue-50 to-virtuspace-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <Folder className="h-6 w-6 text-virtuspace-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Projects</p>
                    <p className="text-2xl font-semibold text-gray-900">7</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-100">
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
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Team Members</p>
                    <p className="text-2xl font-semibold text-gray-900">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Projects section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
              
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <Button 
                  variant={view === "grid" ? "secondary" : "outline"} 
                  size="icon" 
                  onClick={() => setView("grid")}
                  className="h-9 w-9"
                >
                  <Grid size={18} />
                </Button>
                <Button 
                  variant={view === "list" ? "secondary" : "outline"} 
                  size="icon" 
                  onClick={() => setView("list")}
                  className="h-9 w-9"
                >
                  <ListIcon size={18} />
                </Button>
              </div>
            </div>
            
            {/* Projects list */}
            {filteredProjects.length > 0 ? (
              <ProjectList projects={filteredProjects} viewType={view} />
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                <p className="text-gray-500 mt-2">
                  {searchQuery ? 
                    `No results found for "${searchQuery}"` : 
                    "Create your first project to get started"
                  }
                </p>
                {!searchQuery && (
                  <Button asChild className="mt-6 bg-virtuspace-500 hover:bg-virtuspace-600">
                    <Link to="/editor/new">
                      <Plus size={18} className="mr-1" />
                      Create Project
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
