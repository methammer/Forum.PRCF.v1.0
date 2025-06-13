import { useEffect, useState, useCallback, useRef } from 'react';
    import { supabase } from '@/lib/supabaseClient';
    import { Navigate, Outlet, useLocation } from 'react-router-dom';
    import { Session, User } from '@supabase/supabase-js';
    import { Loader2 } from 'lucide-react';

    console.log('[ProtectedRoute.tsx MODULE] Evaluating (v8.9)');

    type ProfileStatus = 'approved' | 'pending_approval' | 'rejected' | 'not_found' | 'error_fetching' | null;

    const ProtectedRoute = () => {
      console.log('[ProtectedRoute] Component rendering/re-rendering (v8.9)');
      const [session, setSession] = useState<Session | null>(null);
      const [profileStatus, setProfileStatus] = useState<ProfileStatus>(null);
      const [isInitialAuthCheckComplete, setIsInitialAuthCheckComplete] = useState(false);
      const location = useLocation();
      
      const isProcessingAuthRef = useRef(false);

      const fetchAndSetProfileStatus = useCallback(async (user: User): Promise<ProfileStatus> => {
        const logPrefix = '[ProtectedRoute] fetchAndSetProfileStatus (v8.9)';
        console.log(`${logPrefix} START for user ID: ${user.id}`);
        try {
          console.log(`${logPrefix} - STEP 1: Inside main try block.`);
          if (!user || !user.id) {
            console.error(`${logPrefix} - STEP 1.1: Invalid user object. User:`, user);
            return 'error_fetching';
          }
          console.log(`${logPrefix} - STEP 2: User object valid. User ID: ${user.id}`);
          
          console.log(`${logPrefix} - STEP 3: PRE-QUERY - About to call supabase.from('profiles').select('id, status').eq('id', user.id).maybeSingle()`);
          let profileData: any = null;
          let profileErrorData: any = null;

          try {
            console.log(`${logPrefix} - STEP 3.1: Entering Supabase query try block (using .maybeSingle()).`);
            const { data, error } = await supabase
              .from('profiles')
              .select('id, status')
              .eq('id', user.id)
              .maybeSingle(); 
            profileData = data;
            profileErrorData = error;
            console.log(`${logPrefix} - STEP 3.2: Supabase query await FINISHED.`);
          } catch (queryError: any) {
            console.error(`${logPrefix} - STEP 3.CATCH: EXCEPTION during Supabase query await: ${queryError.message}`, queryError);
            profileErrorData = queryError; 
          }

          console.log(`${logPrefix} - STEP 4: Supabase query processing. Error: ${profileErrorData ? JSON.stringify(profileErrorData) : 'null'}, Data: ${profileData ? JSON.stringify(profileData) : 'null'}`);
      
          if (profileErrorData) {
            console.error(`${logPrefix} - STEP 5: Profile error from Supabase. Code: ${profileErrorData.code}, Message: ${profileErrorData.message}, Details: ${profileErrorData.details}, Hint: ${profileErrorData.hint}`);
            return 'error_fetching';
          }
      
          if (profileData) {
            console.log(`${logPrefix} - STEP 6: Profile found. Status: '${profileData.status}'.`);
            switch (profileData.status) {
              case 'approved': return 'approved';
              case 'pending_approval': return 'pending_approval';
              case 'rejected': return 'rejected';
              default:
                console.warn(`${logPrefix} - STEP 6.1: Profile found but status is unknown: '${profileData.status}'`);
                return 'error_fetching';
            }
          }
          console.warn(`${logPrefix} - STEP 7: No profile data returned (0 rows found for user ID ${user.id}).`);
          return 'not_found'; 
        } catch (e: any) { 
          console.error(`${logPrefix} - STEP CATCH (OUTER): Unexpected error in fetchAndSetProfileStatus: ${e.message}`, e);
          return 'error_fetching';
        } finally {
          console.log(`${logPrefix} - STEP FINALLY: Executing finally block.`);
        }
      }, []);
    
      useEffect(() => {
        let isEffectMounted = true;
        const logPrefix = '[ProtectedRoute] useEffect (v8.9)';
        console.log(`${logPrefix} Mount/Re-run. isEffectMounted initially true.`);

        const processNewAuthSession = async (newSession: Session | null, source: string) => {
            const processLogPrefix = `[ProtectedRoute] processNewAuthSession (from ${source}, v8.9)`;

            if (isProcessingAuthRef.current) {
                console.log(`${processLogPrefix} - Auth processing already in progress. Skipping.`);
                return;
            }
            isProcessingAuthRef.current = true;
            console.log(`${processLogPrefix} - START. New Session:`, newSession ? `User ID: ${newSession.user.id}` : 'null');

            try {
                if (newSession?.user) {
                    const status = await fetchAndSetProfileStatus(newSession.user);
                    if (!isEffectMounted) {
                        console.log(`${processLogPrefix} - Component unmounted during profile fetch. Aborting state update.`);
                        isProcessingAuthRef.current = false; // Reset ref if unmounted during async
                        return;
                    }
                    console.log(`${processLogPrefix} - Profile status: ${status}`);
                    if (status === 'error_fetching' || status === 'not_found') {
                        console.warn(`${processLogPrefix} - Profile error ('${status}'). Signing out.`);
                        // Let onAuthStateChange handle the state update after signOut
                        await supabase.auth.signOut(); 
                    } else {
                        setSession(newSession);
                        setProfileStatus(status);
                    }
                } else { // newSession is null
                    if (!isEffectMounted) {
                         console.log(`${processLogPrefix} - Component unmounted. Aborting state update for null session.`);
                         isProcessingAuthRef.current = false; // Reset ref
                         return;
                    }
                    setSession(null);
                    setProfileStatus(null);
                }
            } catch (error) {
                console.error(`${processLogPrefix} - EXCEPTION:`, error);
                if (isEffectMounted) {
                    setSession(null);
                    setProfileStatus('error_fetching'); 
                }
            } finally {
                if (isEffectMounted) {
                    setIsInitialAuthCheckComplete(true);
                }
                isProcessingAuthRef.current = false;
                console.log(`${processLogPrefix} - END. isInitialAuthCheckComplete will be true in next render (if mounted).`);
            }
        };

        console.log(`${logPrefix} - Calling getSession.`);
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            if (isEffectMounted) {
                console.log(`${logPrefix} - getSession resolved. Initial Session:`, initialSession ? `User ID: ${initialSession.user.id}` : 'null');
                processNewAuthSession(initialSession, 'getSession');
            } else {
                console.log(`${logPrefix} - getSession resolved but component unmounted.`);
            }
        }).catch(error => {
            if (isEffectMounted) {
                console.error(`${logPrefix} - getSession error:`, error);
                processNewAuthSession(null, 'getSession_error');
            } else {
                console.error(`${logPrefix} - getSession error but component unmounted:`, error);
            }
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                const eventLogPrefix = `[ProtectedRoute] onAuthStateChange (event: ${_event}, v8.9)`;
                if (!isEffectMounted) {
                    console.log(`${eventLogPrefix} - Listener triggered but component unmounted.`);
                    return;
                }
                console.log(`${eventLogPrefix} - Triggered. New Session:`, newSession ? `User ID: ${newSession.user.id}` : 'null');
                processNewAuthSession(newSession, `onAuthStateChange-${_event}`);
            }
        );

        return () => {
            console.log(`${logPrefix} - Cleanup. Unsubscribing. Setting isEffectMounted to false.`);
            isEffectMounted = false;
            authListener?.subscription.unsubscribe();
        };
      }, [fetchAndSetProfileStatus]); // Only stable dependency
    
      console.log(`[ProtectedRoute] Before rendering checks (v8.9): isInitialAuthCheckComplete=${isInitialAuthCheckComplete}, session=${session ? 'exists' : 'null'}, profileStatus=${profileStatus}`);
    
      if (!isInitialAuthCheckComplete) {
        console.log('[ProtectedRoute] Rendering: Loader (isInitialAuthCheckComplete is false)');
        return (
          <div className="flex items-center justify-center h-screen bg-background text-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg">Vérification de l'accès...</p>
          </div>
        );
      }
    
      if (!session) {
        console.log('[ProtectedRoute] Rendering: Navigate to /connexion (no session after initial check)');
        return <Navigate to="/connexion" replace state={{ from: location, message: "Vous devez être connecté pour accéder à cette page." }} />;
      }
    
      if (profileStatus === 'error_fetching' || profileStatus === 'not_found') {
         console.log(`[ProtectedRoute] Rendering: Navigate to /connexion (profile status: ${profileStatus} after checks)`);
        return <Navigate to="/connexion" replace state={{ from: location, message: "Un problème est survenu avec votre profil. Veuillez vous reconnecter ou contacter un administrateur." }} />;
      }
    
      if (profileStatus !== 'approved') {
        let message = "Votre compte n'est pas encore approuvé ou son statut est indéterminé.";
        if (profileStatus === 'pending_approval') {
          message = "Votre compte est en attente d'approbation.";
        } else if (profileStatus === 'rejected') {
          message = "L'accès à votre compte a été refusé.";
        } else if (profileStatus === null && session.user) { 
          message = "Le statut de votre profil est en cours de vérification ou n'a pas pu être déterminé. Veuillez patienter ou contacter un administrateur si le problème persiste.";
        }
        console.log(`[ProtectedRoute] Rendering: Navigate to /connexion (profile status: ${profileStatus}, message: ${message})`);
        return <Navigate to="/connexion" replace state={{ from: location, message }} />;
      }
    
      console.log('[ProtectedRoute] Rendering: Outlet (session exists and profile approved)');
      return <Outlet />;
    };

    export default ProtectedRoute;
