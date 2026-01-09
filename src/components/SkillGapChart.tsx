import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SkillData {
  skill: string;
  hasSkill: boolean;
  marketDemand: number;
  count: number;
}

interface SkillGapChartProps {
  data?: SkillData[];
  matchPercentage?: number;
  criticalGaps?: number;
  marketReadiness?: number;
}

export const SkillGapChart = React.forwardRef<HTMLDivElement, SkillGapChartProps>(({ 
  data = [], 
  matchPercentage = 0,
  criticalGaps = 0,
  marketReadiness = 0
}, ref) => {
  // Sort by market demand descending
  const chartData = [...data].sort((a, b) => b.marketDemand - a.marketDemand).slice(0, 10);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold capitalize mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            Required in <span className="font-bold text-primary">{item.marketDemand}%</span> of job listings
          </p>
          <p className="text-sm text-muted-foreground">
            ({item.count.toLocaleString()} jobs)
          </p>
          <div className="mt-2 flex items-center gap-1">
            {item.hasSkill ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">You have this skill</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive">Skill gap - learn this!</span>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-muted-foreground">No skill data available</p>
      </div>
    );
  }

  return (
    <div className="w-full" ref={ref}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Market Demand vs Your Skills</h3>
        <p className="text-muted-foreground">
          Real data from 1,491 job listings. Green = you have it, Red = skill gap.
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={chartData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          layout="horizontal"
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="skill" 
            className="text-sm"
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--foreground))' }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            label={{ 
              value: '% of Job Listings', 
              angle: -90, 
              position: 'insideLeft',
              fill: 'hsl(var(--muted-foreground))'
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
          <Bar 
            dataKey="marketDemand" 
            name="Market Demand %" 
            radius={[6, 6, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.hasSkill ? 'hsl(142, 76%, 36%)' : 'hsl(var(--destructive))'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span className="text-sm text-muted-foreground">Skills You Have</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive" />
          <span className="text-sm text-muted-foreground">Skill Gaps</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-primary">{matchPercentage}%</div>
          <div className="text-sm text-muted-foreground">Skills Match (Top 20)</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-destructive">{criticalGaps}</div>
          <div className="text-sm text-muted-foreground">Skill Gaps Identified</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-primary">{marketReadiness}%</div>
          <div className="text-sm text-muted-foreground">Market Readiness</div>
        </div>
      </div>
    </div>
  );
});

SkillGapChart.displayName = 'SkillGapChart';
