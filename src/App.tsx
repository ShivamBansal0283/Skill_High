import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import 'boxicons/css/boxicons.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';

import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Course from './pages/Course';
import ErrorPage from './components/ErrorPage';
import './App.css';

// Define type for children prop in ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

const App: React.FC = () => {
  const isLoggedIn = localStorage.getItem('token') !== null;

  // ProtectedRoute component with children prop type defined
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Sidebar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/course-analytics" element={<Course />} />
                </Routes>
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={<ErrorPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;