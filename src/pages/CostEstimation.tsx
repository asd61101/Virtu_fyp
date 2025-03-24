
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { PageHeader } from '@/components/ui/page-header';
import MaterialSelector from '@/components/cost-estimation/MaterialSelector';
import CostBreakdown from '@/components/cost-estimation/CostBreakdown';
import BudgetInput from '@/components/cost-estimation/BudgetInput';

const CostEstimation = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [laborCost, setLaborCost] = useState(0);
  const [budget, setBudget] = useState(0);
  const [suggestions, setSuggestions] = useState<Array<{id: string, name: string, savings: number}>>([]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            title="Cost Estimation"
            description="Estimate the cost of your construction project based on materials and labor"
            className="mb-8"
          />
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <BudgetInput budget={budget} setBudget={setBudget} />
              <MaterialSelector 
                setTotalCost={setTotalCost} 
                setLaborCost={setLaborCost} 
                setSuggestions={setSuggestions} 
              />
            </div>
            <div>
              <CostBreakdown 
                totalCost={totalCost} 
                laborCost={laborCost} 
                budget={budget} 
                suggestions={suggestions} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CostEstimation;
