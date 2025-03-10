
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
  User, ChevronDown, Grid, List as ListIcon
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-virtuspace-700">Virtuspace</span>
          </Link>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
            <p className="text-gray-500 mt-1">Manage and create new architectural designs</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-virtuspace-500 hover:bg-virtuspace-600">
              <Link to="/editor/new" className="flex items-center">
                <Plus size={20} className="mr-1" />
                New Project
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-6">
          <div className="w-full sm:max-w-xs relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search projects..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant={view === "grid" ? "secondary" : "outline"} 
              size="icon" 
              onClick={() => setView("grid")}
            >
              <Grid size={18} />
            </Button>
            <Button 
              variant={view === "list" ? "secondary" : "outline"} 
              size="icon" 
              onClick={() => setView("list")}
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
      </main>
    </div>
  );
};

export default Dashboard;
