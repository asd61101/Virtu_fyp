
import { useState, useEffect } from 'react';
import { Calculator, DollarSign, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import MaterialSelector from "@/components/cost-estimation/MaterialSelector";
import CostBreakdown from "@/components/cost-estimation/CostBreakdown";

const CostEstimation = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [laborCost, setLaborCost] = useState(0);
  const [budget, setBudget] = useState(0);
  const [suggestions, setSuggestions] = useState<Array<{id: string, name: string, savings: number}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    const grandTotal = totalCost + laborCost;
    if (grandTotal > budget && budget !== 0) {
      toast({
        title: "Budget Warning",
        description: "Your selections exceed your set budget.",
        variant: "destructive",
      });
    }
  }, [totalCost, laborCost, budget, toast]);

  const handleSetBudget = () => {
    const grandTotal = totalCost + laborCost;
    if (grandTotal > budget && budget !== 0) {
      toast({
        title: "Budget Warning",
        description: "Your current selections exceed your budget by $" + (grandTotal - budget).toFixed(2),
        variant: "destructive",
      });
    } else if (budget > 0) {
      toast({
        title: "Budget Set",
        description: "Your budget has been set to $" + budget.toFixed(2),
      });
    }
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
                  <DollarSign className="h-5 w-5 text-virtuspace-500" />
                  Budget Setup
                </CardTitle>
                <CardDescription>Set your target budget for the project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="flex-1"
                    placeholder="Enter your budget"
                  />
                  <Button onClick={handleSetBudget} variant="outline">Set Budget</Button>
                </div>
              </CardContent>
            </Card>

            <MaterialSelector 
              setTotalCost={setTotalCost} 
              setLaborCost={setLaborCost}
              setSuggestions={setSuggestions}
            />
            
            <CostBreakdown 
              totalCost={totalCost} 
              laborCost={laborCost}
              budget={budget}
              suggestions={suggestions}
            />
            
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  toast({
                    title: "Cost Updated",
                    description: "Your cost estimate has been refreshed with the latest rates.",
                  });
                }}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Cost Data
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CostEstimation;
