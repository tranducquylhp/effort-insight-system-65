
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Contracts from "./pages/Contracts";
import ProductionSchedule from "./pages/ProductionSchedule";
import EffortAllocation from "./pages/EffortAllocation";
import CostManagement from "./pages/CostManagement";
import OnsiteAllowance from "./pages/OnsiteAllowance";
import PnLReport from "./pages/PnLReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Index />
            </Layout>
          } />
          <Route path="/contracts" element={
            <Layout>
              <Contracts />
            </Layout>
          } />
          <Route path="/production-schedule" element={
            <Layout>
              <ProductionSchedule />
            </Layout>
          } />
          <Route path="/effort-allocation" element={
            <Layout>
              <EffortAllocation />
            </Layout>
          } />
          <Route path="/cost-management" element={
            <Layout>
              <CostManagement />
            </Layout>
          } />
          <Route path="/onsite-allowance" element={
            <Layout>
              <OnsiteAllowance />
            </Layout>
          } />
          <Route path="/pnl-report" element={
            <Layout>
              <PnLReport />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
