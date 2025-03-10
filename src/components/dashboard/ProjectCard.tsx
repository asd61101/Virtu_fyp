
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Share2, Folder } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  type: 'residential' | 'commercial' | 'interior' | 'landscape';
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'residential':
        return 'bg-blue-100 text-blue-700';
      case 'commercial':
        return 'bg-green-100 text-green-700';
      case 'interior':
        return 'bg-purple-100 text-purple-700';
      case 'landscape':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-200 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/project/${project.id}`} className="block aspect-video overflow-hidden bg-gray-100">
          {project.thumbnail ? (
            <img 
              src={project.thumbnail} 
              alt={project.name} 
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              style={{ 
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.5s ease-in-out'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Folder className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </Link>
        
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={`/project/${project.id}`} className="flex items-center w-full">
                  <Edit2 className="mr-2 h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onSelect={() => onDelete(project.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg text-gray-900 mb-1 line-clamp-1">{project.name}</h3>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(project.type)}`}>
            {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{project.description}</p>
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Updated {formatDate(project.updatedAt)}
          </div>
          <Button asChild variant="ghost" size="sm" className="text-virtuspace-500 hover:text-virtuspace-600 hover:bg-virtuspace-50">
            <Link to={`/project/${project.id}`}>
              Open Project
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
