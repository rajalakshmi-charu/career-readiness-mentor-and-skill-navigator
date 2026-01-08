import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { careerRoles, roadmapTemplates, CareerRole } from '@/lib/data';
import { 
  ArrowLeft,
  Rocket,
  Map,
  BookOpen,
  Code,
  Hammer,
  Send,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const Roadmap = () => {
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
  const roadmap = careerGoal ? roadmapTemplates[careerGoal] : null;

  if (!selectedRole || !roadmap) {
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
          <p className="text-muted-foreground mb-6">Set your career goal first to see your personalized roadmap</p>
          <Button variant="hero" asChild>
            <Link to="/skills">Set Career Goal</Link>
          </Button>
        </main>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'learn': return <BookOpen className="w-5 h-5" />;
      case 'practice': return <Code className="w-5 h-5" />;
      case 'build': return <Hammer className="w-5 h-5" />;
      case 'apply': return <Send className="w-5 h-5" />;
      default: return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'learn': return 'bg-primary/10 text-primary border-primary/30';
      case 'practice': return 'bg-warning/10 text-warning border-warning/30';
      case 'build': return 'bg-accent/10 text-accent border-accent/30';
      case 'apply': return 'bg-success/10 text-success border-success/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'learn': return 'Learn';
      case 'practice': return 'Practice';
      case 'build': return 'Build';
      case 'apply': return 'Apply';
      default: return type;
    }
  };

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
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Map className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                Your Career Roadmap
              </h1>
              <p className="text-muted-foreground">
                12-week plan to become a {selectedRole.title} {selectedRole.icon}
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="glass-card p-4 border border-border/50 mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { type: 'learn', label: 'Learn' },
              { type: 'practice', label: 'Practice' },
              { type: 'build', label: 'Build' },
              { type: 'apply', label: 'Apply' }
            ].map(({ type, label }) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(type)}`}>
                  {getTypeIcon(type)}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-success" />

          {roadmap.map((step, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index} 
                className={`relative flex items-start gap-4 md:gap-8 mb-8 animate-slide-up ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Node */}
                <div className={`absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 z-10 ${
                  index === 0 ? 'ring-4 ring-primary/30' : ''
                }`} />

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className={`glass-card p-6 border ${getTypeColor(step.type).replace('bg-', 'border-').replace('/10', '/30')}`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getTypeColor(step.type)}`}>
                        {getTypeIcon(step.type)}
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getTypeColor(step.type)}`}>
                        {getTypeBadge(step.type)}
                      </span>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-primary mb-2">
                      {step.week}
                    </h3>
                    <p className="font-medium text-foreground">
                      {step.task}
                    </p>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            );
          })}

          {/* Final Node */}
          <div className="relative flex justify-center">
            <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center glow-effect animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <CheckCircle2 className="w-6 h-6 text-success-foreground" />
            </div>
          </div>
        </div>

        {/* Completion Message */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-2xl font-display font-bold gradient-text mb-2">
            You've Got This! 🚀
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Follow this roadmap consistently and you'll be ready for {selectedRole.title} roles in just 12 weeks.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button variant="outline" asChild>
            <Link to="/skill-gap">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Skill Gap
            </Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Roadmap;
