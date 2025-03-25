
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      
      toast({
        title: "Reset link sent",
        description: `Password reset instructions have been sent to ${email}`,
      });
    } catch (error) {
      toast({
        title: "Failed to send reset link",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-virtuspace-50 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-virtuspace-500 hover:text-virtuspace-600">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
            <p className="text-gray-500 mt-2">
              {emailSent 
                ? "Check your email for reset instructions" 
                : "Enter your email and we'll send you a link to reset your password"}
            </p>
          </div>
          
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${error ? "border-red-300 focus:border-red-300 focus:ring-red-300" : ""}`}
                    placeholder="Your email address"
                  />
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-virtuspace-500 hover:bg-virtuspace-600"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-5">
              <div className="bg-green-50 text-green-800 p-4 rounded-md">
                A password reset link has been sent to your email address.
              </div>
              
              <Button
                type="button"
                className="bg-virtuspace-500 hover:bg-virtuspace-600"
                onClick={() => setEmailSent(false)}
              >
                Resend Email
              </Button>
            </div>
          )}
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-virtuspace-500 hover:text-virtuspace-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
