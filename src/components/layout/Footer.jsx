import { personalInfo } from '../../data/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-muted/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-charcoal/50 text-sm">
          &copy; {currentYear} {personalInfo.name}. All rights reserved.
        </p>
        <p className="text-charcoal/40 text-sm">
          Built with React & TailwindCSS
        </p>
      </div>
    </footer>
  );
}
