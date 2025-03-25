
import { useState, useEffect } from 'react';
import { Check, Search, Palette, CircleDollarSign, Grid2X2, Grid3X3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Material {
  id: string;
  name: string;
  type: 'flooring' | 'wall' | 'furniture';
  subtype: string;
  image: string;
  costPerUnit: number;
  unit: string;
}

const materials: Material[] = [
  // Flooring materials
  { id: 'oak-hardwood', name: 'Oak Hardwood', type: 'flooring', subtype: 'wood', image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&auto=format&fit=crop&q=80', costPerUnit: 45, unit: 'sq ft' },
  { id: 'maple-hardwood', name: 'Maple Hardwood', type: 'flooring', subtype: 'wood', image: 'https://images.unsplash.com/photo-1534889156217-d643df14f14a?w=600&auto=format&fit=crop&q=80', costPerUnit: 48, unit: 'sq ft' },
  { id: 'bamboo', name: 'Bamboo', type: 'flooring', subtype: 'wood', image: 'https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=600&auto=format&fit=crop&q=80', costPerUnit: 40, unit: 'sq ft' },
  { id: 'marble-tile', name: 'Marble Tile', type: 'flooring', subtype: 'tile', image: 'https://images.unsplash.com/photo-1518281361980-b26bfd556770?w=600&auto=format&fit=crop&q=80', costPerUnit: 65, unit: 'sq ft' },
  { id: 'porcelain-tile', name: 'Porcelain Tile', type: 'flooring', subtype: 'tile', image: 'https://images.unsplash.com/photo-1575652550868-c1b9f38c9616?w=600&auto=format&fit=crop&q=80', costPerUnit: 35, unit: 'sq ft' },
  { id: 'carpet', name: 'Carpet', type: 'flooring', subtype: 'textile', image: 'https://images.unsplash.com/photo-1527089783515-85c3ec8cb3d5?w=600&auto=format&fit=crop&q=80', costPerUnit: 28, unit: 'sq ft' },
  
  // Wall materials
  { id: 'paint-white', name: 'White Paint', type: 'wall', subtype: 'paint', image: 'https://images.unsplash.com/photo-1589121232928-a0d760041fd5?w=600&auto=format&fit=crop&q=80', costPerUnit: 2.5, unit: 'sq ft' },
  { id: 'paint-blue', name: 'Blue Paint', type: 'wall', subtype: 'paint', image: 'https://images.unsplash.com/photo-1602823088881-3c14633d6893?w=600&auto=format&fit=crop&q=80', costPerUnit: 3, unit: 'sq ft' },
  { id: 'wallpaper-floral', name: 'Floral Wallpaper', type: 'wall', subtype: 'wallpaper', image: 'https://images.unsplash.com/photo-1582039923110-a4d8a5b9c4c8?w=600&auto=format&fit=crop&q=80', costPerUnit: 5.5, unit: 'sq ft' },
  { id: 'brick-veneer', name: 'Brick Veneer', type: 'wall', subtype: 'veneer', image: 'https://images.unsplash.com/photo-1523413307857-ef24c53571ae?w=600&auto=format&fit=crop&q=80', costPerUnit: 12, unit: 'sq ft' },
  { id: 'wood-paneling', name: 'Wood Paneling', type: 'wall', subtype: 'wood', image: 'https://images.unsplash.com/photo-1594319686238-29eeec5d6022?w=600&auto=format&fit=crop&q=80', costPerUnit: 15, unit: 'sq ft' },
  { id: 'stone-wall', name: 'Stone Wall', type: 'wall', subtype: 'stone', image: 'https://images.unsplash.com/photo-1596825205280-94ef73cfd585?w=600&auto=format&fit=crop&q=80', costPerUnit: 22, unit: 'sq ft' },
  
  // Furniture materials
  { id: 'leather', name: 'Leather', type: 'furniture', subtype: 'textile', image: 'https://images.unsplash.com/photo-1550861568-566c4b46716b?w=600&auto=format&fit=crop&q=80', costPerUnit: 150, unit: 'yard' },
  { id: 'linen', name: 'Linen', type: 'furniture', subtype: 'textile', image: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?w=600&auto=format&fit=crop&q=80', costPerUnit: 65, unit: 'yard' },
  { id: 'velvet', name: 'Velvet', type: 'furniture', subtype: 'textile', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80', costPerUnit: 85, unit: 'yard' },
  { id: 'oak-wood', name: 'Oak Wood', type: 'furniture', subtype: 'wood', image: 'https://images.unsplash.com/photo-1580862984096-f67e7eb59b32?w=600&auto=format&fit=crop&q=80', costPerUnit: 18, unit: 'board ft' },
  { id: 'walnut-wood', name: 'Walnut Wood', type: 'furniture', subtype: 'wood', image: 'https://images.unsplash.com/photo-1566895733044-d2bdda8b6234?w=600&auto=format&fit=crop&q=80', costPerUnit: 25, unit: 'board ft' },
  { id: 'glass', name: 'Glass', type: 'furniture', subtype: 'other', image: 'https://images.unsplash.com/photo-1616628188550-808682f3926d?w=600&auto=format&fit=crop&q=80', costPerUnit: 45, unit: 'sq ft' },
];

const MaterialSelection = () => {
  const [selectedTab, setSelectedTab] = useState<'flooring' | 'wall' | 'furniture'>('flooring');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubtypes, setSelectedSubtypes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<{[key: string]: Material}>({});
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [totalCost, setTotalCost] = useState(0);
  
  const { toast } = useToast();

  // Get subtypes for the selected tab
  const subtypes = Array.from(new Set(materials
    .filter(m => m.type === selectedTab)
    .map(m => m.subtype)));

  // Filter materials based on tab, search, and subtypes
  const filteredMaterials = materials
    .filter(m => m.type === selectedTab)
    .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(m => selectedSubtypes.length === 0 || selectedSubtypes.includes(m.subtype));

  // Handle material selection
  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterial(material);
  };

  // Handle material application
  const handleApplyMaterial = () => {
    if (selectedMaterial) {
      setSelectedMaterials({
        ...selectedMaterials,
        [selectedTab]: selectedMaterial
      });
      
      // Update quantity if not set yet
      if (!quantities[selectedMaterial.id]) {
        setQuantities({
          ...quantities,
          [selectedMaterial.id]: 10 // Default quantity
        });
      }
      
      toast({
        title: "Material Applied",
        description: `${selectedMaterial.name} has been applied to your ${selectedTab}.`,
      });
    }
  };

  // Calculate total cost
  useEffect(() => {
    let cost = 0;
    Object.keys(quantities).forEach(materialId => {
      const material = materials.find(m => m.id === materialId);
      if (material) {
        cost += material.costPerUnit * quantities[materialId];
      }
    });
    setTotalCost(cost);
  }, [quantities, selectedMaterials]);

  // Update quantity
  const updateQuantity = (materialId: string, quantity: number) => {
    setQuantities({
      ...quantities,
      [materialId]: quantity
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Material Selection</h1>
            <p className="text-lg text-gray-600">
              Choose materials for your project to visualize and estimate costs
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Material Browser */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Material Library</CardTitle>
                      <CardDescription>Browse and select materials for your design</CardDescription>
                    </div>
                    <ToggleGroup type="single" value={viewMode} onValueChange={(val) => val && setViewMode(val as 'grid' | 'list')}>
                      <ToggleGroupItem value="grid">
                        <Grid2X2 className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="list">
                        <Grid3X3 className="h-4 w-4" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tabs and Search */}
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as 'flooring' | 'wall' | 'furniture')}>
                      <TabsList>
                        <TabsTrigger value="flooring">Flooring</TabsTrigger>
                        <TabsTrigger value="wall">Walls</TabsTrigger>
                        <TabsTrigger value="furniture">Furniture</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <div className="flex-grow">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Search materials..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Material Filters */}
                  <div className="flex flex-wrap gap-2">
                    {subtypes.map(subtype => (
                      <Badge 
                        key={subtype}
                        variant={selectedSubtypes.includes(subtype) ? "default" : "outline"}
                        className="cursor-pointer text-xs capitalize"
                        onClick={() => {
                          setSelectedSubtypes(
                            selectedSubtypes.includes(subtype)
                              ? selectedSubtypes.filter(s => s !== subtype)
                              : [...selectedSubtypes, subtype]
                          );
                        }}
                      >
                        {subtype}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Material Grid */}
                  <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                    {filteredMaterials.map(material => (
                      <Card 
                        key={material.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedMaterial?.id === material.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => handleMaterialSelect(material)}
                      >
                        <CardContent className={`p-3 ${viewMode === 'list' ? 'flex items-center gap-4' : ''}`}>
                          <div className={viewMode === 'list' ? 'w-20 flex-shrink-0' : ''}>
                            <AspectRatio ratio={viewMode === 'list' ? 1 : 4/3} className="bg-muted rounded-md overflow-hidden">
                              <img
                                src={material.image}
                                alt={material.name}
                                className="object-cover h-full w-full"
                              />
                            </AspectRatio>
                          </div>
                          <div className={`mt-2 ${viewMode === 'list' ? 'mt-0 flex-grow' : ''}`}>
                            <h3 className="font-medium text-sm">{material.name}</h3>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500 capitalize">{material.subtype}</span>
                              <span className="text-xs font-medium">₹{material.costPerUnit}/{material.unit}</span>
                            </div>
                          </div>
                          {selectedMaterial?.id === material.id && (
                            <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Material Preview and Selection */}
            <div>
              <div className="space-y-4">
                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2 text-primary" />
                      Material Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedMaterial ? (
                      <div className="space-y-4">
                        <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden">
                          <img
                            src={selectedMaterial.image}
                            alt={selectedMaterial.name}
                            className="object-cover h-full w-full"
                          />
                        </AspectRatio>
                        
                        <div>
                          <h3 className="text-lg font-semibold">{selectedMaterial.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">Type: {selectedMaterial.subtype}</p>
                          <p className="text-sm font-medium mt-1">Cost: ₹{selectedMaterial.costPerUnit} per {selectedMaterial.unit}</p>
                        </div>
                        
                        <div className="pt-2">
                          <label className="text-sm font-medium">Quantity ({selectedMaterial.unit}):</label>
                          <Input
                            type="number"
                            min="1"
                            className="mt-1"
                            value={quantities[selectedMaterial.id] || ''}
                            onChange={(e) => updateQuantity(selectedMaterial.id, Number(e.target.value))}
                          />
                        </div>
                        
                        <Button className="w-full" onClick={handleApplyMaterial}>
                          Apply to {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Palette className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>Select a material to preview</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Selected Materials */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
                      Cost Estimation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.keys(selectedMaterials).length > 0 ? (
                        <>
                          <div className="space-y-3">
                            {Object.entries(selectedMaterials).map(([type, material]) => (
                              <div key={type} className="flex justify-between items-center py-1 border-b">
                                <div>
                                  <p className="font-medium capitalize">{type}</p>
                                  <p className="text-sm text-gray-500">{material.name}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">₹{material.costPerUnit * (quantities[material.id] || 0)}</p>
                                  <p className="text-sm text-gray-500">
                                    {quantities[material.id] || 0} {material.unit} × ₹{material.costPerUnit}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-dashed">
                            <p className="font-semibold">Total Cost:</p>
                            <p className="font-semibold text-xl">₹{totalCost.toFixed(2)}</p>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          <p>No materials selected yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MaterialSelection;
