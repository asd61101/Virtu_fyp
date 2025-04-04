
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, PenLine, Layout, ImageIcon, Home, Folder, 
  FileText, BarChart4, Settings2, HelpCircle, Users, MoreHorizontal,
  LogOut, User, Bell
} from "lucide-react";
import ProjectCard from "@/components/dashboard/ProjectCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

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

// Mock notifications
const mockNotifications = [
  {
    id: "1",
    title: "Project Updated",
    message: "Your Modern Villa Design project was updated",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "New Comment",
    message: "John Doe commented on your Urban Apartment Layout",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "Team Invitation",
    message: "You've been invited to join the Design Team",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    title: "System Update",
    message: "VirtuSpace has new features available",
    time: "3 days ago",
    read: true,
  },
];

const Dashboard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  // Filter projects based on search query
  const filteredProjects = mockProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProject = (id: string) => {
    // In a real app, this would call an API to delete the project
    console.log(`Delete project ${id}`);
  };

  const handleLogout = () => {
    // In a real app, call an API to logout
    localStorage.removeItem('isLoggedIn');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
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
          
          <button 
            onClick={() => setActiveSection("dashboard")}
            className={`flex w-full items-center px-4 py-2 text-sm font-medium 
            ${activeSection === "dashboard" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveSection("projects")}
            className={`flex w-full items-center px-4 py-2 text-sm font-medium 
            ${activeSection === "projects" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <Folder className="mr-3 h-5 w-5" />
            Projects
          </button>
          
          <button 
            onClick={() => setActiveSection("templates")}
            className={`flex w-full items-center px-4 py-2 text-sm font-medium 
            ${activeSection === "templates" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <Layout className="mr-3 h-5 w-5" />
            Templates
          </button>
          
          <button 
            onClick={() => setActiveSection("analytics")}
            className={`flex w-full items-center px-4 py-2 text-sm font-medium 
            ${activeSection === "analytics" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <BarChart4 className="mr-3 h-5 w-5" />
            Analytics
          </button>
          
          <div className="px-4 mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              USER
            </p>
          </div>
          
          <button 
            onClick={() => setActiveSection("team")}
            className={`flex w-full items-center px-4 py-2 text-sm font-medium 
            ${activeSection === "team" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <Users className="mr-3 h-5 w-5" />
            Team
          </button>
          
          <button 
            onClick={() => setActiveSection("profile")}
            className={`flex w-full items-center px-4 py-2 text-sm font-medium 
            ${activeSection === "profile" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </button>
          
          <button 
            onClick={() => setActiveSection("settings")}
            className={`flex w-full items-center px-4 py-2 text-sm font-medium 
            ${activeSection === "settings" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <Settings2 className="mr-3 h-5 w-5" />
            Settings
          </button>
          
          <button 
            onClick={() => setActiveSection("help")}
            className={`flex w-full items-center px-4 py-2 text-sm font-medium 
            ${activeSection === "help" ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <HelpCircle className="mr-3 h-5 w-5" />
            Help & Support
          </button>
        </nav>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-end px-4">
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-500 hover:text-gray-700 relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {mockNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 flex justify-center border-t border-gray-100">
                  <Button variant="link" className="w-full text-blue-500">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <span className="font-medium">JD</span>
                  </div>
                  <span className="font-medium text-gray-700">John Doe</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveSection("profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSection("settings")}>
                  <Settings2 className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Main Dashboard Section */}
            {activeSection === "dashboard" && (
              <>
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
                  
                  <Link to="/edit-plan" className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
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
              </>
            )}

            {/* Projects Section */}
            {activeSection === "projects" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
                  <Button asChild className="bg-blue-500 hover:bg-blue-600">
                    <Link to="/editor/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Link>
                  </Button>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="grid grid-cols-1 gap-6">
                    {filteredProjects.map(project => (
                      <div key={project.id} className="flex border rounded-lg overflow-hidden">
                        <img src={project.thumbnail} alt={project.name} className="w-32 h-32 object-cover" />
                        <div className="p-4 flex-1">
                          <h3 className="text-lg font-medium">{project.name}</h3>
                          <p className="text-gray-600 text-sm">{project.description}</p>
                          <div className="flex justify-between mt-4">
                            <div className="text-sm text-gray-500">
                              Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Templates Section */}
            {activeSection === "templates" && (
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Design Templates</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                      alt="Modern Home" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium text-lg">Modern Minimalist</h3>
                      <p className="text-gray-600 text-sm">Clean lines and minimal decoration for a contemporary look</p>
                      <Button className="mt-3 w-full bg-blue-500 hover:bg-blue-600">Use Template</Button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                      alt="Traditional Home" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium text-lg">Classic Traditional</h3>
                      <p className="text-gray-600 text-sm">Timeless design with elegant details and warm elements</p>
                      <Button className="mt-3 w-full bg-blue-500 hover:bg-blue-600">Use Template</Button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1613685703305-f09f4ee508f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                      alt="Industrial Style" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium text-lg">Industrial Loft</h3>
                      <p className="text-gray-600 text-sm">Raw materials and exposed elements for an urban feel</p>
                      <Button className="mt-3 w-full bg-blue-500 hover:bg-blue-600">Use Template</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Section */}
            {activeSection === "analytics" && (
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Total Projects</h3>
                    <p className="text-3xl font-bold">24</p>
                    <div className="text-sm text-green-500 mt-2">+12% from last month</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Hours Saved</h3>
                    <p className="text-3xl font-bold">128</p>
                    <div className="text-sm text-green-500 mt-2">+8% from last month</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Team Collaborations</h3>
                    <p className="text-3xl font-bold">7</p>
                    <div className="text-sm text-green-500 mt-2">+2 new collaborations</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-medium mb-4">Project Activity</h3>
                  <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
                    <p className="text-gray-500">Analytics chart will appear here</p>
                  </div>
                </div>
              </div>
            )}

            {/* Team Section */}
            {activeSection === "team" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Team Member
                  </Button>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Active Team Members</h3>
                  </div>
                  <div className="divide-y">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-4">
                          <span className="font-medium">JD</span>
                        </div>
                        <div>
                          <h4 className="font-medium">John Doe</h4>
                          <p className="text-sm text-gray-500">john.doe@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-4">Admin</span>
                        <Button size="sm" variant="ghost">Manage</Button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mr-4">
                          <span className="font-medium">JS</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Jane Smith</h4>
                          <p className="text-sm text-gray-500">jane.smith@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-4">Editor</span>
                        <Button size="sm" variant="ghost">Manage</Button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
                          <span className="font-medium">RJ</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Robert Johnson</h4>
                          <p className="text-sm text-gray-500">robert.johnson@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-4">Viewer</span>
                        <Button size="sm" variant="ghost">Manage</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Section */}
            {activeSection === "profile" && (
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 flex flex-col items-center md:flex-row md:items-start">
                    <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-6 text-4xl font-semibold mb-4 md:mb-0">
                      JD
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">John Doe</h2>
                      <p className="text-gray-600">john.doe@example.com</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div>
                          <h3 className="text-sm text-gray-500 font-medium">Full Name</h3>
                          <p>John Doe</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500 font-medium">Email</h3>
                          <p>john.doe@example.com</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500 font-medium">Phone</h3>
                          <p>+1 (555) 123-4567</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500 font-medium">Location</h3>
                          <p>San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button className="bg-blue-500 hover:bg-blue-600">
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Section */}
            {activeSection === "settings" && (
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="border-b">
                    <div className="p-4">
                      <h3 className="text-lg font-medium">Account Settings</h3>
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="font-medium">Password</h4>
                          <p className="text-sm text-gray-500">Update your password regularly</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Button variant="outline" size="sm">Enable</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Session Management</h3>
                    <Button 
                      variant="destructive" 
                      onClick={handleLogout}
                      className="flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">This will log you out of your current session</p>
                  </div>
                </div>
              </div>
            )}

            {/* Help & Support Section */}
            {activeSection === "help" && (
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Help & Support</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">How do I create a new project?</h4>
                        <p className="text-gray-600 text-sm mt-1">Click the "New Project" button in the sidebar or dashboard to start creating.</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Can I invite others to collaborate?</h4>
                        <p className="text-gray-600 text-sm mt-1">Yes, you can invite team members from the Team section.</p>
                      </div>
                      <div>
                        <h4 className="font-medium">How do I export my designs?</h4>
                        <p className="text-gray-600 text-sm mt-1">Open your project and use the Export option in the top toolbar.</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">View All FAQs</Button>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Contact Support</h3>
                    <p className="text-gray-600 mb-4">Can't find what you're looking for? Our support team is here to help.</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">Contact Support</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
