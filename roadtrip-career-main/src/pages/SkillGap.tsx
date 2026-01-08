import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { careerRoles, CareerRole } from '@/lib/data';
import { 
  ArrowLeft, 
  ArrowRight, 
  Rocket,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const SkillGap = () => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user || !profile) return null;

  const careerGoal = profile.career_goal as CareerRole | undefined;
  const selectedRole = careerGoal ? careerRoles[careerGoal] : null;
  const userSkills = profile.skills || [];

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-display font-bold">CareerMentor</span>
            </Link>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-16 text-center">
          <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold mb-2">No Career Goal Set</h1>
          <p className="text-muted-foreground mb-6">Set your career goal first to see skill gap analysis</p>
          <Button variant="hero" asChild>
            <Link to="/skills">Set Career Goal</Link>
          </Button>
        </main>
      </div>
    );
  }

  const requiredSkills = selectedRole.requiredSkills;
  const knownSkills = requiredSkills.filter(skill => userSkills.includes(skill));
  const missingSkills = requiredSkills.filter(skill => !userSkills.includes(skill));
  const readinessPercent = Math.round((knownSkills.length / requiredSkills.length) * 100);

  const getReadinessMessage = () => {
    if (readinessPercent >= 80) return { text: "Excellent! You're almost ready!", color: "text-success" };
    if (readinessPercent >= 50) return { text: "Good progress! Keep learning!", color: "text-warning" };
    return { text: "Let's bridge that gap together!", color: "text-primary" };
  };

  const readinessInfo = getReadinessMessage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-display font-bold">CareerMentor</span>
          </Link>
          
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                Skill Gap Analysis
              </h1>
              <p className="text-muted-foreground">
                For {selectedRole.title} {selectedRole.icon}
              </p>
            </div>
          </div>
        </div>

        {/* Readiness Score Card */}
        <div className="glass-card p-8 border border-border/50 mb-8 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular Progress */}
            <div className="relative w-40 h-40 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${readinessPercent * 2.51} 251`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-bold gradient-text">{readinessPercent}%</span>
                <span className="text-xs text-muted-foreground">Ready</span>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-display font-bold mb-2">Career Readiness Score</h2>
              <p className={`text-lg font-medium ${readinessInfo.color} mb-4`}>
                {readinessInfo.text}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>{knownSkills.length} skills you have</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span>{missingSkills.length} skills to learn</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Known Skills */}
          <div className="glass-card p-6 border border-success/30 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Skills You Have</h3>
                <p className="text-sm text-muted-foreground">{knownSkills.length} of {requiredSkills.length}</p>
              </div>
            </div>
            
            {knownSkills.length > 0 ? (
              <div className="space-y-2">
                {knownSkills.map((skill, i) => (
                  <div 
                    key={skill} 
                    className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/20"
                    style={{ animationDelay: `${0.3 + i * 0.05}s` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No matching skills yet. Start learning!
              </p>
            )}
          </div>

          {/* Missing Skills */}
          <div className="glass-card p-6 border border-destructive/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Skills to Learn</h3>
                <p className="text-sm text-muted-foreground">{missingSkills.length} remaining</p>
              </div>
            </div>
            
            {missingSkills.length > 0 ? (
              <div className="space-y-2">
                {missingSkills.map((skill, i) => (
                  <div 
                    key={skill} 
                    className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20"
                    style={{ animationDelay: `${0.4 + i * 0.05}s` }}
                  >
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <span className="text-2xl mb-2 block">🎉</span>
                <p className="text-success font-medium">
                  Amazing! You have all required skills!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card p-6 border border-primary/30 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold mb-1">Ready for the next step?</h3>
              <p className="text-sm text-muted-foreground">
                Get a personalized learning roadmap to fill your skill gaps
              </p>
            </div>
            <Button variant="hero" size="lg" asChild>
              <Link to="/roadmap">
                View Roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillGap;
