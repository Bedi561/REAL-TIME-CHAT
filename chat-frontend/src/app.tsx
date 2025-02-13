import { Toaster as HotToaster } from "react-hot-toast";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./app/page";
import LoginPage from "./app/login/page";
import SignUpPage from "./app/signup/page";
// import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    {/* Hot Toast for notifications */}
    <HotToaster position="top-center" reverseOrder={false} />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
