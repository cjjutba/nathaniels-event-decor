import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppComponent } from "./components/App";
import { AuthProvider } from "./contexts/AuthContext";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppComponent />} />
            <Route path="/about" element={<AppComponent />} />
            <Route path="/services" element={<AppComponent />} />
            <Route path="/services/*" element={<AppComponent />} />
            <Route path="/portfolio" element={<AppComponent />} />
            <Route path="/contact" element={<AppComponent />} />
            <Route path="/login" element={<AppComponent />} />
            <Route path="/signup" element={<AppComponent />} />
            <Route path="/client/*" element={<AppComponent />} />
            <Route path="/admin" element={<AppComponent />} />
            <Route path="/admin/*" element={<AppComponent />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
