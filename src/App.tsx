
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProjectEditor from "./pages/ProjectEditor";
import AIFloorplanning from "./pages/AIFloorplanning";
import Walkthrough360 from "./pages/Walkthrough360";
import Gallery from "./pages/Gallery";
import Pricing from "./pages/Pricing";
import FloorPlanGenerator from "./pages/FloorPlanGenerator";
import WalkthroughGenerator from "./pages/WalkthroughGenerator";
import CostEstimation from "./pages/CostEstimation";
import MaterialSelection from "./pages/MaterialSelection";
import EditPlan from "./pages/EditPlan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:projectId" element={<ProjectEditor />} />
          <Route path="/edit-plan" element={<EditPlan />} />
          <Route path="/edit-plan/:planId" element={<EditPlan />} />
          <Route path="/ai-floorplanning" element={<AIFloorplanning />} />
          <Route path="/360-walkthrough" element={<Walkthrough360 />} />
          <Route path="/cost-estimation" element={<CostEstimation />} />
          <Route path="/material-selection" element={<MaterialSelection />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/floor-plan-generator" element={<FloorPlanGenerator />} />
          <Route path="/walkthrough-generator" element={<WalkthroughGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
