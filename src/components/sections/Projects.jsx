import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/content';

// Helper to normalize image field to array
const getImages = (project) => {
  if (!project.image && !project.images) return [];
  if (project.images) return project.images;
  return [project.image];
};

// Check if file is a PDF
const isPdf = (src) => src?.toLowerCase().endsWith('.pdf');

export default function Projects() {
  const [preview, setPreview] = useState(null); // { images: [], title: '', index: 0 }

  const openPreview = (project) => {
    const images = getImages(project);
    setPreview({ images, title: project.title, index: 0 });
  };

  const nextImage = () => {
    if (!preview) return;
    setPreview(prev => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }));
  };

  const prevImage = () => {
    if (!preview) return;
    setPreview(prev => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length
    }));
  };

  const goToImage = (index) => {
    setPreview(prev => ({ ...prev, index }));
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Projects</h2>
          <p className="text-charcoal/60 max-w-xl mx-auto">
            A selection of projects I've worked on!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const images = getImages(project);
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/50 rounded-2xl overflow-hidden border border-muted/50 hover:border-green/30 hover:shadow-lg hover:shadow-green/5 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-charcoal group-hover:text-green transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-charcoal/40 hover:text-green transition-colors"
                          aria-label={`${project.title} GitHub`}
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-charcoal/40 hover:text-green transition-colors"
                          aria-label={`${project.title} Demo`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-charcoal/70 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-green/10 text-green rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {images.length > 0 && (
                    <button
                      onClick={() => openPreview(project)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green bg-green/10 rounded-full hover:bg-green/20 transition-colors cursor-pointer"
                    >
                      <Eye size={16} />
                      Preview{images.length > 1 && ` (${images.length})`}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm cursor-auto"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
                aria-label="Close preview"
              >
                <X size={28} />
              </button>

              {/* Image/PDF with animation */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {isPdf(preview.images[preview.index]) ? (
                    <motion.iframe
                      key={preview.index}
                      src={preview.images[preview.index]}
                      title={`${preview.title} - PDF ${preview.index + 1}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-[75vh] rounded-lg shadow-2xl bg-white"
                    />
                  ) : (
                    <motion.img
                      key={preview.index}
                      src={preview.images[preview.index]}
                      alt={`${preview.title} - Image ${preview.index + 1}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl"
                    />
                  )}
                </AnimatePresence>

                {/* Navigation arrows (only show if multiple images) */}
                {preview.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Title and dot indicators */}
              <div className="text-center mt-4">
                <p className="text-white/80 text-sm">{preview.title}</p>
                {preview.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {preview.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToImage(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === preview.index ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
