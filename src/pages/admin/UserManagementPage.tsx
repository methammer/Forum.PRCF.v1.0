import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const UserManagementPage = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Gestion des Utilisateurs
        </h1>
        <p className="mt-1 text-md text-gray-600 dark:text-gray-300">
          Visualiser, modifier et gérer les comptes utilisateurs.
        </p>
      </header>

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-white">
            <Users className="mr-2 h-6 w-6 text-blue-500 dark:text-blue-400" />
            Liste des Utilisateurs
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Fonctionnalités de gestion des utilisateurs à implémenter ici (ex: tableau des utilisateurs, actions de modification de rôle/statut, suppression).
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            Le tableau de gestion des utilisateurs sera affiché ici.
          </p>
        </CardContent>
      </Card>
      
      {/* Add more sections as needed, e.g., for pending approvals, role assignments, etc. */}
    </div>
  );
};

export default UserManagementPage;
