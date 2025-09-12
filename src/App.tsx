import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/providers/CartProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cosmetics from "./pages/Cosmetics";
import Toys from "./pages/Toys";
import Accessories from "./pages/Accessories";
import Bags from "./pages/Bags";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProductDetailPage from "./pages/ProductDetailPage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import TermsAndConditions from "./pages/policies/TermsAndConditions";
import ShippingPolicy from "./pages/policies/ShippingPolicy";
import CancellationRefundPolicy from "./pages/policies/CancellationRefundPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            {/* Category Routes */}
            <Route path="/cosmetics" element={<Cosmetics />} />
            <Route path="/toys" element={<Toys />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/bags" element={<Bags />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/product/:category/:id" element={<ProductDetailPage />} />
            
            {/* Footer Links */}
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/cancellation-refund" element={<CancellationRefundPolicy />} />
            
            {/* 404 Route - Keep this last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
