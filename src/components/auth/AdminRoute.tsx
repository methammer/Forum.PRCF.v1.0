import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Loader2 } from 'lucide-react';

console.log('[AdminRoute.tsx MODULE] Evaluating');

const AdminRoute = () => {
  const { session, profile, isLoadingAuth } = useUser();
  const location = useLocation();
  console.log(`[AdminRoute] Rendering. isLoadingAuth: ${isLoadingAuth}, session: ${session ? 'exists' : 'null'}, profile status: ${profile?.status}, profile role: ${profile?.role}`);

  if (isLoadingAuth) {
    console.log('[AdminRoute] Rendering: Loader (isLoadingAuth is true)');
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Vérification de l'accès administrateur...</p>
      </div>
    );
  }

  if (!session) {
    console.log('[AdminRoute] Rendering: Navigate to /connexion (no session)');
    return <Navigate to="/connexion" replace state={{ from: location, message: "Accès administrateur refusé. Veuillez vous connecter." }} />;
  }

  if (!profile) {
    // This case might happen briefly if session exists but profile is still fetching,
    // or if profile fetch failed. isLoadingAuth should ideally cover this.
    // If profile is definitively null after loading, it's an issue.
    console.log('[AdminRoute] Rendering: Navigate to /connexion (no profile after load)');
    return <Navigate to="/connexion" replace state={{ from: location, message: "Profil administrateur introuvable ou non chargé." }} />;
  }

  if (profile.status !== 'approved') {
    console.log(`[AdminRoute] Rendering: Navigate to / (profile status not approved: ${profile.status})`);
    return <Navigate to="/" replace state={{ from: location, message: "Votre compte n'est pas approuvé pour l'accès administrateur." }} />;
  }

  if (profile.role !== 'admin') {
    console.log(`[AdminRoute] Rendering: Navigate to / (profile role not admin: ${profile.role})`);
    return <Navigate to="/" replace state={{ from: location, message: "Accès refusé. Vous n'avez pas les droits d'administrateur." }} />;
  }

  console.log('[AdminRoute] Rendering: Outlet (admin access granted)');
  return <Outlet />;
};

export default AdminRoute;
