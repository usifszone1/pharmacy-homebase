
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Search from "./pages/Search";
import ArabicSearch from "./pages/ArabicSearch";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/arabic-search" element={<ArabicSearch />} />
            <Route path="/sign-in" element={
              <div className="min-h-screen flex items-center justify-center">
                <SignIn routing="path" path="/sign-in" />
              </div>
            } />
            <Route path="/sign-up" element={
              <div className="min-h-screen flex items-center justify-center">
                <SignUp routing="path" path="/sign-up" />
              </div>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
