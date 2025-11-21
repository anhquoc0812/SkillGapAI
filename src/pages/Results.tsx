import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, TrendingUp, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkillGapChart } from '@/components/SkillGapChart';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  id: string;
  file_name: string;
  student_skills: any;
  market_skills: any;
  skill_gaps: any;
  match_percentage: number;
  market_readiness: number;
  created_at: string;
}

export default function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, [id]);

  const loadAnalysis = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('skill_analyses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Parse JSONB fields
      const parsedData = {
        ...data,
        student_skills: Array.isArray(data.student_skills) ? data.student_skills : [],
        market_skills: Array.isArray(data.market_skills) ? data.market_skills : [],
        skill_gaps: Array.isArray(data.skill_gaps) ? data.skill_gaps : []
      };
      
      setAnalysis(parsedData);
    } catch (error) {
      console.error('Error loading analysis:', error);
      toast({
        title: "Error loading results",
        description: "Failed to load your skill analysis",
        variant: "destructive"
      });
      navigate('/upload');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Analysis not found</p>
          <Button onClick={() => navigate('/upload')}>Upload New Transcript</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Skill Gap Analysis</h1>
          <p className="text-muted-foreground">
            Analysis for {analysis.file_name} • {new Date(analysis.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Match Score</p>
                <p className="text-4xl font-bold text-primary">{analysis.match_percentage}%</p>
                <p className="text-sm text-muted-foreground mt-2">vs. Market Demand</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Market Readiness</p>
                <p className="text-4xl font-bold text-accent">{analysis.market_readiness}%</p>
                <p className="text-sm text-muted-foreground mt-2">Job Market Ready</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Critical Gaps</p>
                <p className="text-4xl font-bold text-destructive">{analysis.skill_gaps.length}</p>
                <p className="text-sm text-muted-foreground mt-2">Skills to Learn</p>
              </div>
              <Target className="h-8 w-8 text-destructive" />
            </div>
          </Card>
        </div>

        {/* Chart */}
        <Card className="p-8 mb-12">
          <SkillGapChart data={analysis.market_skills} />
        </Card>

        {/* Your Skills */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Current Skills</h2>
          <div className="flex flex-wrap gap-2">
            {analysis.student_skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Total: {analysis.student_skills.length} skills identified
          </p>
        </Card>

        {/* Skill Gaps */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-4">Priority Learning Roadmap</h2>
          <p className="text-muted-foreground mb-6">
            Focus on these high-demand skills to maximize your job market competitiveness
          </p>
          <div className="space-y-4">
            {analysis.skill_gaps.slice(0, 8).map((gap, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold capitalize">{gap.skill}</p>
                    <p className="text-sm text-muted-foreground">
                      Required in {gap.percentage}% of job listings ({gap.count} jobs)
                    </p>
                  </div>
                </div>
                <Badge variant={index < 3 ? "destructive" : "secondary"}>
                  {index < 3 ? "Critical" : "Important"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" onClick={() => navigate('/upload')}>
            Analyze Another Transcript
          </Button>
        </div>
      </div>
    </div>
  );
}
