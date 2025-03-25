
import { useState, useEffect } from 'react';
import { Calculator, DollarSign, AlertTriangle, CircleDollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import MaterialSelector from "@/components/cost-estimation/MaterialSelector";
import CostBreakdown from "@/components/cost-estimation/CostBreakdown";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CostEstimation = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [budget, setBudget] = useState(0);
  const [projectSize, setProjectSize] = useState<string>('medium');
  const { toast } = useToast();

  // Predefined budgets based on project size
  const suggestedBudgets = {
    small: 500000,  // 5 lakhs
    medium: 1500000, // 15 lakhs
    large: 3000000,  // 30 lakhs
    luxury: 5000000  // 50 lakhs
  };

  // Update budget when project size changes
  useEffect(() => {
    const suggestedBudget = suggestedBudgets[projectSize as keyof typeof suggestedBudgets];
    if (suggestedBudget && budget === 0) {
      setBudget(suggestedBudget);
    }
  }, [projectSize]);

  useEffect(() => {
    if (totalCost > budget && budget !== 0) {
      toast({
        title: "Budget Warning",
        description: "Your selections exceed your set budget.",
        variant: "destructive",
      });
    }
  }, [totalCost, budget, toast]);

  const handleSetBudget = (newBudget: number) => {
    setBudget(newBudget);
    toast({
      title: "Budget Updated",
      description: `Your budget has been set to ₹${newBudget.toLocaleString()}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cost Estimation</h1>
            <p className="text-lg text-gray-600">
              Calculate and optimize your project costs with our smart estimation tools
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-primary" />
                  Project Setup
                </CardTitle>
                <CardDescription>Define your project parameters and budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-size">Project Size</Label>
                    <Select 
                      value={projectSize} 
                      onValueChange={setProjectSize}
                    >
                      <SelectTrigger id="project-size">
                        <SelectValue placeholder="Select project size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small Home (Up to 1000 sq ft)</SelectItem>
                        <SelectItem value="medium">Medium Home (1000-2000 sq ft)</SelectItem>
                        <SelectItem value="large">Large Home (2000-3500 sq ft)</SelectItem>
                        <SelectItem value="luxury">Luxury Home (3500+ sq ft)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Your Budget (₹)</Label>
                    <div className="flex items-center gap-4">
                      <input
                        id="budget"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="Enter your budget"
                      />
                      <Button onClick={() => handleSetBudget(budget)}>Set Budget</Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <p className="text-sm text-gray-500 w-full">Suggested budgets:</p>
                    {Object.entries(suggestedBudgets).map(([size, amount]) => (
                      <Button 
                        key={size}
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetBudget(amount)}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}: ₹{(amount / 100000).toFixed(0)} Lakhs
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <MaterialSelector setTotalCost={setTotalCost} />
            <CostBreakdown totalCost={totalCost} budget={budget} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CostEstimation;
