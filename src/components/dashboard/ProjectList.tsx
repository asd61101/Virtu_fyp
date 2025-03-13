
import { useState } from 'react';
import ProjectCard, { Project } from './ProjectCard';
import { useToast } from "@/hooks/use-toast";

interface ProjectListProps {
  projects?: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    lastModified: string;
  }[];
  viewType?: 'grid' | 'list';
}

const ProjectList = ({ projects: externalProjects, viewType: externalViewType }: ProjectListProps = {}) => {
  const sampleProjects: Project[] = [
    {
      id: '1',
      name: 'Modern Villa Project',
      description: 'A luxury villa with minimalist design and open floor plan',
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      createdAt: '2023-01-15T09:00:00Z',
      updatedAt: '2023-05-10T14:30:00Z',
      type: 'residential',
    },
    {
      id: '2',
      name: 'City Office Renovation',
      description: 'Modern office space redesign for a tech company',
      thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      createdAt: '2023-02-20T10:15:00Z',
      updatedAt: '2023-04-25T16:45:00Z',
      type: 'commercial',
    },
    {
      id: '3',
      name: 'Minimalist Apartment Interior',
      description: 'Contemporary interior design for a downtown apartment',
      thumbnail: 'https://images.unsplash.com/photo-1616137356540-a35c05d9a533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      createdAt: '2023-03-05T13:20:00Z',
      updatedAt: '2023-05-01T09:10:00Z',
      type: 'interior',
    },
    {
      id: '4',
      name: 'Urban Garden Design',
      description: 'Rooftop garden with sustainable features and seating areas',
      thumbnail: 'https://images.unsplash.com/photo-1598901242820-9e369b54122b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      createdAt: '2023-04-10T16:40:00Z',
      updatedAt: '2023-05-05T11:25:00Z',
      type: 'landscape',
    },
    {
      id: '5',
      name: 'Beach House Concept',
      description: 'Oceanfront property with sustainable materials and panoramic views',
      thumbnail: 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      createdAt: '2023-01-05T08:30:00Z',
      updatedAt: '2023-03-20T15:15:00Z',
      type: 'residential',
    },
    {
      id: '6',
      name: 'Restaurant Interior',
      description: 'Fine dining restaurant with warm ambiance and custom furniture',
      thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      createdAt: '2023-02-15T11:45:00Z',
      updatedAt: '2023-04-12T13:50:00Z',
      type: 'interior',
    },
  ];

  const [projects, setProjects] = useState<Project[]>(
    externalProjects 
      ? externalProjects.map(p => ({
          id: p.id,
          name: p.title,
          description: p.description,
          thumbnail: p.thumbnail,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: 'residential',
        }))
      : sampleProjects
  );
  const { toast } = useToast();

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    
    toast({
      title: "Project deleted",
      description: "Your project has been deleted successfully",
      variant: "default",
    });
  };

  const effectiveViewMode = externalViewType || 'grid';

  return (
    <div className={effectiveViewMode === 'grid' 
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in"
      : "space-y-4 animate-fade-in"
    }>
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onDelete={handleDeleteProject} 
        />
      ))}
    </div>
  );
};

export default ProjectList;
