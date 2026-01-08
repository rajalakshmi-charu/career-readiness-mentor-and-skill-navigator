import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { careerRoles, allSkills, CareerRole } from '@/lib/data';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  ArrowRight, 
  Rocket,
  Check,
  Target,
  Briefcase
} from 'lucide-react';

const Skills = () => {
  const { user, profile, isLoading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState<CareerRole | ''>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
    if (profile) {
      setSelectedCareer((profile.career_goal as CareerRole) || '');
      setSelectedSkills(profile.skills || []);
    }
  }, [user, profile, isLoading, navigate]);

  if (isLoading || !user || !profile) return null;

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSave = async () => {
    if (!selectedCareer) {
      toast.error('Please select a career goal');
      return;
    }
    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    setIsSaving(true);
    const result = await updateProfile({
      career_goal: selectedCareer,
      skills: selectedSkills
    });

    if (result.success) {
      toast.success('Profile updated successfully!');
      navigate('/skill-gap');
    } else {
      toast.error(result.error || 'Failed to update profile');
    }
    setIsSaving(false);
  };

  const currentRole = selectedCareer ? careerRoles[selectedCareer] : null;
  const relevantSkills = currentRole?.requiredSkills || [];

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
        {/* Page Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                Career Goal & Skills
              </h1>
              <p className="text-muted-foreground">
                Tell us about your target role and current skills
              </p>
            </div>
          </div>
        </div>

        {/* Career Selection */}
        <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Select Your Career Goal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(careerRoles).map(([key, role]) => (
              <button
                key={key}
                onClick={() => setSelectedCareer(key as CareerRole)}
                className={`glass-card p-5 text-left transition-all border ${
                  selectedCareer === key 
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/30' 
                    : 'border-border/50 hover:border-primary/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{role.icon}</span>
                  {selectedCareer === key && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="font-display font-semibold mb-1">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Skills Selection */}
        <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-display font-semibold mb-2 flex items-center gap-2">
            <Check className="w-5 h-5 text-success" />
            Select Your Current Skills
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {currentRole 
              ? `Skills highlighted in green are required for ${currentRole.title}`
              : 'Select a career goal to see relevant skills highlighted'}
          </p>

          <div className="glass-card p-6 border border-border/50">
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                const isRelevant = relevantSkills.includes(skill);
                
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : isRelevant
                          ? 'bg-success/10 text-success border border-success/30 hover:bg-success/20'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {selectedSkills.length} skills selected
            </span>
            {selectedSkills.length > 0 && (
              <button 
                onClick={() => setSelectedSkills([])}
                className="text-destructive hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </section>

        {/* Summary & Save */}
        {selectedCareer && selectedSkills.length > 0 && (
          <section className="glass-card p-6 border border-primary/30 animate-scale-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-semibold mb-1">Ready to Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  {careerRoles[selectedCareer].title} • {selectedSkills.length} skills selected
                </p>
              </div>
              <Button variant="hero" size="lg" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Save & View Gap Analysis
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Skills;
