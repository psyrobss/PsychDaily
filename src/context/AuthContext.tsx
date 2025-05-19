'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseInitialized } from '@/lib/supabase'; // Import type guard
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react'; // For error banner icon

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isSupabaseConfigured: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false); // Default to false

  useEffect(() => {
    if (isSupabaseInitialized(supabase)) {
      setIsSupabaseConfigured(true); // Mark as configured if client exists
      const getInitialSession = async () => {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.error('AuthContext: Error getting initial session:', error.message);
          }
          if (data.session) {
            setSession(data.session);
            setUser(data.session.user);
          }
        } catch (e) {
            console.error('AuthContext: Exception during getInitialSession:', e);
        } finally {
          setLoading(false);
        }
      };

      getInitialSession();

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          // If it was loading and now session is determined (even if null), stop loading
          if (loading) { 
            setLoading(false);
          }
        }
      );
      return () => {
        authListener.subscription.unsubscribe();
      };
    } else {
      // Supabase is not configured (URL/Key missing or invalid in .env.local)
      console.error(
        "AuthContext: Supabase client is not initialized. Authentication will not work. " +
        "Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correctly set in .env.local and the server is restarted."
      );
      setIsSupabaseConfigured(false);
      setLoading(false); // Stop loading as auth cannot proceed
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount to check config and set up listener


  // This loading state is for the initial determination of Supabase config and session
  if (loading) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-4 w-[250px] mb-2" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, session, loading: false, isSupabaseConfigured }}>
      {!isSupabaseConfigured && (
         <div className="bg-destructive text-destructive-foreground p-3 text-center text-sm font-sans flex items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Authentication Service Error: Supabase is not configured. Please check your <code>.env.local</code> file and server console for details.</span>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
