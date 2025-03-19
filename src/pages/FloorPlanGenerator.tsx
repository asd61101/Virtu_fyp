
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  SquareStack, 
  Users, 
  Home, 
  Sofa, 
  DoorOpen, 
  Bed, 
  ChefHat, 
  Bath, 
  Workflow, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Sample floor plan images
const SAMPLE_FLOOR_PLANS = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Modern Studio Apartment",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1580229040782-63cf3fcc1537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "2-Bedroom Family Home",
  },
];

const FloorPlanGenerator = () => {
  const [squareFootage, setSquareFootage] = useState("1000");
  const [numBedrooms, setNumBedrooms] = useState("2");
  const [numBathrooms, setNumBathrooms] = useState("2");
  const [propertyType, setPropertyType] = useState("apartment");
  const [additionalRooms, setAdditionalRooms] = useState(["living", "kitchen"]);
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFloorPlans, setGeneratedFloorPlans] = useState([]);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);
  const [openAI, setOpenAI] = useState(true);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedFloorPlans(SAMPLE_FLOOR_PLANS);
      toast.success("Floor plans generated successfully!");
    }, 3000);
  };

  const selectFloorPlan = (plan) => {
    setSelectedFloorPlan(plan);
    toast.success("Floor plan selected!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link to="/ai-floorplanning" className="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to AI Floorplanning
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Generate Your Floor Plan</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="square-footage">Square Footage</Label>
                    <Input 
                      id="square-footage" 
                      type="number"
                      value={squareFootage}
                      onChange={(e) => setSquareFootage(e.target.value)}
                      placeholder="e.g. 1000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="property-type">Property Type</Label>
                    <ToggleGroup 
                      type="single" 
                      className="justify-start"
                      value={propertyType}
                      onValueChange={(value) => {
                        if (value) setPropertyType(value);
                      }}
                    >
                      <ToggleGroupItem value="apartment" aria-label="Apartment">
                        <Home className="h-4 w-4 mr-2" />
                        Apartment
                      </ToggleGroupItem>
                      <ToggleGroupItem value="house" aria-label="House">
                        <SquareStack className="h-4 w-4 mr-2" />
                        House
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input 
                        id="bedrooms" 
                        type="number"
                        value={numBedrooms}
                        onChange={(e) => setNumBedrooms(e.target.value)}
                        min="0"
                        max="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input 
                        id="bathrooms" 
                        type="number"
                        value={numBathrooms}
                        onChange={(e) => setNumBathrooms(e.target.value)}
                        min="0"
                        max="10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Additional Rooms</Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "living", label: "Living Room", icon: <Sofa className="h-3 w-3 mr-1" /> },
                        { id: "kitchen", label: "Kitchen", icon: <ChefHat className="h-3 w-3 mr-1" /> },
                        { id: "dining", label: "Dining Room", icon: <Users className="h-3 w-3 mr-1" /> },
                        { id: "office", label: "Home Office", icon: <Home className="h-3 w-3 mr-1" /> },
                      ].map((room) => (
                        <Button
                          key={room.id}
                          type="button"
                          variant={additionalRooms.includes(room.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            if (additionalRooms.includes(room.id)) {
                              setAdditionalRooms(additionalRooms.filter(r => r !== room.id));
                            } else {
                              setAdditionalRooms([...additionalRooms, room.id]);
                            }
                          }}
                          className="flex items-center"
                        >
                          {room.icon} {room.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="special-requirements">Special Requirements</Label>
                    <Textarea 
                      id="special-requirements"
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      placeholder="e.g. Wheelchair access, open kitchen, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Accordion type="single" collapsible>
                    <AccordionItem value="advanced">
                      <AccordionTrigger className="text-sm font-medium">
                        Advanced Options
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="open-ai">Open AI Design</Label>
                              <p className="text-xs text-gray-500">
                                Allows AI to freely design within constraints
                              </p>
                            </div>
                            <Switch 
                              id="open-ai"
                              checked={openAI}
                              onCheckedChange={setOpenAI}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="style-preference">Style Preference</Label>
                            <ToggleGroup 
                              type="single" 
                              className="justify-start"
                              defaultValue="modern"
                            >
                              <ToggleGroupItem value="modern" aria-label="Modern">
                                Modern
                              </ToggleGroupItem>
                              <ToggleGroupItem value="traditional" aria-label="Traditional">
                                Traditional
                              </ToggleGroupItem>
                              <ToggleGroupItem value="minimal" aria-label="Minimal">
                                Minimal
                              </ToggleGroupItem>
                            </ToggleGroup>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Button 
                    type="button"
                    className="w-full bg-virtuspace-500 hover:bg-virtuspace-600"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>Generating Floor Plans...</>
                    ) : (
                      <>
                        Generate Floor Plans
                        <Workflow className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Panel */}
          <div className="lg:col-span-2">
            {generatedFloorPlans.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-lg border border-gray-200">
                <Workflow className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to generate your floor plan</h3>
                <p className="text-gray-500 max-w-md mb-6">
                  Fill out your requirements on the left and click "Generate Floor Plans" to see AI-generated floor plans for your space.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <SquareStack className="h-8 w-8 text-virtuspace-500 mb-2" />
                    <p className="text-sm text-gray-600">Multiple designs to choose from</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <ArrowRight className="h-8 w-8 text-virtuspace-500 mb-2" />
                    <p className="text-sm text-gray-600">Instant generation</p>
                  </div>
                </div>
              </div>
            ) : selectedFloorPlan ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedFloorPlan(null)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to results
                  </Button>
                  <Button className="bg-virtuspace-500 hover:bg-virtuspace-600">
                    Download Floor Plan
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-0 overflow-hidden">
                    <img 
                      src={selectedFloorPlan.imageUrl} 
                      alt={selectedFloorPlan.title} 
                      className="w-full h-auto object-cover"
                    />
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{selectedFloorPlan.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {squareFootage} sq ft • {numBedrooms} Bedroom{numBedrooms !== "1" ? "s" : ""} • {numBathrooms} Bathroom{numBathrooms !== "1" ? "s" : ""}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {additionalRooms.map((room) => (
                          <span key={room} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-virtuspace-100 text-virtuspace-800">
                            {room === "living" && "Living Room"}
                            {room === "kitchen" && "Kitchen"}
                            {room === "dining" && "Dining Room"}
                            {room === "office" && "Home Office"}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <Workflow className="h-4 w-4 text-virtuspace-500 mr-2 mt-0.5" />
                          Optimized for natural light in primary living spaces
                        </li>
                        <li className="flex items-start">
                          <Workflow className="h-4 w-4 text-virtuspace-500 mr-2 mt-0.5" />
                          Kitchen placement provides efficient workflow
                        </li>
                        <li className="flex items-start">
                          <Workflow className="h-4 w-4 text-virtuspace-500 mr-2 mt-0.5" />
                          Bedroom placement maximizes privacy
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Generated Floor Plans</h2>
                <div className="grid grid-cols-1 gap-6">
                  {generatedFloorPlans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => selectFloorPlan(plan)}
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img 
                          src={plan.imageUrl} 
                          alt={plan.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{plan.title}</h3>
                            <p className="text-sm text-gray-500">
                              {squareFootage} sq ft • {numBedrooms} Bed • {numBathrooms} Bath
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-virtuspace-500 hover:bg-virtuspace-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              selectFloorPlan(plan);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FloorPlanGenerator;
