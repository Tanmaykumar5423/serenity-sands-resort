import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AccommodationsPage } from './pages/AccommodationsPage';
import { DiningPage } from './pages/DiningPage';
import { LocalGuidePage } from './pages/LocalGuidePage';
import { ChatBot } from './components/ChatBot';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accommodations" element={<AccommodationsPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/local-guide" element={<LocalGuidePage />} />
        </Routes>
      </Layout>
      <ChatBot />
    </Router>
  );
}

export default App;