import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import AIPlannerPage from "./pages/AIPlannerPage";
import BookingsPage from "./pages/BookingsPage";
import RequireAuth from "./components/RequireAuth";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Products from "./components/Products";
import Flow from "./components/Flow";
import Excursions from "./components/Excursions";
import Privacy from "./components/Privacy";
import Plans from "./components/Plans";
import FAQ from "./components/FAQ";
import Closing from "./components/Closing";
import AuthModal from "./components/AuthModal";
import { AuthProvider, useAuth } from "./lib/auth";
import { usePrefersReducedMotion } from "./lib/motion";

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-coral text-deep shadow-lift transition-all duration-500 hover:bg-ember hover:shadow-[0_14px_34px_-10px_rgb(255_92_57/0.7)] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
      </svg>
    </button>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

function Shell() {
  return (
    <div className="min-h-screen bg-deep text-paper">
      <a
        href="#platform"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-coral focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-deep"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/tours"
            element={
              <div className="subapp">
                <ToursPage />
              </div>
            }
          />
          <Route
            path="/tours/:id"
            element={
              <div className="subapp">
                <TourDetailPage />
              </div>
            }
          />
          <Route
            path="/ai"
            element={
              <div className="subapp">
                <RequireAuth title="Sign in to plan your trip">
                  <AIPlannerPage />
                </RequireAuth>
              </div>
            }
          />
          <Route
            path="/bookings"
            element={
              <div className="subapp">
                <RequireAuth title="Sign in to see your bookings">
                  <BookingsPage />
                </RequireAuth>
              </div>
            }
          />
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>

      <AuthModal />
      <BackToTop />
      <div className="noise-layer" aria-hidden="true" />
    </div>
  );
}

function Landing() {
  const { user } = useAuth();

  return (
    <>
      <Hero />
      <Ticker />
      <Products />
      <Flow />
      <Excursions />
      <Privacy />
      {/* Pricing plans are a sales pitch — hidden once someone is aboard. */}
      {!user && <Plans />}
      <FAQ />
      <Closing />
    </>
  );
}
