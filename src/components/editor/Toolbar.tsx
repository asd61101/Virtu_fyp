
import { useState } from 'react';
import { Save, Undo, Redo, ZoomIn, ZoomOut, Maximize, Grid as GridIcon, Layers, Image, Box, Text, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Toolbar = () => {
  const [mode, setMode] = useState<'2d' | '3d'>('2d');
  const [zoom, setZoom] = useState<number>(100);

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(prev => prev + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(prev => prev - 10);
    }
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      {/* Left section - Undo, Redo, View modes */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Redo className="h-4 w-4" />
        </Button>
        
        <div className="border-l border-gray-300 h-6 mx-2" />
        
        {/* 2D/3D Toggle */}
        <div className="flex bg-gray-200 p-1 rounded-md">
          <Button 
            variant="ghost" 
            size="sm" 
            className={mode === '2d' ? "bg-white shadow-sm text-virtuspace-500" : "bg-transparent text-gray-500"} 
            onClick={() => setMode('2d')}
          >
            <GridIcon className="h-4 w-4 mr-1" />
            2D
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={mode === '3d' ? "bg-white shadow-sm text-virtuspace-500" : "bg-transparent text-gray-500"} 
            onClick={() => setMode('3d')}
          >
            <Box className="h-4 w-4 mr-1" />
            3D
          </Button>
        </div>
      </div>
      
      {/* Center section - Add Elements */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-virtuspace-500 hover:bg-virtuspace-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Element</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Box className="h-4 w-4 mr-2" />
              <span>3D Object</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers className="h-4 w-4 mr-2" />
              <span>Wall</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GridIcon className="h-4 w-4 mr-2" />
              <span>Floor</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Image className="h-4 w-4 mr-2" />
              <span>Texture</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text className="h-4 w-4 mr-2" />
              <span>Text Label</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Right section - Zoom controls */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium text-gray-700">{zoom}%</span>
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Maximize className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
