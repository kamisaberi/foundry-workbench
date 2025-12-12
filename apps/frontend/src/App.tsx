// This is the root component of our application.
// It typically contains the main layout (like a sidebar and header)
// and handles the routing between different pages.

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // A popular library for routing

// Import our page components
import DashboardPage from './pages/Dashboard';
import ExperimentsPage from './pages/Experiments';
import ModelRegistryPage from './pages/ModelRegistry';
import LoginPage from './pages/Login';

// Import our layout components
import SideNav from './components/SideNav'; // The main navigation sidebar

const App: React.FC = () => {
  // In a real app, you would have a check here to see if the user is authenticated.
  const isAuthenticated = true; // Hardcoded for this example

  if (!isAuthenticated) {
    // If the user is not logged in, we only render the Login page.
    return <LoginPage />;
  }

  // If the user is authenticated, we render the main application layout.
  return (
    // The BrowserRouter component enables routing for our entire app.
    <BrowserRouter>
      <div className="app-layout">
        {/* The SideNav component will be visible on every page. */}
        <SideNav />

        {/* The main content area will change based on the URL. */}
        <main className="main-content">
          {/* The Routes component is where we define which component to show for which URL path. */}
          <Routes>
            {/* When the user is at "/", show the DashboardPage. */}
            <Route path="/" element={<DashboardPage />} />

            {/* When the user is at "/experiments", show the ExperimentsPage. */}
            <Route path="/experiments" element={<ExperimentsPage />} />

            {/* When the user is at "/models", show the ModelRegistryPage. */}
            <Route path="/models" element={<ModelRegistryPage />} />

            {/* A "catch-all" route could be added here for 404 Not Found pages. */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;