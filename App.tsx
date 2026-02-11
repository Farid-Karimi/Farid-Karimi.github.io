import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TerminalHome from './pages/TerminalHome';
import ProjectArchive from './pages/ProjectArchive';
import TalksArchive from './pages/TalksArchive';
import TalkDetail from './pages/TalkDetail';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<TerminalHome />} />
            <Route path="/projects" element={<ProjectArchive />} />
            <Route path="/talks" element={<TalksArchive />} />
            <Route path="/talks/:id" element={<TalkDetail />} />
            <Route path="/contact" element={<Contact />} />
            {/* Admin route exists but is hidden from nav */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;