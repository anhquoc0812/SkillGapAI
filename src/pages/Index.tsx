import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, TrendingUp, Target, CheckCircle2, ArrowRight, BarChart3, Brain, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { SkillGapChart } from "@/components/SkillGapChart";
import { FeatureCard } from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              AI-Powered Skill Analysis
            </Badge>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Bridge Your
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Skill Gap</span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Discover the difference between your current skills and what the IT market demands. 
              Get personalized insights powered by AI to accelerate your career growth.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                View Demo <BarChart3 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI analyzes your skills against current market demands in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Upload className="h-8 w-8" />}
              title="Upload Transcript"
              description="Share your academic transcript or resume with our secure platform"
              step="1"
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI Analysis"
              description="Our AI extracts your skills and compares them with market data from thousands of job postings"
              step="2"
            />
            <FeatureCard
              icon={<Target className="h-8 w-8" />}
              title="Get Insights"
              description="Receive detailed gap analysis with actionable recommendations for skill development"
              step="3"
            />
          </div>
        </div>
      </section>

      {/* Sample Analysis */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">Visual Skill Gap Analysis</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See exactly where you stand and what skills to focus on next
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="p-6 md:p-8 shadow-lg">
              <SkillGapChart />
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">Powerful Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to stay competitive in the IT job market
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Market Data</h3>
              <p className="text-muted-foreground">
                Analysis based on current job postings and industry trends
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">
                Get comprehensive analysis in seconds with our AI engine
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
              <p className="text-muted-foreground">
                Personalized learning paths and skill recommendations
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Reports</h3>
              <p className="text-muted-foreground">
                Easy-to-understand charts and graphs of your skill profile
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
              <p className="text-muted-foreground">
                Discover which roles match your current and potential skillset
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Advanced algorithms trained on millions of job requirements
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <div className="relative z-10 p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 md:text-4xl">
                Ready to Close Your Skill Gap?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of IT students who have transformed their careers with data-driven insights
              </p>
              <Button size="lg" variant="secondary" className="gap-2 shadow-xl">
                Start Your Analysis <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              © 2025 Skill Gap AI. Empowering IT students with intelligent career insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
