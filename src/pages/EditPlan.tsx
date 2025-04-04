
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, Upload, Save, Download, Undo, Redo, 
  Move, Square, Circle, PanelLeft, X, ZoomIn, ZoomOut, 
  Grid as GridIcon, Maximize, Trash2, Copy, Rotate3d, Layers, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const EditPlan = () => {
  const navigate = useNavigate();
  const { planId } = useParams();
  const [activeTab, setActiveTab] = useState("elements");
  const [showSidebar, setShowSidebar] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canUpload, setCanUpload] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeTool, setActiveTool] = useState<"select" | "wall" | "door" | "window" | "room">("select");
  const [zoom, setZoom] = useState<number>(100);
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({
    "Rooms": true,
    "Doors & Windows": false,
    "Furniture": false
  });
  
  const tools = [
    { id: "select", name: "Select", icon: Move, description: "Select and move objects" },
    { id: "wall", name: "Wall", icon: Square, description: "Draw walls" },
    { id: "door", name: "Door", icon: Circle, description: "Add doors" },
    { id: "window", name: "Window", icon: Circle, description: "Add windows" },
    { id: "room", name: "Room", icon: Square, description: "Create a room" },
  ];

  const elements = [
    { 
      category: "Rooms", 
      items: [
        { name: "Living Room", description: "Open space for relaxation and entertainment" },
        { name: "Bedroom", description: "Private space for sleeping and relaxation" }, 
        { name: "Kitchen", description: "Space for cooking and food preparation" }, 
        { name: "Bathroom", description: "Sanitary facilities and personal hygiene" }, 
        { name: "Dining Room", description: "Dedicated area for meals" }
      ] 
    },
    { 
      category: "Doors & Windows", 
      items: [
        { name: "Single Door", description: "Standard entry point" }, 
        { name: "Double Door", description: "Wide entry point for larger spaces" }, 
        { name: "Sliding Door", description: "Space-saving door that slides open" }, 
        { name: "Window", description: "Standard window for light and ventilation" }, 
        { name: "French Window", description: "Floor-to-ceiling window design" }
      ] 
    },
    { 
      category: "Furniture", 
      items: [
        { name: "Sofa", description: "Comfortable seating for living areas" }, 
        { name: "Bed", description: "Sleeping furniture for bedrooms" }, 
        { name: "Table", description: "Surface for various activities" }, 
        { name: "Chair", description: "Seating furniture" }, 
        { name: "Cabinet", description: "Storage furniture with doors or drawers" }
      ] 
    },
  ];

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

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validFormats = ["image/jpeg", "image/png", "application/pdf"];
    if (!validFormats.includes(file.type)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a JPG, PNG, or PDF file.",
        variant: "destructive",
      });
      return;
    }

    // Process file upload
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // In a real app, you'd process the file here
        toast({
          title: "Floor plan uploaded",
          description: `Successfully uploaded ${file.name}`,
        });
        setCanUpload(false);
        // Add to history
        addToHistory("upload");
      }
    };
    reader.readAsDataURL(file);
  };

  const addToHistory = (action: string) => {
    // In a real app, we'd store the actual state of the canvas
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(action);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      toast({
        title: "Undo",
        description: "Last action undone",
      });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      toast({
        title: "Redo",
        description: "Action redone",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Plan saved",
      description: "Your floor plan has been saved successfully",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting plan",
      description: "Your floor plan is being prepared for download",
    });
    // In a real app, this would generate and download the file
    setTimeout(() => {
      const link = document.createElement('a');
      // This would be a real URL in production
      link.href = '#';
      link.download = `floor-plan-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  const toggleCategory = (category: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  useEffect(() => {
    // Initialize canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        if (snapToGrid) {
          ctx.strokeStyle = '#e5e7eb';
          ctx.lineWidth = 1;
          
          for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }
          
          for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }
        }
      }
    }
  }, [gridSize, snapToGrid]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-4"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-virtuspace-700">
              {planId ? "Edit Floor Plan" : "New Floor Plan"}
            </h1>
            <p className="text-sm text-gray-500">Design your space with precision</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="border-gray-200 text-gray-700"
            >
              <Undo className="h-4 w-4 mr-1" />
              Undo
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="border-gray-200 text-gray-700"
            >
              <Redo className="h-4 w-4 mr-1" />
              Redo
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSave}
            className="border-gray-200 text-gray-700"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="border-gray-200 text-gray-700"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          {canUpload && (
            <Button 
              size="sm" 
              className="bg-virtuspace-500 hover:bg-virtuspace-600"
              onClick={handleUpload}
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload Plan
            </Button>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
          />
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-1">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-9 gap-1", 
                activeTool === tool.id ? 'bg-virtuspace-500 hover:bg-virtuspace-600 text-white' : 'border-gray-200'
              )}
              onClick={() => setActiveTool(tool.id as any)}
              title={tool.description}
            >
              <tool.icon className="h-4 w-4" />
              <span>{tool.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-gray-200"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-700">{zoom}%</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-gray-200"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-gray-200"
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 p-3">
              <h2 className="font-medium text-virtuspace-700">Editor Tools</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setShowSidebar(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 p-2 bg-gray-50">
                <TabsTrigger value="elements" className="text-sm">Elements</TabsTrigger>
                <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="elements" className="flex-1 overflow-y-auto p-3 space-y-5">
                <div className="space-y-4">
                  {elements.map((category) => (
                    <Collapsible 
                      key={category.category} 
                      open={isExpanded[category.category]} 
                      onOpenChange={() => toggleCategory(category.category)}
                      className="border border-gray-100 rounded-md overflow-hidden"
                    >
                      <CollapsibleTrigger asChild>
                        <div className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100">
                          <h3 className="font-medium text-sm text-virtuspace-700">{category.category}</h3>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ChevronIcon isOpen={isExpanded[category.category]} />
                          </Button>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="bg-white">
                        <div className="p-1">
                          {category.items.map((item) => (
                            <button
                              key={item.name}
                              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center text-sm group"
                              onClick={() => {
                                toast({
                                  title: `Added ${item.name}`,
                                  description: `Drag to position the ${item.name.toLowerCase()} on your floor plan`,
                                });
                                addToHistory(`add-${item.name}`);
                              }}
                            >
                              <div className="mr-2 h-6 w-6 bg-gray-100 rounded-md flex items-center justify-center">
                                <div className="h-3 w-3 bg-virtuspace-300 rounded-sm"></div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{item.name}</div>
                                <div className="text-xs text-gray-500 hidden group-hover:block">{item.description}</div>
                              </div>
                              <div className="ml-auto opacity-0 group-hover:opacity-100">
                                <Copy className="h-3.5 w-3.5 text-gray-400" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="settings" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h3 className="font-medium mb-3 text-virtuspace-700 text-sm">Grid Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="snap-grid" className="text-sm">Snap to Grid</Label>
                        <input
                          id="snap-grid"
                          type="checkbox"
                          checked={snapToGrid}
                          onChange={(e) => setSnapToGrid(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-virtuspace-600 focus:ring-virtuspace-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="grid-size" className="text-sm">Grid Size</Label>
                          <span className="text-xs text-gray-500">{gridSize}px</span>
                        </div>
                        <Slider
                          id="grid-size"
                          min={5}
                          max={50}
                          step={5}
                          value={[gridSize]}
                          onValueChange={(value) => setGridSize(value[0])}
                          disabled={!snapToGrid}
                          className="py-2"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h3 className="font-medium mb-3 text-virtuspace-700 text-sm">Canvas Settings</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="canvas-width" className="text-sm">Canvas Width (px)</Label>
                        <Input id="canvas-width" type="number" defaultValue="1200" className="h-9 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="canvas-height" className="text-sm">Canvas Height (px)</Label>
                        <Input id="canvas-height" type="number" defaultValue="800" className="h-9 text-sm" />
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full text-sm h-9 border-gray-200"
                        onClick={() => {
                          toast({
                            title: "Canvas resized",
                            description: "Canvas dimensions have been updated",
                          });
                        }}
                      >
                        Apply Changes
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h3 className="font-medium mb-3 text-virtuspace-700 text-sm">View Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-dimensions" className="text-sm">Show Dimensions</Label>
                        <input
                          id="show-dimensions"
                          type="checkbox"
                          defaultChecked={true}
                          className="h-4 w-4 rounded border-gray-300 text-virtuspace-600 focus:ring-virtuspace-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-ruler" className="text-sm">Show Ruler</Label>
                        <input
                          id="show-ruler"
                          type="checkbox"
                          defaultChecked={true}
                          className="h-4 w-4 rounded border-gray-300 text-virtuspace-600 focus:ring-virtuspace-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-guides" className="text-sm">Show Guides</Label>
                        <input
                          id="show-guides"
                          type="checkbox"
                          defaultChecked={false}
                          className="h-4 w-4 rounded border-gray-300 text-virtuspace-600 focus:ring-virtuspace-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-auto bg-gray-100" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(243, 244, 246, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(243, 244, 246, 1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
          {!showSidebar && (
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 left-4 z-10 bg-white shadow-sm"
              onClick={() => setShowSidebar(true)}
            >
              <PanelLeft className="h-4 w-4 mr-1" />
              Show Tools
            </Button>
          )}
          
          <div className="flex items-center justify-center h-full p-8">
            {canUpload ? (
              <div className="text-center p-8 bg-white rounded-xl border-2 border-dashed border-gray-300 max-w-md shadow-sm hover:border-virtuspace-400 transition-colors">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-virtuspace-50 mb-4">
                  <Upload className="h-8 w-8 text-virtuspace-500" />
                </div>
                <h3 className="text-lg font-medium text-virtuspace-700">Start Your Floor Plan</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                  Upload a JPG, PNG, or PDF file to start editing, or create a new floor plan from scratch
                </p>
                <div className="mt-6 flex flex-col space-y-3">
                  <Button onClick={handleUpload} className="bg-virtuspace-500 hover:bg-virtuspace-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Existing Plan
                  </Button>
                  <Button variant="outline" onClick={() => setCanUpload(false)} className="border-gray-200">
                    <Square className="h-4 w-4 mr-2" />
                    Create New Plan
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                <div className="absolute top-2 left-2 bg-white rounded-md shadow-sm border border-gray-200 p-1 flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Layers className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Rotate3d className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
                <canvas 
                  ref={canvasRef} 
                  width={1200} 
                  height={800}
                  className="border border-gray-200 bg-white"
                  style={{ 
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'center center'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Chevron icon that rotates based on expanded state
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

export default EditPlan;
