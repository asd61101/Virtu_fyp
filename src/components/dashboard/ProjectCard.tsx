
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  type: 'residential' | 'commercial' | 'interior' | 'landscape' | 'restaurant';
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/project/${project.id}`}>
          <img 
            src={project.thumbnail} 
            alt={project.name}
            className="h-40 w-full object-cover" 
          />
        </Link>
        
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm hover:bg-gray-50">
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to={`/project/${project.id}`} className="w-full">
                  Open
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`/project/${project.id}/edit`} className="w-full">
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button className="w-full text-left" onClick={() => onDelete(project.id)}>
                  Delete
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 truncate">{project.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
            {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
