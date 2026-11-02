import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { initUrlTracker } from './utils/urlTracker';

const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const HowItWorks = lazy(() => import('./pages/HowItWorks').then(m => ({ default: m.HowItWorks })));
const SuccessStories = lazy(() => import('./pages/SuccessStories').then(m => ({ default: m.SuccessStories })));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail').then(m => ({ default: m.CaseStudyDetail })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Tools = lazy(() => import('./pages/Tools').then(m => ({ default: m.Tools })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const TargetMarketDeterminations = lazy(() => import('./pages/TargetMarketDeterminations'));
const CalculatorLanding = lazy(() => import('./pages/CalculatorLanding').then(m => ({ default: m.CalculatorLanding })));
const AuthorProfile = lazy(() => import('./pages/AuthorProfile').then(m => ({ default: m.AuthorProfile })));
const RentVsBuy = lazy(() => import('./pages/tools/RentVsBuy').then(m => ({ default: m.RentVsBuy })));
const NetWorth = lazy(() => import('./pages/tools/NetWorth').then(m => ({ default: m.NetWorth })));
const DebtRecycling = lazy(() => import('./pages/tools/DebtRecycling').then(m => ({ default: m.DebtRecycling })));
const Budget = lazy(() => import('./pages/tools/Budget').then(m => ({ default: m.Budget })));
const WishlistImpact = lazy(() => import('./pages/tools/WishlistImpact').then(m => ({ default: m.WishlistImpact })));
const WithdrawalImpact = lazy(() => import('./pages/tools/WithdrawalImpact').then(m => ({ default: m.WithdrawalImpact })));
const PayOffMortgage = lazy(() => import('./pages/PayOffMortgage').then(m => ({ default: m.PayOffMortgage })));
const Completed = lazy(() => import('./pages/Completed').then(m => ({ default: m.Completed })));
const ErrorPage = lazy(() => import('./pages/ErrorPage').then(m => ({ default: m.ErrorPage })));
const Reviews = lazy(() => import('./pages/Reviews').then(m => ({ default: m.Reviews })));
const Guides = lazy(() => import('./pages/Guides').then(m => ({ default: m.Guides })));
const GuideDetail = lazy(() => import('./pages/GuideDetail').then(m => ({ default: m.GuideDetail })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  useEffect(() => {
    initUrlTracker();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-gold rounded-full animate-spin" aria-label="Loading page" /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/success-stories/:slug" element={<CaseStudyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pay-off-mortgage" element={<PayOffMortgage />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/rent-vs-buy" element={<RentVsBuy />} />
            <Route path="/tools/net-worth" element={<NetWorth />} />
            <Route path="/tools/debt-recycling" element={<DebtRecycling />} />
            <Route path="/tools/budget" element={<Budget />} />
            <Route path="/tools/wishlist-impact" element={<WishlistImpact />} />
            <Route path="/tools/withdrawal-impact" element={<WithdrawalImpact />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuideDetail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/target-market-determinations" element={<TargetMarketDeterminations />} />
            <Route path="/mortgage-reduction-calculator" element={<CalculatorLanding />} />
            <Route path="/author/:slug" element={<AuthorProfile />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}
