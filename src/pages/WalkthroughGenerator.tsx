
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Upload, Check, Loader2, Eye360, ChevronRight } from "lucide-react";

const WalkthroughGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [walkthrough, setWalkthrough] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.obj') && 
          !selectedFile.name.toLowerCase().endsWith('.fbx') && 
          !selectedFile.name.toLowerCase().endsWith('.glb')) {
        toast({
          title: "Invalid file format",
          description: "Please upload a 3D model file (.obj, .fbx, or .glb)",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
      
      // For demo purposes only - in a real app we would process the 3D file
      // Here we're just showing a placeholder image 
      setPreviewUrl("https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80");
    }
  };

  const handleGenerate = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a 3D model file first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsGenerating(false);
      setWalkthrough("https://my.matterport.com/show/?m=aSx1MpRRqif");
      
      toast({
        title: "Walkthrough generated!",
        description: "Your 360° walkthrough is ready to explore.",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="flex-grow pt-24">
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Create Your <span className="text-virtuspace-600">360° Walkthrough</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Upload your 3D floor plan model and convert it into an immersive 360° walkthrough experience in just a few clicks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {!walkthrough ? (
              <div className="p-8">
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    {previewUrl ? (
                      <div className="space-y-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <img 
                            src={previewUrl} 
                            alt="3D Model Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {file?.name} • {(file?.size && (file.size / (1024 * 1024)).toFixed(2))} MB
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Upload your 3D floor plan</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Drag and drop your 3D model file or click to browse
                        </p>
                        <p className="text-xs text-gray-400">
                          Supported formats: .obj, .fbx, .glb
                        </p>
                      </>
                    )}
                    
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".obj,.fbx,.glb"
                    />
                    
                    {!previewUrl && (
                      <Button
                        onClick={() => document.getElementById("file-upload")?.click()}
                        variant="outline"
                        className="mt-4"
                      >
                        Browse Files
                      </Button>
                    )}
                  </div>
                  
                  {previewUrl && (
                    <div className="text-center">
                      <Button 
                        onClick={handleGenerate}
                        className="bg-virtuspace-500 hover:bg-virtuspace-600"
                        disabled={isGenerating}
                        size="lg"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Walkthrough...
                          </>
                        ) : (
                          <>
                            <Eye360 className="mr-2 h-4 w-4" />
                            Generate 360° Walkthrough
                          </>
                        )}
                      </Button>
                      
                      <p className="mt-2 text-xs text-gray-500">
                        This may take a few minutes depending on the file size
                      </p>
                    </div>
                  )}

                  <div className="bg-virtuspace-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Tips for best results:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                      <li>Ensure your 3D model has proper textures and materials</li>
                      <li>Keep file size below 50MB for faster processing</li>
                      <li>Models with interior details will produce better walkthroughs</li>
                      <li>Use actual architectural scale for accurate walkthrough experience</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Your 360° Walkthrough is Ready!</h3>
                  <p className="text-gray-600">Experience your space in immersive 360° view</p>
                </div>
                
                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <iframe 
                    src={walkthrough} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    Upload Another Model
                  </Button>
                  <Button className="bg-virtuspace-500 hover:bg-virtuspace-600">
                    Share Walkthrough
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-virtuspace-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
              Features of Our 360° Walkthrough Converter
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtuspace-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Conversion</h3>
                <p className="text-gray-600">
                  Convert your 3D models into interactive 360° walkthroughs within minutes, no manual setup required.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtuspace-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Accurate Rendering</h3>
                <p className="text-gray-600">
                  Our advanced algorithms preserve all details of your design for photo-realistic visualization.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-12 w-12 bg-virtuspace-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-virtuspace-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Sharing</h3>
                <p className="text-gray-600">
                  Share your walkthrough with clients via link or embed it directly on your website.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WalkthroughGenerator;
