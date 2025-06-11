import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Navigate, Outlet } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react'; // Lucide loader icon

const ProtectedRoute = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session on component mount
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      }
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    // Listen for authentication state changes (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // No need to setLoading(false) here again unless it's the initial check
        // or if you want to re-evaluate loading state on every auth change.
        // For this setup, initial loading is enough.
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    // Display a loading indicator while checking authentication status
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Chargement de la session...</p>
      </div>
    );
  }

  if (!session) {
    // If no active session, redirect the user to the login page
    // `replace` prop ensures the redirect doesn't add to browser history
    return <Navigate to="/connexion" replace />;
  }

  // If an active session exists, render the child routes (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
