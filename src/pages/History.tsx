import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Analysis {
  id: string;
  file_name: string;
  match_percentage: number;
  market_readiness: number;
  created_at: string;
  skill_gaps: any[];
}

const History = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoadHistory();
  }, []);

  const checkAuthAndLoadHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("skill_analyses")
        .select("id, file_name, match_percentage, market_readiness, created_at, skill_gaps")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAnalyses((data || []) as Analysis[]);
    } catch (error) {
      console.error("Error loading history:", error);
      toast.error("Failed to load analysis history");
    } finally {
      setLoading(false);
    }
  };

  const getReadinessColor = (readiness: number) => {
    if (readiness >= 80) return "bg-green-500/10 text-green-700 dark:text-green-400";
    if (readiness >= 60) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    return "bg-red-500/10 text-red-700 dark:text-red-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analysis History</h1>
          <p className="text-muted-foreground">
            Review your past skill gap analyses and track your progress
          </p>
        </div>

        {analyses.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Analyses Yet</h3>
            <p className="text-muted-foreground mb-6">
              Upload your first transcript to get started with skill gap analysis
            </p>
            <Button onClick={() => navigate("/upload")}>
              Upload Transcript <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {analyses.map((analysis) => (
              <Card 
                key={analysis.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/results/${analysis.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <Badge className={getReadinessColor(analysis.market_readiness)}>
                      {analysis.market_readiness}% Ready
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">
                    {analysis.file_name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(analysis.created_at), "MMM dd, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Match</span>
                      <span className="font-semibold">{analysis.match_percentage}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Skill Gaps</span>
                      <span className="font-semibold">{analysis.skill_gaps?.length || 0}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/results/${analysis.id}`);
                      }}
                    >
                      View Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
