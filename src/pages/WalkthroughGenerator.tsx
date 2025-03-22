
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Eye, FileUp, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Import the refactored components
import UploadForm from "@/components/walkthrough/UploadForm";
import UploadingState from "@/components/walkthrough/UploadingState";
import SuccessState from "@/components/walkthrough/SuccessState";
import ErrorState from "@/components/walkthrough/ErrorState";

const WalkthroughGenerator = () => {
  const [uploadType, setUploadType] = useState<"image" | "pdf">("image");
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [walkthroughUrl, setWalkthroughUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setStatus("uploading");
    setProgress(0);

    // Simulate upload and processing
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStatus("success");
            setWalkthroughUrl("https://example.com/walkthrough"); // Replace with actual URL
            toast({
              title: "Walkthrough Generated!",
              description: "Your 360° walkthrough is ready to view.",
            });
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    // Simulate error after a delay
    // setTimeout(() => {
    //   clearInterval(interval);
    //   setStatus("error");
    //   toast({
    //     title: "Error",
    //     description: "Failed to generate walkthrough. Please try again.",
    //     variant: "destructive",
    //   });
    // }, 5000);
  };

  const handleRetry = () => {
    setStatus("idle");
    setProgress(0);
    setWalkthroughUrl(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <main className="flex-grow pt-24">
        <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Generate 360° Walkthrough</h1>
            <p className="text-gray-600 mt-2">Upload your floor plan and let our AI create an immersive walkthrough.</p>
          </div>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <Tabs defaultValue="image" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image" onClick={() => setUploadType("image")}>
                    <Eye className="h-4 w-4 mr-2" />
                    Image
                  </TabsTrigger>
                  <TabsTrigger value="pdf" onClick={() => setUploadType("pdf")}>
                    <FileUp className="h-4 w-4 mr-2" />
                    PDF
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="image">
                  {status === "idle" && (
                    <UploadForm uploadType="image" onFileUpload={handleFileUpload} />
                  )}
                  {status === "uploading" && <UploadingState progress={progress} />}
                  {status === "success" && (
                    <SuccessState walkthroughUrl={walkthroughUrl!} onRetry={handleRetry} />
                  )}
                  {status === "error" && <ErrorState onRetry={handleRetry} />}
                </TabsContent>
                <TabsContent value="pdf">
                  {status === "idle" && (
                    <UploadForm uploadType="pdf" onFileUpload={handleFileUpload} />
                  )}
                  {status === "uploading" && <UploadingState progress={progress} />}
                  {status === "success" && (
                    <SuccessState walkthroughUrl={walkthroughUrl!} onRetry={handleRetry} />
                  )}
                  {status === "error" && <ErrorState onRetry={handleRetry} />}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WalkthroughGenerator;
