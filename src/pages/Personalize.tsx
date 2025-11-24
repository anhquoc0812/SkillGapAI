import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Code2, Loader2 } from "lucide-react";

const PROGRAMMING_LANGUAGES = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "TypeScript",
  "PHP",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "Rust",
  "Other"
];

const Personalize = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    checkExistingProfile();
  }, []);

  const checkExistingProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("main_language")
        .eq("id", user.id)
        .single();

      if (profile?.main_language) {
        navigate("/upload");
      }
    } catch (error) {
      console.error("Error checking profile:", error);
    } finally {
      setCheckingProfile(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedLanguage) {
      toast.error("Please select your main programming language");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .upsert({ 
          id: user.id,
          main_language: selectedLanguage 
        });

      if (error) throw error;

      toast.success("Profile updated successfully!");
      navigate("/upload");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Code2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-3xl">Welcome! Let's Get Started</CardTitle>
          <CardDescription className="text-base">
            Help us personalize your experience by telling us about your programming background
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">What is your main programming language?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROGRAMMING_LANGUAGES.map((language) => (
                <Button
                  key={language}
                  variant={selectedLanguage === language ? "default" : "outline"}
                  className="h-auto py-3 text-left justify-start"
                  onClick={() => setSelectedLanguage(language)}
                >
                  {language}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || !selectedLanguage}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Personalize;