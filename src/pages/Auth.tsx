
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { ChevronLeft } from "lucide-react";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-virtuspace-50 to-white flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-virtuspace-600 flex items-center text-sm font-medium"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Virtuspace</h1>
            <p className="text-gray-500 mt-2">Architectural design made simple</p>
          </div>
          
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "login" | "signup")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
              
              <div className="mt-6 text-center text-sm">
                <span className="text-gray-500">Don't have an account?</span>{" "}
                <button 
                  onClick={() => setActiveTab("signup")}
                  className="text-virtuspace-600 hover:text-virtuspace-700 font-medium"
                >
                  Sign up now
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm />
              
              <div className="mt-6 text-center text-sm">
                <span className="text-gray-500">Already have an account?</span>{" "}
                <button 
                  onClick={() => setActiveTab("login")}
                  className="text-virtuspace-600 hover:text-virtuspace-700 font-medium"
                >
                  Login now
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="py-4 text-center bg-gray-50 text-xs text-gray-500">
          By continuing, you agree to Virtuspace's Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default Auth;
