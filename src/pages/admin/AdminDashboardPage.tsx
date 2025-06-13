import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { BarChart, Users, MessageSquareText, FolderKanban, UserCheck } from "lucide-react"; // Added UserCheck

const AdminDashboardPage = () => {
  const { profile } = useUser();

  return (
    <div className="space-y-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Tableau de Bord Administrateur
        </h1>
        {profile && (
          <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">
            Bienvenue, {profile.username || profile.full_name || "Admin"} !
          </p>
        )}
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Utilisateurs Enregistrés
            </CardTitle>
            <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">1,234</div> {/* Placeholder */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +20.1% depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sujets du Forum
            </CardTitle>
            <MessageSquareText className="h-5 w-5 text-green-500 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">582</div> {/* Placeholder */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +12 nouveaux aujourd'hui
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Catégories Actives
            </CardTitle>
            <FolderKanban className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div> {/* Placeholder */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Actuellement gérées
            </p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Approbations en Attente
            </CardTitle>
            <UserCheck className="h-5 w-5 text-red-500 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div> {/* Placeholder */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Utilisateurs à vérifier
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 dark:text-white">Activité Récente du Site</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Aperçu de l'engagement des utilisateurs (données fictives).
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-md">
          <BarChart className="h-32 w-32 text-gray-400 dark:text-gray-500" />
          <p className="ml-4 text-gray-500 dark:text-gray-400">Données graphiques à venir...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
