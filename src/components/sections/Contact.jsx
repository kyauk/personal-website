import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { personalInfo } from '../../data/content';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-beige-dark/30">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Get In Touch</h2>
          <p className="text-charcoal/60 mb-10 leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects,
            or just having a chat about tech. Feel free to reach out!
          </p>

          <motion.a
            href={`mailto:${personalInfo.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-green text-white font-medium rounded-full hover:bg-green-dark transition-colors shadow-lg shadow-green/20"
          >
            <Send size={20} />
            Say Hello
          </motion.a>

          <div className="mt-12 flex justify-center gap-6">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
