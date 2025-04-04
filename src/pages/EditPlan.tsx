
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Save, Download, Undo, Redo, Grid, Move, Square, Circle, PanelLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

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
  
  const tools = [
    { id: "select", name: "Select", icon: Move },
    { id: "wall", name: "Wall", icon: Square },
    { id: "door", name: "Door", icon: Circle },
    { id: "window", name: "Window", icon: Circle },
    { id: "room", name: "Room", icon: Square },
  ];

  const elements = [
    { category: "Rooms", items: ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room"] },
    { category: "Doors & Windows", items: ["Single Door", "Double Door", "Sliding Door", "Window", "French Window"] },
    { category: "Furniture", items: ["Sofa", "Bed", "Table", "Chair", "Cabinet"] },
  ];

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
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
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
          <h1 className="text-xl font-semibold">
            {planId ? "Edit Floor Plan" : "New Floor Plan"}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <Undo className="h-4 w-4 mr-1" />
              Undo
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="h-4 w-4 mr-1" />
              Redo
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          {canUpload && (
            <Button 
              size="sm" 
              className="bg-blue-500 hover:bg-blue-600"
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

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="font-medium">Editor Tools</h2>
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
              <TabsList className="grid grid-cols-2 p-2">
                <TabsTrigger value="elements">Elements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="elements" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Tools</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {tools.map((tool) => (
                        <Button
                          key={tool.id}
                          variant={activeTool === tool.id ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center h-20 ${activeTool === tool.id ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                          onClick={() => setActiveTool(tool.id as any)}
                        >
                          <tool.icon className="h-6 w-6 mb-1" />
                          <span className="text-xs">{tool.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {elements.map((category) => (
                    <div key={category.category}>
                      <h3 className="font-medium mb-2">{category.category}</h3>
                      <div className="space-y-2">
                        {category.items.map((item) => (
                          <button
                            key={item}
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
                            onClick={() => {
                              toast({
                                title: `Added ${item}`,
                                description: `Drag to position the ${item.toLowerCase()} on your floor plan`,
                              });
                              addToHistory(`add-${item}`);
                            }}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="settings" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Grid Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="snap-grid">Snap to Grid</Label>
                        <input
                          id="snap-grid"
                          type="checkbox"
                          checked={snapToGrid}
                          onChange={(e) => setSnapToGrid(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="grid-size">Grid Size</Label>
                          <span className="text-sm text-gray-500">{gridSize}px</span>
                        </div>
                        <Slider
                          id="grid-size"
                          min={5}
                          max={50}
                          step={5}
                          value={[gridSize]}
                          onValueChange={(value) => setGridSize(value[0])}
                          disabled={!snapToGrid}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Canvas Settings</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="canvas-width">Canvas Width (px)</Label>
                        <Input id="canvas-width" type="number" defaultValue="1200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="canvas-height">Canvas Height (px)</Label>
                        <Input id="canvas-height" type="number" defaultValue="800" />
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
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
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-auto p-4 bg-gray-100">
          {!showSidebar && (
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 left-4 z-10 bg-white"
              onClick={() => setShowSidebar(true)}
            >
              <PanelLeft className="h-4 w-4 mr-1" />
              Show Tools
            </Button>
          )}
          
          <div className="flex items-center justify-center h-full">
            {canUpload ? (
              <div className="text-center p-8 bg-white rounded-lg border-2 border-dashed border-gray-300 max-w-md">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Upload a Floor Plan</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Upload a JPG, PNG, or PDF file to start editing
                </p>
                <div className="mt-6">
                  <Button onClick={handleUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Plan
                  </Button>
                </div>
              </div>
            ) : (
              <canvas 
                ref={canvasRef} 
                width={1200} 
                height={800}
                className="border border-gray-300 bg-white shadow-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlan;
