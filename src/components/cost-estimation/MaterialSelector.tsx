
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalculatorIcon } from 'lucide-react';

interface MaterialOption {
  id: string;
  name: string;
  pricePerUnit: number;
  laborCostPerUnit: number;
  unit: string;
  alternatives?: {
    id: string;
    name: string;
    pricePerUnit: number;
    laborCostPerUnit: number;
  }[];
}

const materials: MaterialOption[] = [
  { 
    id: 'concrete', 
    name: 'Concrete', 
    pricePerUnit: 100, 
    laborCostPerUnit: 50,
    unit: 'cubic meter',
    alternatives: [
      { id: 'concrete-eco', name: 'Eco-Friendly Concrete', pricePerUnit: 80, laborCostPerUnit: 50 }
    ]
  },
  { 
    id: 'brick', 
    name: 'Brick', 
    pricePerUnit: 0.5, 
    laborCostPerUnit: 0.3,
    unit: 'piece',
    alternatives: [
      { id: 'recycled-brick', name: 'Recycled Brick', pricePerUnit: 0.4, laborCostPerUnit: 0.3 }
    ]
  },
  { 
    id: 'wood', 
    name: 'Premium Hardwood', 
    pricePerUnit: 20, 
    laborCostPerUnit: 10,
    unit: 'square meter',
    alternatives: [
      { id: 'engineered-wood', name: 'Engineered Wood', pricePerUnit: 12, laborCostPerUnit: 8 }
    ]
  },
  { 
    id: 'steel', 
    name: 'Steel', 
    pricePerUnit: 800, 
    laborCostPerUnit: 400,
    unit: 'ton',
    alternatives: [
      { id: 'recycled-steel', name: 'Recycled Steel', pricePerUnit: 650, laborCostPerUnit: 400 }
    ]
  },
  { 
    id: 'glass', 
    name: 'Premium Glass', 
    pricePerUnit: 40, 
    laborCostPerUnit: 20,
    unit: 'square meter',
    alternatives: [
      { id: 'standard-glass', name: 'Standard Glass', pricePerUnit: 25, laborCostPerUnit: 20 }
    ]
  },
];

interface MaterialSelectorProps {
  setTotalCost: (cost: number) => void;
  setLaborCost: (cost: number) => void;
  setSuggestions: (suggestions: Array<{id: string, name: string, savings: number}>) => void;
}

const MaterialSelector = ({ setTotalCost, setLaborCost, setSuggestions }: MaterialSelectorProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (materialId: string, quantity: number) => {
    const newQuantities = { ...quantities, [materialId]: quantity };
    setQuantities(newQuantities);
    
    // Calculate material and labor costs
    let materialTotal = 0;
    let laborTotal = 0;
    
    materials.forEach(material => {
      const qty = newQuantities[material.id] || 0;
      materialTotal += qty * material.pricePerUnit;
      laborTotal += qty * material.laborCostPerUnit;
    });
    
    setTotalCost(materialTotal);
    setLaborCost(laborTotal);
    
    // Generate cost-saving suggestions
    const potentialSuggestions = [];
    
    materials.forEach(material => {
      const qty = newQuantities[material.id] || 0;
      
      if (qty > 0 && material.alternatives) {
        material.alternatives.forEach(alt => {
          const currentCost = qty * material.pricePerUnit;
          const altCost = qty * alt.pricePerUnit;
          const savings = currentCost - altCost;
          
          if (savings > 0) {
            potentialSuggestions.push({
              id: alt.id,
              name: `Consider ${alt.name} instead of ${material.name} for similar results`,
              savings: savings
            });
          }
        });
      }
    });
    
    // Sort by savings amount (highest first) and take top 3
    const topSuggestions = potentialSuggestions
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 3);
      
    setSuggestions(topSuggestions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5 text-virtuspace-500" />
          Material Selection
        </CardTitle>
        <CardDescription>Choose materials and quantities for your project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {materials.map((material) => (
            <div key={material.id} className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor={material.id}>{material.name}</Label>
                <div className="text-sm text-gray-500">
                  ${material.pricePerUnit} per {material.unit} + ${material.laborCostPerUnit} labor
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id={material.id}
                  type="number"
                  min="0"
                  value={quantities[material.id] || ''}
                  onChange={(e) => updateQuantity(material.id, Number(e.target.value))}
                  className="w-24"
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
