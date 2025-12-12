import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
});

const getPasswordStrength = (password: string): { level: 'weak' | 'medium' | 'strong'; label: string; color: string } => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 'weak', label: 'Weak', color: 'bg-destructive' };
  if (score <= 3) return { level: 'medium', label: 'Medium', color: 'bg-yellow-500' };
  return { level: 'strong', label: 'Strong', color: 'bg-green-500' };
};

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const passwordStrength = getPasswordStrength(password);

  const handleAuth = async (type: 'signin' | 'signup') => {
    try {
      // Validate inputs
      const result = authSchema.safeParse({ email, password });
      if (!result.success) {
        toast({
          title: "Validation error",
          description: result.error.errors[0].message,
          variant: "destructive"
        });
        return;
      }

      setLoading(true);

      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/personalize`
          }
        });
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "Account created! Redirecting to personalization..."
        });
        navigate('/personalize');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Check if user has completed personalization
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('main_language, dream_job')
            .eq('id', data.user.id)
            .single();
          
          if (!profile?.main_language || !profile?.dream_job) {
            toast({
              title: "Welcome back!",
              description: "Please complete your profile"
            });
            navigate('/personalize');
            return;
          }
        }
        
        toast({
          title: "Welcome back!",
          description: "Signed in successfully"
        });
        navigate('/upload');
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome</h1>
          <p className="text-muted-foreground">Sign in to analyze your skill gaps</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <div className="relative">
                <Input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleAuth('signin')}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <button
              type="button"
              className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    <div className={`h-1 flex-1 rounded-full transition-colors ${password.length > 0 ? passwordStrength.color : 'bg-muted'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-colors ${passwordStrength.level !== 'weak' ? passwordStrength.color : 'bg-muted'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-colors ${passwordStrength.level === 'strong' ? passwordStrength.color : 'bg-muted'}`} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password strength: <span className={passwordStrength.level === 'weak' ? 'text-destructive' : passwordStrength.level === 'medium' ? 'text-yellow-500' : 'text-green-500'}>{passwordStrength.label}</span>
                  </p>
                </div>
              )}
              {!password && (
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p>Password must contain:</p>
                  <ul className="list-disc list-inside pl-1">
                    <li>At least 8 characters</li>
                    <li>Uppercase & lowercase letters</li>
                    <li>At least one number</li>
                    <li>Special character (!@#$%...)</li>
                  </ul>
                </div>
              )}
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleAuth('signup')}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
