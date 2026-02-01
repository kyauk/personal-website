import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Heart, Coffee, BookOpen } from 'lucide-react';
import { personalInfo, aboutMe } from '../../data/content';

export default function About() {
  return (
    <section id="about" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side - Static intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:sticky md:top-24"
          >
            <div className="bg-white/60 rounded-3xl p-8 border border-muted/50">
              {personalInfo.headshot ? (
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-green/20">
                  <img
                    src={personalInfo.headshot}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover scale-[1.75]"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green to-green-light mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-semibold text-charcoal text-center mb-2">
                {personalInfo.name}
              </h3>

              <div className="flex items-center justify-center gap-2 text-charcoal/60 mb-6">
                <MapPin size={16} />
                <span>{aboutMe.location}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-green mb-6">
                <GraduationCap size={18} />
                <span className="font-medium">{aboutMe.education}</span>
              </div>

              <p className="text-charcoal/70 text-center leading-relaxed">
                {aboutMe.shortBio}
              </p>
            </div>
          </motion.div>

          {/* Right side - Scrollable content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:h-[500px] md:overflow-y-auto md:pr-4 scrollbar-thin"
          >
            {/* What I'm currently doing */}
            <div className="bg-white/40 rounded-2xl p-6 border border-muted/30">
              <h4 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                <Coffee size={18} className="text-green" />
                Currently
              </h4>
              <ul className="space-y-2">
                {aboutMe.currently.map((item, index) => (
                  <li key={index} className="text-charcoal/70 flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interests */}
            <div className="bg-white/40 rounded-2xl p-6 border border-muted/30">
              <h4 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                <Heart size={18} className="text-green" />
                Interests & Hobbies
              </h4>
              <div className="flex flex-wrap gap-2">
                {aboutMe.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 text-sm bg-beige-dark/50 text-charcoal/70 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* What I'm learning */}
            <div className="bg-white/40 rounded-2xl p-6 border border-muted/30">
              <h4 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                <BookOpen size={18} className="text-green" />
                Learning & Exploring
              </h4>
              <div className="flex flex-wrap gap-2">
                {aboutMe.learning.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm bg-green/10 text-green rounded-full font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
