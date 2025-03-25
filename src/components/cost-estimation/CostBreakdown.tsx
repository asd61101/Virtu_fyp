
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertTriangle, PieChart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CostBreakdownProps {
  totalCost: number;
  budget: number;
}

const CostBreakdown = ({ totalCost, budget }: CostBreakdownProps) => {
  const isOverBudget = budget > 0 && totalCost > budget;
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  
  // Estimated breakdown percentages (these would be calculated from actual selections in a real app)
  const breakdownEstimates = {
    structural: { percentage: 30, label: 'Structural Materials' },
    flooring: { percentage: 15, label: 'Flooring' },
    wall: { percentage: 10, label: 'Wall Finishes' },
    electrical: { percentage: 12, label: 'Electrical' },
    kitchen: { percentage: 18, label: 'Kitchen' },
    bathroom: { percentage: 15, label: 'Bathroom' },
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Cost Breakdown
        </CardTitle>
        <CardDescription>Overview of your project costs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Materials Total:</span>
            <span className="text-lg font-semibold">₹{totalCost.toFixed(2)}</span>
          </div>
          
          {budget > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Budget:</span>
              <span className="text-lg font-semibold">₹{budget.toFixed(2)}</span>
            </div>
          )}
          
          {isOverBudget && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-md">
              <AlertTriangle className="h-5 w-5" />
              <span>Warning: Cost exceeds budget by ₹{(totalCost - budget).toFixed(2)}</span>
            </div>
          )}
          
          <button 
            onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showDetailedBreakdown ? 'Hide' : 'Show'} Detailed Breakdown
          </button>
          
          {showDetailedBreakdown && totalCost > 0 && (
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm text-gray-500">Estimated Cost Breakdown:</p>
              
              {Object.entries(breakdownEstimates).map(([key, { percentage, label }]) => {
                const estimatedCost = (totalCost * percentage) / 100;
                return (
                  <div key={key} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${getColorForCategory(key)}-500`}></div>
                      <span className="text-sm">{label}:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">₹{estimatedCost.toFixed(2)}</span>
                      <span className="text-xs text-gray-500">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to assign colors to different categories
function getColorForCategory(category: string): string {
  const colorMap: Record<string, string> = {
    structural: 'blue',
    flooring: 'green',
    wall: 'yellow',
    electrical: 'purple',
    kitchen: 'orange',
    bathroom: 'pink',
  };
  
  return colorMap[category] || 'gray';
}

export default CostBreakdown;
