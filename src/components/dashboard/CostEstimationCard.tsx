
import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CostEstimationCard = () => {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="bg-virtuspace-50 border-b">
        <CardTitle className="flex items-center gap-2 text-virtuspace-700">
          <DollarSign className="h-5 w-5" />
          Cost Estimation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-600">
          Estimate the costs of your construction project based on materials and labor expenses.
        </p>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 border-t">
        <Link 
          to="/cost-estimation" 
          className="text-virtuspace-600 hover:text-virtuspace-700 flex items-center gap-1 text-sm font-medium"
        >
          Start estimating costs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CostEstimationCard;
