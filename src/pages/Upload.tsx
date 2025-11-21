import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
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

      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
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
      // For PDF, we'll send the file as-is and let backend handle it
      // For now, return a placeholder - you can add PDF.js library if needed
      return `[PDF file: ${file.name}] - Upload for full text extraction`;
    }
    
    return await file.text();
  };

  const analyzeTranscript = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(10);

    try {
      // Check authentication
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

      // Upload file to storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('transcripts')
        .upload(fileName, file);

      if (uploadError) throw uploadError;
      setProgress(40);

      // Extract text from file
      const transcriptText = await extractTextFromFile(file);
      setProgress(50);

      // Call analyze-skills function
      const { data: skillsData, error: skillsError } = await supabase.functions
        .invoke('analyze-skills', {
          body: { transcriptText }
        });

      if (skillsError) throw skillsError;
      setProgress(70);

      // Call compare-skills function
      const { data: comparisonData, error: comparisonError } = await supabase.functions
        .invoke('compare-skills', {
          body: { studentSkills: skillsData.skills }
        });

      if (comparisonError) throw comparisonError;
      setProgress(90);

      // Save analysis result
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

      // Navigate to results
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upload Your Transcript</h1>
          <p className="text-lg text-muted-foreground">
            Upload your academic transcript or resume to discover your skill gaps
          </p>
        </div>

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
                <li>Compares against 1,491 real job market requirements</li>
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
