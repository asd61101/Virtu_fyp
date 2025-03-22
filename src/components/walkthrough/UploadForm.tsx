
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadFormProps {
  uploadType: "image" | "pdf";
  onFileUpload: (file: File) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ uploadType, onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors duration-200"
      >
        <Upload className="h-5 w-5 mr-2 inline-block" />
        <span>{`Select ${uploadType === "image" ? "Image" : "PDF"} File`}</span>
        <input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} />
      </label>
      {selectedFile && (
        <div className="text-sm text-gray-500">
          Selected File: {selectedFile.name}
        </div>
      )}
      <Button onClick={handleSubmit} disabled={!selectedFile}>
        Generate Walkthrough
      </Button>
    </div>
  );
};

export default UploadForm;
