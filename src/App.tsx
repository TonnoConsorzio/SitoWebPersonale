import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import { ScrollToTop } from './components/ScrollToTop';
import { GlobalSchema } from './components/GlobalSchema';
import { ThemeController } from './components/ThemeController';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const CurriculumPage = lazy(() => import('./pages/CurriculumPage').then(module => ({ default: module.CurriculumPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(module => ({ default: module.PortfolioPage })));
const ProjectPage = lazy(() => import('./pages/ProjectPage').then(module => ({ default: module.ProjectPage })));
const ServicesOverviewPage = lazy(() => import('./pages/ServicesOverviewPage').then(module => ({ default: module.ServicesOverviewPage })));
const AgencyPage = lazy(() => import('./pages/AgencyPage').then(module => ({ default: module.AgencyPage })));
const LandingPage = lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })));
const JournalPage = lazy(() => import('./pages/JournalPage').then(module => ({ default: module.JournalPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then(module => ({ default: module.ArticlePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <GlobalSchema />
        <div className="site-shell min-h-screen bg-background font-body text-foreground">
          <ThemeController />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chi-sono" element={<CurriculumPage />} />
              <Route path="/curriculum" element={<Navigate to="/chi-sono" replace />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<ProjectPage />} />
              <Route path="/servizi" element={<ServicesOverviewPage />} />
              <Route path="/agenzie" element={<AgencyPage />} />
              <Route path="/servizi/:id" element={<LandingPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<ArticlePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}
