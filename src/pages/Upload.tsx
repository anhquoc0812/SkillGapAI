import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, FileText, Loader2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  main_language: string | null;
  dream_job: string | null;
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkPersonalization();
  }, []);

  const checkPersonalization = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('main_language, dream_job')
        .eq('id', user.id)
        .maybeSingle();

      // If no profile exists or fields are missing, go to personalize
      if (!profileData || !profileData.main_language || !profileData.dream_job) {
        navigate('/personalize');
        return;
      }
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error checking profile:', error);
      navigate('/personalize');
    } finally {
      setCheckingProfile(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'text/plain', 'application/msword', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          'text/csv'];
      
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, TXT, DOCX, or CSV file",
          variant: "destructive"
        });
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === 'text/plain' || file.type === 'text/csv') {
      return await file.text();
    }
    
    if (file.type === 'application/pdf') {
      return `[PDF file: ${file.name}] - Upload for full text extraction`;
    }
    
    return await file.text();
  };

  const analyzeTranscript = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(10);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to analyze your transcript",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      setProgress(20);

      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('transcripts')
        .upload(fileName, file);

      if (uploadError) throw uploadError;
      setProgress(40);

      const transcriptText = await extractTextFromFile(file);
      setProgress(50);

      // Call analyze-skills function with personalization
      const { data: skillsData, error: skillsError } = await supabase.functions
        .invoke('analyze-skills', {
          body: { 
            transcriptText,
            mainLanguage: profile?.main_language
          }
        });

      if (skillsError) throw skillsError;
      setProgress(70);

      // Call compare-skills function with dream job
      const { data: comparisonData, error: comparisonError } = await supabase.functions
        .invoke('compare-skills', {
          body: { 
            studentSkills: skillsData.skills,
            dreamJob: profile?.dream_job
          }
        });

      if (comparisonError) throw comparisonError;
      setProgress(90);

      const { data: analysisData, error: insertError } = await supabase
        .from('skill_analyses')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_url: uploadData.path,
          student_skills: skillsData.skills,
          market_skills: comparisonData.chartData,
          skill_gaps: comparisonData.skillGaps,
          match_percentage: comparisonData.matchPercentage,
          market_readiness: comparisonData.marketReadiness
        })
        .select()
        .single();

      if (insertError) throw insertError;
      setProgress(100);

      toast({
        title: "Analysis complete!",
        description: `Found ${skillsData.skills.length} skills with ${comparisonData.matchPercentage}% market match`
      });

      navigate(`/results/${analysisData.id}`);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze transcript",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upload Your Transcript</h1>
          <p className="text-lg text-muted-foreground">
            Upload your academic transcript or resume to discover your skill gaps
          </p>
        </div>

        {/* Current Preferences Card */}
        <Card className="p-6 mb-6 border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                Analysis Settings
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium text-foreground">Main Language:</span> {profile?.main_language}
                </p>
                <p>
                  <span className="font-medium text-foreground">Dream Job:</span> {profile?.dream_job}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your transcript will be analyzed based on skills required for <strong>{profile?.dream_job}</strong>
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/personalize')}
            >
              Change
            </Button>
          </div>
        </Card>

        <Card className="p-8">
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.txt,.doc,.docx,.csv"
                onChange={handleFileChange}
                disabled={isAnalyzing}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {file ? (
                  <div className="space-y-4">
                    <FileText className="w-16 h-16 mx-auto text-primary" />
                    <div>
                      <p className="text-lg font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button variant="outline" size="sm" type="button">
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <UploadIcon className="w-16 h-16 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">Click to upload</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, TXT, DOCX, or CSV (max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            {/* Progress Bar */}
            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing transcript...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={analyzeTranscript}
              disabled={!file || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Transcript'
              )}
            </Button>

            {/* Info */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">What happens next?</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>AI extracts all skills from your document</li>
                <li>Compares against <strong>{profile?.dream_job}</strong> requirements</li>
                <li>Identifies critical skill gaps and opportunities</li>
                <li>Generates personalized learning roadmap</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}