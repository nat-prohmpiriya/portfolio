import { Mail, MessageCircle, Linkedin, Github, GraduationCap } from 'lucide-react';

interface ContactSectionProps {
  isDarkMode: boolean;
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'nut.prohmpiriya@gmail.com',
    href: 'mailto:nut.prohmpiriya@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'Line',
    value: 'mohexc',
    href: 'https://line.me/ti/p/~mohexc',
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prohmpiriya/',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/nat-prohmpiriya',
  },
];

export default function ContactSection({ isDarkMode }: ContactSectionProps) {
  return (
    <section id="contact" className="relative container mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Get In Touch
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Feel free to reach out for collaborations or just a friendly hello
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Information
            </h3>

            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-4 group ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <div className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 group-hover:bg-gray-600' : 'bg-gray-200 group-hover:bg-gray-300'}`}>
                      <Icon className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {item.label}
                      </p>
                      <p className="font-medium">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Follow me on
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg transition-colors ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                      }`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Education
            </h3>

            <div className={`flex items-start gap-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <GraduationCap className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ramkhamhaeng University
                </h4>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Bachelor of Laws
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Bangkok, 2012
                </p>
              </div>
            </div>

            {/* Additional Background */}
            <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Background
              </h4>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Before transitioning to software development, I spent a decade (2010-2020) as a freelance staff
                member and backstage coordinator in event organization. This experience taught me project management,
                team coordination, and working under pressure – skills that translate well into tech.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
