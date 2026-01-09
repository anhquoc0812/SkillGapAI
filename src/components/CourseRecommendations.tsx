import { ExternalLink, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCourseLinks, CourseLink } from '@/lib/learningResources';
import { normalizeSkillName } from '@/lib/skillTranslations';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CourseRecommendationsProps {
  skills: Array<{
    skill: string;
    percentage: number;
    count: number;
  }>;
  maxSkills?: number;
}

export function CourseRecommendations({ skills, maxSkills = 5 }: CourseRecommendationsProps) {
  const [showAll, setShowAll] = useState(false);
  const displaySkills = showAll ? skills.slice(0, 10) : skills.slice(0, maxSkills);

  return (
    <Card className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Recommended Courses</h2>
          <p className="text-sm text-muted-foreground">
            Free and paid courses to improve your skills
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {displaySkills.map((gap, index) => {
          const normalizedSkill = normalizeSkillName(gap.skill);
          const courses = getCourseLinks(normalizedSkill);

          const freeCourses = courses.filter(c => c.type === 'free');
          const paidCourses = courses.filter(c => c.type === 'paid');

          return (
            <div key={index} className="border-l-4 border-primary pl-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold capitalize flex items-center gap-2">
                    {gap.skill}
                    <Badge variant={index < 3 ? "destructive" : "secondary"} className="text-xs">
                      #{index + 1}
                    </Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Required in {gap.percentage}% of job listings ({gap.count.toLocaleString()} jobs)
                  </p>
                </div>
              </div>

              {/* Free Courses */}
              {freeCourses.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Free
                    </Badge>
                  </p>
                  <div className="space-y-2">
                    {freeCourses.map((course, idx) => (
                      <CourseCard key={idx} course={course} />
                    ))}
                  </div>
                </div>
              )}

              {/* Paid Courses */}
              {paidCourses.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      Paid
                    </Badge>
                  </p>
                  <div className="space-y-2">
                    {paidCourses.map((course, idx) => (
                      <CourseCard key={idx} course={course} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {skills.length > maxSkills && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="w-full sm:w-auto"
          >
            {showAll ? 'Show Less' : `Show ${Math.min(10 - maxSkills, skills.length - maxSkills)} More Skills`}
          </Button>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No course recommendations available</p>
        </div>
      )}
    </Card>
  );
}

function CourseCard({ course }: { course: CourseLink }) {
  return (
    <a
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
          {course.title}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {course.platform}
        </p>
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
    </a>
  );
}
