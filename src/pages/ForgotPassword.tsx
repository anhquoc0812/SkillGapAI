import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, CheckCircle, Mail, KeyRound, Lock, ArrowLeft } from 'lucide-react';

type Step = 'email' | 'otp' | 'password' | 'success';

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await supabase.functions.invoke('send-password-reset', {
        body: { email }
      });

      if (response.error) {
        throw new Error("Failed to send OTP");
      }

      toast({
        title: "OTP Sent",
        description: "Check your email for the 6-digit code"
      });
      setStep('otp');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send OTP",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const response = await supabase.functions.invoke('verify-otp', {
        body: { email, otp }
      });

      if (response.error) {
        throw new Error(response.error.message || "Invalid OTP");
      }

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "OTP Verified",
        description: "You can now set your new password"
      });
      setStep('password');
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid or expired OTP",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const response = await supabase.functions.invoke('reset-password', {
        body: { email, otp, newPassword: password }
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to reset password");
      }

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }

      setStep('success');
      toast({
        title: "Password Updated!",
        description: "Your password has been reset successfully"
      });
      
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: error instanceof Error ? error.message : "Unable to reset password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke('send-password-reset', {
        body: { email }
      });

      if (response.error) {
        throw new Error("Failed to resend OTP");
      }

      toast({
        title: "OTP Resent",
        description: "Check your email for the new 6-digit code"
      });
      setOtp('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to resend OTP",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Password Updated!</h2>
              <p className="text-muted-foreground">
                Redirecting you to sign in...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            {step === 'email' && <Mail className="w-6 h-6 text-primary-foreground" />}
            {step === 'otp' && <KeyRound className="w-6 h-6 text-primary-foreground" />}
            {step === 'password' && <Lock className="w-6 h-6 text-primary-foreground" />}
          </div>
          <CardTitle className="text-2xl">
            {step === 'email' && 'Forgot Password'}
            {step === 'otp' && 'Enter OTP'}
            {step === 'password' && 'Reset Password'}
          </CardTitle>
          <CardDescription>
            {step === 'email' && 'Enter your email to receive a verification code'}
            {step === 'otp' && `Enter the 6-digit code sent to ${email}`}
            {step === 'password' && 'Create your new password'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'email' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={setOtp}
                  disabled={loading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button 
                className="w-full" 
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <button
                type="button"
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={handleResendOtp}
                disabled={loading}
              >
                Didn't receive the code? Resend
              </button>
            </>
          )}

          {step === 'password' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 6 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </>
          )}

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            onClick={() => navigate('/auth')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
