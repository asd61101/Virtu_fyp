
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertTriangle, ThumbsUp, DollarSign } from 'lucide-react';

interface CostBreakdownProps {
  totalCost: number;
  laborCost: number;
  budget: number;
  suggestions: Array<{id: string, name: string, savings: number}>;
}

const CostBreakdown = ({ totalCost, laborCost, budget, suggestions }: CostBreakdownProps) => {
  const grandTotal = totalCost + laborCost;
  const isOverBudget = budget > 0 && grandTotal > budget;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-virtuspace-500" />
          Cost Breakdown
        </CardTitle>
        <CardDescription>Overview of your project costs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Materials Total:</span>
            <span className="text-lg font-semibold">${totalCost.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Labor Estimate:</span>
            <span className="text-lg font-semibold">${laborCost.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center border-t pt-3 border-gray-200">
            <span className="text-gray-800 font-medium">Grand Total:</span>
            <span className="text-xl font-bold">${grandTotal.toFixed(2)}</span>
          </div>
          
          {budget > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Budget:</span>
              <span className="text-lg font-semibold">${budget.toFixed(2)}</span>
            </div>
          )}
          
          {isOverBudget && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-md">
              <AlertTriangle className="h-5 w-5" />
              <span>Warning: Cost exceeds budget by ${(grandTotal - budget).toFixed(2)}</span>
            </div>
          )}
          
          {suggestions.length > 0 && (
            <div className="mt-6">
              <h4 className="text-md font-medium mb-3 text-gray-800">Cost-saving Suggestions</h4>
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center gap-2 bg-green-50 p-3 rounded-md text-green-700">
                    <ThumbsUp className="h-5 w-5" />
                    <div>
                      <p>{suggestion.name}</p>
                      <p className="text-sm">Potential savings: ${suggestion.savings.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
