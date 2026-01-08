// Career roles and their required skills
export const careerRoles = {
  "software-developer": {
    title: "Software Developer",
    icon: "💻",
    requiredSkills: ["Java", "Python", "DSA", "SQL", "Git", "HTML/CSS", "JavaScript"],
    description: "Build and maintain software applications"
  },
  "data-analyst": {
    title: "Data Analyst",
    icon: "📊",
    requiredSkills: ["Python", "SQL", "Excel", "Statistics", "Data Visualization", "R"],
    description: "Analyze data to drive business decisions"
  },
  "cloud-engineer": {
    title: "Cloud Engineer",
    icon: "☁️",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "Linux", "Networking", "Python", "Terraform"],
    description: "Design and manage cloud infrastructure"
  },
  "frontend-developer": {
    title: "Frontend Developer",
    icon: "🎨",
    requiredSkills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Git", "Responsive Design"],
    description: "Create user interfaces and experiences"
  },
  "devops-engineer": {
    title: "DevOps Engineer",
    icon: "⚙️",
    requiredSkills: ["Linux", "Docker", "CI/CD", "Git", "AWS", "Python", "Monitoring"],
    description: "Bridge development and operations"
  }
};

export const allSkills = [
  "Java", "Python", "JavaScript", "TypeScript", "C++", "Go",
  "HTML/CSS", "React", "Vue", "Angular", "Node.js",
  "SQL", "MongoDB", "PostgreSQL", "Redis",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes",
  "Git", "Linux", "Networking", "CI/CD", "Terraform",
  "DSA", "System Design", "REST APIs", "GraphQL",
  "Statistics", "Data Visualization", "Excel", "R", "Machine Learning",
  "Responsive Design", "Monitoring", "Security"
];

export const roadmapTemplates: Record<string, { week: string; task: string; type: "learn" | "practice" | "build" | "apply" }[]> = {
  "software-developer": [
    { week: "Week 1-2", task: "Master Data Structures & Algorithms fundamentals", type: "learn" },
    { week: "Week 3-4", task: "Practice 50+ coding problems on LeetCode", type: "practice" },
    { week: "Week 5-6", task: "Learn SQL and database design", type: "learn" },
    { week: "Week 7-8", task: "Build a full-stack project with authentication", type: "build" },
    { week: "Week 9-10", task: "Contribute to open source projects", type: "practice" },
    { week: "Week 11-12", task: "Prepare resume and apply to jobs", type: "apply" }
  ],
  "data-analyst": [
    { week: "Week 1-2", task: "Learn Python for data analysis (Pandas, NumPy)", type: "learn" },
    { week: "Week 3-4", task: "Master SQL queries and database operations", type: "learn" },
    { week: "Week 5-6", task: "Complete data visualization projects (Tableau/Power BI)", type: "build" },
    { week: "Week 7-8", task: "Practice statistical analysis on real datasets", type: "practice" },
    { week: "Week 9-10", task: "Build a portfolio with 3 data analysis projects", type: "build" },
    { week: "Week 11-12", task: "Apply for data analyst positions", type: "apply" }
  ],
  "cloud-engineer": [
    { week: "Week 1-2", task: "Learn AWS fundamentals and get certified", type: "learn" },
    { week: "Week 3-4", task: "Master Docker and containerization", type: "learn" },
    { week: "Week 5-6", task: "Practice Kubernetes deployments", type: "practice" },
    { week: "Week 7-8", task: "Build infrastructure as code with Terraform", type: "build" },
    { week: "Week 9-10", task: "Set up CI/CD pipelines for a project", type: "build" },
    { week: "Week 11-12", task: "Apply for cloud engineering roles", type: "apply" }
  ],
  "frontend-developer": [
    { week: "Week 1-2", task: "Master modern CSS and responsive design", type: "learn" },
    { week: "Week 3-4", task: "Deep dive into React and hooks", type: "learn" },
    { week: "Week 5-6", task: "Learn TypeScript for type-safe development", type: "learn" },
    { week: "Week 7-8", task: "Build a complex SPA with state management", type: "build" },
    { week: "Week 9-10", task: "Create a stunning portfolio website", type: "build" },
    { week: "Week 11-12", task: "Apply for frontend positions", type: "apply" }
  ],
  "devops-engineer": [
    { week: "Week 1-2", task: "Master Linux administration", type: "learn" },
    { week: "Week 3-4", task: "Learn Docker and container orchestration", type: "learn" },
    { week: "Week 5-6", task: "Set up monitoring with Prometheus/Grafana", type: "practice" },
    { week: "Week 7-8", task: "Build automated CI/CD pipelines", type: "build" },
    { week: "Week 9-10", task: "Practice infrastructure automation", type: "practice" },
    { week: "Week 11-12", task: "Apply for DevOps roles", type: "apply" }
  ]
};

export type CareerRole = keyof typeof careerRoles;
