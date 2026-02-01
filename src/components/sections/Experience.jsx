import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experiences } from '../../data/content';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-beige-dark/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Experience</h2>
          <p className="text-charcoal/60 max-w-xl mx-auto">
            My professional journey and work experience in the tech industry.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-muted hover:border-green transition-colors"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-beige border-2 border-muted flex items-center justify-center">
                <Briefcase size={12} className="text-green" />
              </div>

              <div className="bg-white/50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-charcoal">{exp.role}</h3>
                  <span className="text-sm text-green font-medium">{exp.dates}</span>
                </div>
                <p className="text-charcoal/60 font-medium mb-3">{exp.company}</p>
                <p className="text-charcoal/70 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
