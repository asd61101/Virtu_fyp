
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface MaterialOption {
  id: string;
  name: string;
  pricePerUnit: number;
  unit: string;
  category: string;
}

const materials: MaterialOption[] = [
  // Structural Materials
  { id: 'concrete', name: 'Concrete', pricePerUnit: 100, unit: 'cubic meter', category: 'structural' },
  { id: 'brick', name: 'Brick', pricePerUnit: 0.5, unit: 'piece', category: 'structural' },
  { id: 'wood', name: 'Wood', pricePerUnit: 20, unit: 'square meter', category: 'structural' },
  { id: 'steel', name: 'Steel', pricePerUnit: 800, unit: 'ton', category: 'structural' },
  { id: 'glass', name: 'Glass', pricePerUnit: 40, unit: 'square meter', category: 'structural' },
  { id: 'cement', name: 'Cement', pricePerUnit: 350, unit: 'bag', category: 'structural' },
  { id: 'sand', name: 'Sand', pricePerUnit: 150, unit: 'cubic meter', category: 'structural' },
  
  // Flooring Materials
  { id: 'marble-flooring', name: 'Marble Flooring', pricePerUnit: 1200, unit: 'square meter', category: 'flooring' },
  { id: 'granite-flooring', name: 'Granite Flooring', pricePerUnit: 950, unit: 'square meter', category: 'flooring' },
  { id: 'ceramic-tiles', name: 'Ceramic Tiles', pricePerUnit: 450, unit: 'square meter', category: 'flooring' },
  { id: 'vitrified-tiles', name: 'Vitrified Tiles', pricePerUnit: 650, unit: 'square meter', category: 'flooring' },
  { id: 'wooden-flooring', name: 'Wooden Flooring', pricePerUnit: 800, unit: 'square meter', category: 'flooring' },
  { id: 'laminate-flooring', name: 'Laminate Flooring', pricePerUnit: 550, unit: 'square meter', category: 'flooring' },
  
  // Wall Materials
  { id: 'wall-paint', name: 'Wall Paint', pricePerUnit: 200, unit: 'liter', category: 'wall' },
  { id: 'wallpaper', name: 'Wallpaper', pricePerUnit: 350, unit: 'roll', category: 'wall' },
  { id: 'wall-tiles', name: 'Wall Tiles', pricePerUnit: 400, unit: 'square meter', category: 'wall' },
  { id: 'wall-paneling', name: 'Wall Paneling', pricePerUnit: 550, unit: 'square meter', category: 'wall' },
  { id: 'stone-cladding', name: 'Stone Cladding', pricePerUnit: 750, unit: 'square meter', category: 'wall' },
  { id: 'media-wall', name: 'Media Wall Unit', pricePerUnit: 12000, unit: 'unit', category: 'wall' },
  
  // Electrical Materials
  { id: 'wiring-cables', name: 'Wiring Cables', pricePerUnit: 80, unit: 'meter', category: 'electrical' },
  { id: 'light-switches', name: 'Light Switches', pricePerUnit: 120, unit: 'piece', category: 'electrical' },
  { id: 'light-bulbs', name: 'Light Bulbs', pricePerUnit: 150, unit: 'piece', category: 'electrical' },
  { id: 'led-lights', name: 'LED Lights', pricePerUnit: 300, unit: 'piece', category: 'electrical' },
  { id: 'rope-lights', name: 'Rope Lights', pricePerUnit: 250, unit: 'meter', category: 'electrical' },
  { id: 'electrical-panel', name: 'Electrical Panel', pricePerUnit: 3500, unit: 'unit', category: 'electrical' },
  { id: 'ceiling-fan', name: 'Ceiling Fan', pricePerUnit: 1200, unit: 'piece', category: 'electrical' },
  
  // Kitchen Materials
  { id: 'kitchen-cabinets', name: 'Kitchen Cabinets', pricePerUnit: 4500, unit: 'meter', category: 'kitchen' },
  { id: 'kitchen-countertop', name: 'Kitchen Countertop', pricePerUnit: 3000, unit: 'meter', category: 'kitchen' },
  { id: 'kitchen-sink', name: 'Kitchen Sink', pricePerUnit: 2500, unit: 'piece', category: 'kitchen' },
  { id: 'kitchen-faucet', name: 'Kitchen Faucet', pricePerUnit: 1800, unit: 'piece', category: 'kitchen' },
  { id: 'kitchen-backsplash', name: 'Kitchen Backsplash', pricePerUnit: 550, unit: 'square meter', category: 'kitchen' },
  { id: 'kitchen-appliances', name: 'Kitchen Appliances Set', pricePerUnit: 65000, unit: 'set', category: 'kitchen' },
  
  // Bathroom Materials
  { id: 'bathroom-tiles', name: 'Bathroom Tiles', pricePerUnit: 550, unit: 'square meter', category: 'bathroom' },
  { id: 'bathroom-fittings', name: 'Bathroom Fittings', pricePerUnit: 7500, unit: 'set', category: 'bathroom' },
  { id: 'toilet', name: 'Toilet', pricePerUnit: 4500, unit: 'piece', category: 'bathroom' },
  { id: 'bathroom-sink', name: 'Bathroom Sink', pricePerUnit: 2800, unit: 'piece', category: 'bathroom' },
  { id: 'shower-system', name: 'Shower System', pricePerUnit: 3800, unit: 'set', category: 'bathroom' },
  { id: 'bathtub', name: 'Bathtub', pricePerUnit: 12000, unit: 'piece', category: 'bathroom' },
  { id: 'bathroom-cabinet', name: 'Bathroom Cabinet', pricePerUnit: 3500, unit: 'piece', category: 'bathroom' },
];

interface MaterialSelectorProps {
  setTotalCost: (cost: number) => void;
}

const MaterialSelector = ({ setTotalCost }: MaterialSelectorProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('structural');

  const categories = [
    { value: 'structural', label: 'Structural Materials' },
    { value: 'flooring', label: 'Flooring Materials' },
    { value: 'wall', label: 'Wall Materials' },
    { value: 'electrical', label: 'Electrical Materials' },
    { value: 'kitchen', label: 'Kitchen Materials' },
    { value: 'bathroom', label: 'Bathroom Materials' },
  ];

  const filteredMaterials = materials.filter(
    material => material.category === selectedCategory
  );

  const updateQuantity = (materialId: string, quantity: number) => {
    const newQuantities = { ...quantities, [materialId]: quantity };
    setQuantities(newQuantities);
    
    // Calculate total cost
    const total = materials.reduce((sum, material) => {
      return sum + (newQuantities[material.id] || 0) * material.pricePerUnit;
    }, 0);
    
    setTotalCost(total);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Material Selection</CardTitle>
        <CardDescription>Choose materials and quantities for your project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Material Category</Label>
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor={material.id}>{material.name}</Label>
                  <div className="text-sm text-gray-500">
                    ₹{material.pricePerUnit} per {material.unit}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id={material.id}
                    type="number"
                    min="0"
                    value={quantities[material.id] || ''}
                    onChange={(e) => updateQuantity(material.id, Number(e.target.value))}
                    className="w-24 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Quantity"
                  />
                  <span className="text-sm text-gray-500 w-24">{material.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialSelector;
