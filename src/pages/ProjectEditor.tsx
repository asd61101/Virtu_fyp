
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Toolbar from '@/components/editor/Toolbar';

const ProjectEditor = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState(projectId === 'new' ? 'New Project' : 'Project Details');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="text-xl font-semibold border-none focus:outline-none focus:ring-0 p-0 bg-transparent"
            />
          </div>
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-virtuspace-500 hover:bg-virtuspace-600"
        >
          <Save size={18} className="mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </header>
      
      {/* Toolbar */}
      <Toolbar />
      
      {/* Editor Canvas */}
      <div className="flex-1 bg-gray-100 overflow-hidden">
        <div className="w-full h-full editor-canvas flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-xl font-medium">Your design canvas</p>
            <p className="mt-2">Start adding elements from the toolbar above</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;
