import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { careerRoles, CareerRole } from '@/lib/data';
import { 
  Target, 
  TrendingUp, 
  Map, 
  ClipboardCheck,
  LogOut,
  Rocket,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const { user, profile, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !profile) return null;

  const careerGoal = profile.career_goal as CareerRole | undefined;
  const selectedRole = careerGoal ? careerRoles[careerGoal] : null;
  const userSkills = profile.skills || [];
  
  // Calculate readiness
  const calculateReadiness = () => {
    if (!selectedRole || userSkills.length === 0) return 0;
    const matchedSkills = userSkills.filter(skill => 
      selectedRole.requiredSkills.includes(skill)
    );
    return Math.round((matchedSkills.length / selectedRole.requiredSkills.length) * 100);
  };

  const readiness = calculateReadiness();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const displayName = profile.name || user.email?.split('@')[0] || 'User';

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
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, <span className="text-foreground font-medium">{displayName}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Hello, {displayName.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            {selectedRole 
              ? `You're on your way to becoming a ${selectedRole.title}` 
              : 'Set your career goal to get started'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Career Goal Card */}
          <div className="glass-card p-6 border border-border/50 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              {selectedRole && (
                <span className="text-3xl">{selectedRole.icon}</span>
              )}
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">Career Goal</h3>
            <p className="text-xl font-display font-semibold">
              {selectedRole?.title || 'Not Set'}
            </p>
          </div>

          {/* Readiness Score Card */}
          <div className="glass-card p-6 border border-border/50 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <Sparkles className="w-5 h-5 text-warning" />
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">Career Readiness</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-display font-bold gradient-text">{readiness}%</p>
              {readiness > 0 && (
                <span className="text-xs text-success">Ready</span>
              )}
            </div>
            <div className="progress-bar mt-3">
              <div 
                className="progress-fill" 
                style={{ width: `${readiness}%` }}
              />
            </div>
          </div>

          {/* Skills Count Card */}
          <div className="glass-card p-6 border border-border/50 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-accent" />
              </div>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">Skills Added</h3>
            <p className="text-3xl font-display font-bold">{userSkills.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedRole 
                ? `${selectedRole.requiredSkills.length} required for ${selectedRole.title}`
                : 'Select a career to see requirements'}
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <h2 className="text-xl font-display font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Career Goal Setup */}
          <Link 
            to="/skills" 
            className="glass-card p-6 border border-border/50 hover:border-primary/50 transition-all group animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-2 flex items-center gap-2">
              Set Career Goal
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose your dream role and add your current skills
            </p>
          </Link>

          {/* Skill Gap Analysis */}
          <Link 
            to="/skill-gap" 
            className="glass-card p-6 border border-border/50 hover:border-success/50 transition-all group animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-2 flex items-center gap-2">
              View Skill Gap
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-sm text-muted-foreground">
              See which skills you need to learn for your career
            </p>
          </Link>

          {/* Roadmap */}
          <Link 
            to="/roadmap" 
            className="glass-card p-6 border border-border/50 hover:border-accent/50 transition-all group animate-slide-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Map className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-2 flex items-center gap-2">
              View Roadmap
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-sm text-muted-foreground">
              Get a personalized learning path to reach your goal
            </p>
          </Link>
        </div>

        {/* Getting Started Guide */}
        {!selectedRole && (
          <div className="mt-8 glass-card p-6 border border-primary/30 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold mb-2">Get Started</h3>
                <p className="text-muted-foreground mb-4">
                  To see your skill gap analysis and personalized roadmap, first set your career goal and add your current skills.
                </p>
                <Button variant="hero" asChild>
                  <Link to="/skills">
                    Set Career Goal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
