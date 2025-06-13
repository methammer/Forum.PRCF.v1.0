import { Routes, Route } from 'react-router-dom';
    import LoginPage from './pages/LoginPage';
    import SignUpPage from './pages/SignUpPage'; // Import SignUpPage
    import HomePage from './pages/HomePage';
    import ProtectedRoute from './components/auth/ProtectedRoute';
    import MainLayout from './components/layout/MainLayout';
    import { Toaster } from "@/components/ui/toaster";

    function App() {
      return (
        <>
          <Routes>
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<SignUpPage />} /> {/* Add SignUpPage route */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/forum" element={<ForumPage />} /> */}
                {/* <Route path="/profil" element={<ProfilePage />} /> */}
              </Route>
            </Route>
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
          <Toaster />
        </>
      );
    }

    export default App;
