
import { useState } from 'react';
import { Save, Undo, Redo, ZoomIn, ZoomOut, Maximize, Grid as GridIcon, Layers, Image, Box, Text, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Toolbar = () => {
  const [mode, setMode] = useState<'2d' | '3d'>('2d');
  
  return (
    <div className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-virtuspace-500">
          <Save className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-virtuspace-500">
          <Undo className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-virtuspace-500">
          <Redo className="h-5 w-5" />
        </Button>
        
        <div className="h-6 border-l border-gray-200 mx-2"></div>
        
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-virtuspace-500">
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-virtuspace-500">
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-virtuspace-500">
          <Maximize className="h-5 w-5" />
        </Button>
        
        <div className="h-6 border-l border-gray-200 mx-2"></div>
        
        <div className="rounded-md bg-gray-100 p-1 flex items-center">
          <Button 
            variant={mode === '2d' ? "default" : "ghost"} 
            size="sm" 
            className={mode === '2d' ? "bg-white shadow-sm text-virtuspace-500" : "bg-transparent text-gray-500"} 
            onClick={() => setMode('2d')}
          >
            <GridIcon className="h-4 w-4 mr-1" />
            2D
          </Button>
          <Button 
            variant={mode === '3d' ? "default" : "ghost"} 
            size="sm" 
            className={mode === '3d' ? "bg-white shadow-sm text-virtuspace-500" : "bg-transparent text-gray-500"} 
            onClick={() => setMode('3d')}
          >
            <Box className="h-4 w-4 mr-1" />
            3D
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
          <Layers className="h-4 w-4 mr-2" />
          Layers
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-gray-700 border-gray-300">
              Insert
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Box className="h-4 w-4 mr-2" />
              <span>3D Object</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text className="h-4 w-4 mr-2" />
              <span>Text</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Image className="h-4 w-4 mr-2" />
              <span>Image</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button className="bg-virtuspace-500 hover:bg-virtuspace-600">
          <Save className="h-4 w-4 mr-2" />
          Save Project
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
