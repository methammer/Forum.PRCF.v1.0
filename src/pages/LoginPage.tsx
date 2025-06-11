import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, LogIn } from 'lucide-react'; // Lucide icons

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message || "Une erreur s'est produite lors de la connexion.");
    } else {
      navigate('/'); // Redirect to home page on successful login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-2xl bg-slate-800/50 backdrop-blur-lg border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-600/20 rounded-full w-fit">
            <LogIn className="h-10 w-10 text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-100">Connexion au Forum Privé</CardTitle>
          <CardDescription className="text-slate-400">
            Accédez à l'espace de discussion du PRCF.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votreadresse@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {error && (
              <div className="flex items-center p-3 text-sm text-red-400 bg-red-900/30 rounded-md border border-red-700">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-3 pt-6">
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
            Mot de passe oublié ?
          </a>
          <p className="text-xs text-center text-slate-500 px-4">
            L'inscription est soumise à validation par un administrateur.
            Veuillez contacter la direction pour la création de votre compte.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
