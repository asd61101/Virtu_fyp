
import { useState } from 'react';
import { PlusCircle, Search, Filter, Grid, List as ListIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectCard, { Project } from './ProjectCard';
import { useToast } from "@/hooks/use-toast";

// Sample project data
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Modern Villa Project',
    description: 'A luxury villa with minimalist design and open floor plan',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=80',
    createdAt: '2023-01-15T09:00:00Z',
    updatedAt: '2023-05-10T14:30:00Z',
    type: 'residential',
  },
  {
    id: '2',
    name: 'City Office Renovation',
    description: 'Modern office space redesign for a tech company',
    thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2301&q=80',
    createdAt: '2023-02-20T10:15:00Z',
    updatedAt: '2023-04-25T16:45:00Z',
    type: 'commercial',
  },
  {
    id: '3',
    name: 'Minimalist Apartment Interior',
    description: 'Contemporary interior design for a downtown apartment',
    thumbnail: 'https://images.unsplash.com/photo-1616137356540-a35c05d9a533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80',
    createdAt: '2023-03-05T13:20:00Z',
    updatedAt: '2023-05-01T09:10:00Z',
    type: 'interior',
  },
  {
    id: '4',
    name: 'Urban Garden Design',
    description: 'Rooftop garden with sustainable features and seating areas',
    thumbnail: 'https://images.unsplash.com/photo-1598901242820-9e369b54122b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    createdAt: '2023-04-10T16:40:00Z',
    updatedAt: '2023-05-05T11:25:00Z',
    type: 'landscape',
  },
  {
    id: '5',
    name: 'Beach House Concept',
    description: 'Oceanfront property with sustainable materials and panoramic views',
    thumbnail: 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    createdAt: '2023-01-05T08:30:00Z',
    updatedAt: '2023-03-20T15:15:00Z',
    type: 'residential',
  },
  {
    id: '6',
    name: 'Restaurant Interior',
    description: 'Fine dining restaurant with warm ambiance and custom furniture',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    createdAt: '2023-02-15T11:45:00Z',
    updatedAt: '2023-04-12T13:50:00Z',
    type: 'interior',
  },
];

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const handleCreateNewProject = () => {
    const newProject: Project = {
      id: String(projects.length + 1),
      name: 'New Project',
      description: 'Start working on your new architectural design',
      thumbnail: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: 'residential',
    };
    
    setProjects([newProject, ...projects]);
    
    toast({
      title: "Project created",
      description: "Your new project has been created successfully",
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    
    toast({
      title: "Project deleted",
      description: "Your project has been deleted successfully",
    });
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm flex">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-virtuspace-500' : 'text-gray-500'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-virtuspace-500' : 'text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              <ListIcon className="h-5 w-5" />
            </button>
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
          
          <Button className="bg-virtuspace-500 hover:bg-virtuspace-600" onClick={handleCreateNewProject}>
            <PlusCircle className="h-5 w-5 mr-2" />
            New Project
          </Button>
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No projects found</h3>
          <p className="text-gray-500 mb-4">We couldn't find any projects matching your search criteria.</p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
        }>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDelete={handleDeleteProject} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
