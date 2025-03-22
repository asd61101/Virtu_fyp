
import { Repeat } from "lucide-react";

interface UploadingStateProps {
  progress: number;
}

const UploadingState: React.FC<UploadingStateProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Repeat className="h-10 w-10 animate-spin text-virtuspace-500" />
      <p className="text-gray-600">Uploading and Processing...</p>
      <progress value={progress} max="100" className="w-full h-2 rounded-full"></progress>
      <span className="text-sm text-gray-500">{progress}%</span>
    </div>
  );
};

export default UploadingState;
