
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from 'lucide-react';

interface BudgetInputProps {
  budget: number;
  setBudget: (budget: number) => void;
}

const BudgetInput = ({ budget, setBudget }: BudgetInputProps) => {
  const [budgetInput, setBudgetInput] = React.useState(budget.toString());

  const handleSetBudget = () => {
    const numericBudget = parseFloat(budgetInput);
    if (!isNaN(numericBudget) && numericBudget >= 0) {
      setBudget(numericBudget);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-virtuspace-500" />
          Budget
        </CardTitle>
        <CardDescription>Set your target budget for the project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Label htmlFor="budget">Budget Amount</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="budget"
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="pl-8"
                placeholder="Enter your budget"
                min="0"
              />
            </div>
          </div>
          <Button onClick={handleSetBudget} type="button">Set Budget</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetInput;
