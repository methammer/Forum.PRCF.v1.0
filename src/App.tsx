import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import { Toaster } from "@/components/ui/toaster" // For Shadcn UI Toasts

function App() {
  return (
    <>
      <Routes>
        <Route path="/connexion" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}> {/* Ensures user is authenticated */}
          <Route element={<MainLayout />}> {/* Common layout for authenticated views */}
            <Route path="/" element={<HomePage />} />
            {/* Future protected routes will be nested here, e.g.: */}
            {/* <Route path="/forum" element={<ForumPage />} /> */}
            {/* <Route path="/profil" element={<ProfilePage />} /> */}
          </Route>
        </Route>
        {/* You can add a 404 page here if needed */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <Toaster /> {/* Add Toaster for Shadcn UI toasts */}
    </>
  );
}

export default App;
