
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SmartFarming from "./pages/SmartFarming";
import ReturnsToResource from "./pages/ReturnsToResource";
import EcoPackaging from "./pages/EcoPackaging";
import EnergyManagement from "./pages/EnergyManagement";
import ConsumerSustainability from "./pages/ConsumerSustainability";
import CarbonDelivery from "./pages/CarbonDelivery";
import WasteManagement from "./pages/WasteManagement";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/smart-farming" element={<SmartFarming />} />
          <Route path="/returns-to-resource" element={<ReturnsToResource />} />
          <Route path="/eco-packaging" element={<EcoPackaging />} />
          <Route path="/energy-management" element={<EnergyManagement />} />
          <Route path="/consumer-sustainability" element={<ConsumerSustainability />} />
          <Route path="/carbon-delivery" element={<CarbonDelivery />} />
          <Route path="/waste-management" element={<WasteManagement />} />
          
          <Route path="/about" element={<About />} />
          
          {/* Placeholder routes for other solutions */}
          <Route path="/supply-chain" element={<SmartFarming />} />
          <Route path="/demand-forecasting" element={<SmartFarming />} />
          <Route path="/customer-analytics" element={<SmartFarming />} />
          <Route path="/inventory-optimization" element={<SmartFarming />} />
          <Route path="/fraud-detection" element={<SmartFarming />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
