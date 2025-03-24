
import React from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the project interface
interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lastModified: string;
}

interface ProjectListProps {
  projects: Project[];
  viewType: 'grid' | 'list';
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, viewType }) => {
  if (viewType === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <Link to={`/project/${project.id}`} className="block">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="h-40 w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-base text-gray-900">{project.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100">
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
                      <button className="w-full text-left">
                        Delete
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{project.description}</p>
              <div className="text-xs text-gray-500">{project.lastModified}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {projects.map((project) => (
          <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="h-12 w-12 rounded object-cover mr-4"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-base text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 truncate">{project.description}</p>
              </div>
              <div className="flex items-center ml-4">
                <div className="text-sm text-gray-500 mr-4">{project.lastModified}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100">
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
                      <button className="w-full text-left">
                        Delete
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
