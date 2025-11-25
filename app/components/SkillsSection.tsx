import {
  Code2,
  Server,
  Database,
  Cloud,
  Brain,
  Wrench,
  FileCode
} from 'lucide-react';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React/Next.js', 'Vue.js/Nuxt.js', 'React Native', 'Ant Design', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js (Express.js)', 'Golang (Fiber)', 'Python (FastAPI)'],
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'DevOps & Infrastructure',
    icon: Cloud,
    skills: ['Git', 'GitHub', 'Docker', 'GitHub Actions', 'DigitalOcean', 'OpenTelemetry'],
  },
  {
    title: 'AI/LLMs',
    icon: Brain,
    skills: ['Vercel AI SDK', 'LangChain', 'Chat & Agent Patterns', 'Vector Data Query'],
  },
  {
    title: 'Python Ecosystem',
    icon: FileCode,
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Stable Baselines 3', 'Gymnasium'],
  },
  {
    title: 'Other Tools',
    icon: Wrench,
    skills: ['Firebase', 'Line Platform API', 'Cypress'],
  },
];

export default function SkillsSection({ isDarkMode }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative container mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Technical Skills
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Technologies and tools I work with
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;

          return (
            <div
              key={index}
              className={`p-6 rounded-2xl transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <Icon className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
