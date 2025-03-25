
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MaterialOption {
  id: string;
  name: string;
  pricePerUnit: number;
  unit: string;
}

const materials: MaterialOption[] = [
  { id: 'concrete', name: 'Concrete', pricePerUnit: 100, unit: 'cubic meter' },
  { id: 'brick', name: 'Brick', pricePerUnit: 0.5, unit: 'piece' },
  { id: 'wood', name: 'Wood', pricePerUnit: 20, unit: 'square meter' },
  { id: 'steel', name: 'Steel', pricePerUnit: 800, unit: 'ton' },
  { id: 'glass', name: 'Glass', pricePerUnit: 40, unit: 'square meter' },
];

interface MaterialSelectorProps {
  setTotalCost: (cost: number) => void;
}

const MaterialSelector = ({ setTotalCost }: MaterialSelectorProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

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
        <div className="grid gap-6">
          {materials.map((material) => (
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
      </CardContent>
    </Card>
  );
};

export default MaterialSelector;
