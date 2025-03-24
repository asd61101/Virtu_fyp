
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

interface CostBreakdownProps {
  totalCost: number;
  budget: number;
}

const CostBreakdown = ({ totalCost, budget }: CostBreakdownProps) => {
  const isOverBudget = budget > 0 && totalCost > budget;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Breakdown</CardTitle>
        <CardDescription>Overview of your project costs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Materials Total:</span>
            <span className="text-lg font-semibold">${totalCost.toFixed(2)}</span>
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
              <span>Warning: Cost exceeds budget by ${(totalCost - budget).toFixed(2)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
