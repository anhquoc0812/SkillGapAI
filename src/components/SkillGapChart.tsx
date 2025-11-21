import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleData = [
  { skill: 'React', yourLevel: 70, marketDemand: 95, gap: 25 },
  { skill: 'Python', yourLevel: 85, marketDemand: 90, gap: 5 },
  { skill: 'AWS', yourLevel: 40, marketDemand: 88, gap: 48 },
  { skill: 'Docker', yourLevel: 55, marketDemand: 82, gap: 27 },
  { skill: 'TypeScript', yourLevel: 65, marketDemand: 85, gap: 20 },
  { skill: 'Node.js', yourLevel: 75, marketDemand: 80, gap: 5 },
];

interface SkillGapChartProps {
  data?: any[];
}

export const SkillGapChart = ({ data = sampleData }: SkillGapChartProps) => {
  const chartData = data.length > 0 ? data : sampleData;
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Your Skills vs. Market Demand</h3>
        <p className="text-muted-foreground">
          This sample analysis shows how your skills compare to current market requirements
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="skill" 
            className="text-sm"
            tick={{ fill: 'hsl(var(--foreground))' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--foreground))' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
            }}
          />
          <Legend />
          <Bar 
            dataKey="yourLevel" 
            fill="hsl(var(--primary))" 
            name="Your Level" 
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            dataKey="marketDemand" 
            fill="hsl(var(--accent))" 
            name="Market Demand" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-primary">68%</div>
          <div className="text-sm text-muted-foreground">Average Skill Match</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-accent">3</div>
          <div className="text-sm text-muted-foreground">Critical Gaps Identified</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-primary">85%</div>
          <div className="text-sm text-muted-foreground">Market Readiness</div>
        </div>
      </div>
    </div>
  );
};
