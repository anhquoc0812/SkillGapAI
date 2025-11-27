import { Home, Upload, History, LogIn, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink 
              to="/" 
              className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors"
              activeClassName="text-primary"
              end
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Home</span>
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink 
                  to="/upload" 
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  activeClassName="text-primary font-semibold"
                >
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload</span>
                </NavLink>

                <NavLink 
                  to="/history" 
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  activeClassName="text-primary font-semibold"
                >
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                </NavLink>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="gap-2"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login / Sign Up</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
