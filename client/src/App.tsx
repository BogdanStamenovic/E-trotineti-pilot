import { useState, useCallback } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Frame } from "@/pages/Frame";
import Quiz from "@/pages/Quiz";
import { SplashScreen } from "@/components/SplashScreen";

const hasSeenSplash = sessionStorage.getItem("splash-seen") === "true";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Frame} />
      <Route path="/quiz" component={Quiz} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem("splash-seen", "true");
    setShowSplash(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {showSplash && <SplashScreen onDone={handleSplashDone} />}
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
