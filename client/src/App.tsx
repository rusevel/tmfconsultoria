/* Cenvara app shell: global layers stay dark, quiet and consistent while routes remain direct and accessible. */
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ServicePage from "@/pages/ServicePage";
import Blog from "@/pages/Blog";
import SuccessCases from "@/pages/SuccessCases";
import Presentation from "@/pages/Presentation";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/consultoria-tributaria"><ServicePage kind="tributaria" /></Route>
      <Route path="/consultoria-fiscal"><ServicePage kind="fiscal" /></Route>
      <Route path="/politica-de-privacidade" component={PrivacyPolicy} />
      <Route path="/blog" component={Blog} />
      <Route path="/casos-de-sucesso" component={SuccessCases} />
      <Route path="/apresentacao" component={Presentation} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

/** Cenvara interaction layer: routes transition quickly to acknowledge navigation without delaying intent. */
function AnimatedRouter() {
  const [location] = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => element.classList.add("show"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);
  const scene = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        className="route-scene"
        initial={scene.initial}
        animate={scene.animate}
        exit={scene.exit}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
      >
        {!reduceMotion && (
          <motion.div
            className="route-progress"
            aria-hidden="true"
            initial={{ scaleX: 0.08, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          />
        )}
        <Router />
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AnimatedRouter />
          <FloatingWhatsApp />
          <AnalyticsConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
