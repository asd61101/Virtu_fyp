
import { Button } from "@/components/ui/button";
import { Repeat } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p className="text-red-600">Failed to generate walkthrough. Please try again.</p>
      <Button variant="outline" onClick={onRetry}>
        <Repeat className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </div>
  );
};

export default ErrorState;
