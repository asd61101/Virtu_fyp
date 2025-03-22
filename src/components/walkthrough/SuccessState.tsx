
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileCheck, Repeat } from "lucide-react";

interface SuccessStateProps {
  walkthroughUrl: string;
  onRetry: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ walkthroughUrl, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <FileCheck className="h-10 w-10 text-green-500" />
      <p className="text-gray-600">Walkthrough generated successfully!</p>
      <Button asChild>
        <Link to={walkthroughUrl} target="_blank" rel="noopener noreferrer">
          View Walkthrough
        </Link>
      </Button>
      <Button variant="outline" onClick={onRetry}>
        <Repeat className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </div>
  );
};

export default SuccessState;
