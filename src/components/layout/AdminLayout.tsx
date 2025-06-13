import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Users, Settings, FolderKanban, MessageSquareText, ArrowLeftToLine } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { signOut, profile } = useUser();

  const handleSignOut = async () => {
    await signOut();
    navigate('/connexion'); 
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-72 bg-gray-800 dark:bg-gray-950 shadow-md flex flex-col text-white">
        <div className="p-6 border-b border-gray-700 dark:border-gray-800">
          <h1 className="text-2xl font-bold flex items-center">
            <Settings className="mr-3 h-7 w-7 text-blue-400" />
            Admin PRCF
          </h1>
          {profile && (
            <p className="text-sm text-gray-400 mt-1">Connecté: {profile.username || profile.full_name || profile.id}</p>
          )}
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700"
            onClick={() => navigate('/admin')}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Tableau de bord
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700"
            onClick={() => navigate('/admin/users')}
          >
            <Users className="mr-3 h-5 w-5" />
            Gestion des Utilisateurs
          </Button>
          <Button
            variant="ghost"
            disabled 
            className="w-full justify-start text-gray-500 cursor-not-allowed"
            title="Prochainement"
          >
            <FolderKanban className="mr-3 h-5 w-5" />
            Gestion des Catégories
          </Button>
           <Button
            variant="ghost"
            disabled 
            className="w-full justify-start text-gray-500 cursor-not-allowed"
            title="Prochainement"
          >
            <MessageSquareText className="mr-3 h-5 w-5" />
            Gestion des Sujets
          </Button>
          <hr className="my-2 border-gray-700 dark:border-gray-600" />
           <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700"
            onClick={() => navigate('/')}
          >
            <ArrowLeftToLine className="mr-3 h-5 w-5" />
            Retour au site principal
          </Button>
        </nav>
        <div className="p-4 border-t border-gray-700 dark:border-gray-800">
          <Button
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Déconnexion
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-auto bg-gray-50 dark:bg-gray-800/30">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;
