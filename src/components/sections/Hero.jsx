import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { personalInfo } from '../../data/content';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <div className="text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-green font-medium mb-4"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-charcoal mb-6"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-charcoal/70 mb-10"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-6"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-charcoal/5 hover:bg-green hover:text-white text-charcoal transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-charcoal/5 hover:bg-green hover:text-white text-charcoal transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-3 rounded-full bg-charcoal/5 hover:bg-green hover:text-white text-charcoal transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-10 text-charcoal/40 hover:text-green transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}
