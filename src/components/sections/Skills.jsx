import { motion } from 'framer-motion';
import { Code, Layers, Wrench } from 'lucide-react';
import { skills } from '../../data/content';

const skillCategories = [
  { key: 'languages', label: 'Languages', icon: Code },
  { key: 'frameworks', label: 'Frameworks & Libraries', icon: Layers },
  { key: 'tools', label: 'Tools & Platforms', icon: Wrench },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Skills</h2>
          <p className="text-charcoal/60 max-w-xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-white/50 rounded-2xl p-6 border border-muted/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green/10">
                  <category.icon size={20} className="text-green" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal">{category.label}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills[category.key].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + index * 0.05 }}
                    className="px-4 py-2 text-sm font-medium bg-beige-dark/50 text-charcoal/80 rounded-lg hover:bg-green hover:text-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
