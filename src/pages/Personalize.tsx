import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Code2, Loader2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AVAILABLE_SKILLS = [
  // Programming Languages
  "JavaScript", "Python", "Java", "C++", "C#", "TypeScript", "PHP", "Ruby", "Go", "Swift", "Kotlin", "Rust",
  // Frontend
  "React", "Vue.js", "Angular", "HTML/CSS", "Tailwind CSS", "Next.js", "Svelte",
  // Backend
  "Node.js", "Django", "Spring Boot", "Express.js", "FastAPI", ".NET", "Laravel",
  // Database
  "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase",
  // DevOps & Cloud
  "Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Linux",
  // Data & AI
  "Machine Learning", "Data Analysis", "TensorFlow", "PyTorch", "Pandas", "NumPy",
  // Mobile
  "React Native", "Flutter", "iOS Development", "Android Development",
  // Other
  "Git", "REST API", "GraphQL", "Agile/Scrum", "Unit Testing"
];

const DREAM_JOBS = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "Cloud Architect",
  "Security Engineer",
  "Game Developer",
  "UI/UX Designer",
  "QA Engineer",
  "Other"
];

const Personalize = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
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

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("custom_skills, dream_job")
        .eq("id", user.id)
        .maybeSingle();

      // Pre-fill existing values if they exist (allow editing)
      if (profile?.custom_skills && Array.isArray(profile.custom_skills)) {
        setSelectedSkills(profile.custom_skills);
      }
      if (profile?.dream_job) {
        setSelectedJob(profile.dream_job);
      }
    } catch (error) {
      console.error("Error checking profile:", error);
    } finally {
      setCheckingProfile(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async () => {
    if (selectedSkills.length === 0) {
      toast.error("Please select at least one skill you have");
      return;
    }
    
    if (!selectedJob) {
      toast.error("Please select your dream job");
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
          custom_skills: selectedSkills,
          dream_job: selectedJob
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
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Code2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-3xl">
            {selectedSkills.length > 0 || selectedJob ? "Update Your Preferences" : "Welcome! Let's Get Started"}
          </CardTitle>
          <CardDescription className="text-base">
            {selectedSkills.length > 0 || selectedJob 
              ? "Update your settings to personalize your transcript analysis"
              : "Help us personalize your experience by telling us about your skills"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">What skills do you have?</h3>
              {selectedSkills.length > 0 && (
                <Badge variant="secondary">{selectedSkills.length} selected</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SKILLS.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <Button
                    key={skill}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className="h-auto py-2 px-3"
                    onClick={() => toggleSkill(skill)}
                  >
                    {isSelected && <Check className="h-3 w-3 mr-1" />}
                    {skill}
                  </Button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">What is your dream job?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DREAM_JOBS.map((job) => (
                <Button
                  key={job}
                  variant={selectedJob === job ? "default" : "outline"}
                  className="h-auto py-3 text-left justify-start"
                  onClick={() => setSelectedJob(job)}
                >
                  {job}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || selectedSkills.length === 0 || !selectedJob}
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
