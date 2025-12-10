import { Upload, History, LogIn, LogOut, User, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoImage from "@/assets/logo.png";

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
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              activeClassName=""
              end
            >
              <div className="flex items-center gap-2">
                <img src={logoImage} alt="SkillGap AI Logo" className="h-9 w-auto" />
                <span className="font-bold text-lg tracking-tight">
                  <span className="text-primary">Skill</span>
                  <span className="text-foreground">Gap</span>
                </span>
              </div>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
