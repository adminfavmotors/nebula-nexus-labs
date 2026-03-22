import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const Projects = () => {
  const ref = useScrollReveal(0.12);
  const [offset, setOffset] = useState(0);
  const { t } = useI18n();
  const visibleItems = t.projects.items.map((_, index) => t.projects.items[(index + offset) % t.projects.items.length]);

  return (
    <section id="projects" className="section-light section-spacing" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="section-title-light reveal-element" data-delay="0.05">
            {t.projects.title}
          </h2>
          <div className="reveal-element flex items-center gap-4" data-delay="0.1">
            <a href="#contact" className="section-link-light hidden sm:block">
              {t.projects.viewAll}
            </a>
            <button
              type="button"
              onClick={() => setOffset((current) => (current - 1 + t.projects.items.length) % t.projects.items.length)}
              className="icon-circle hover:bg-primary/20"
              aria-label={t.projects.previousLabel}
            >
              <ChevronLeft size={16} className="text-primary" />
            </button>
            <button
              type="button"
              onClick={() => setOffset((current) => (current + 1) % t.projects.items.length)}
              className="icon-circle hover:bg-primary/20"
              aria-label={t.projects.nextLabel}
            >
              <ChevronRight size={16} className="text-primary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((project, i) => (
            <div key={`${project.name}-${i}`} className="card-surface reveal-element group cursor-pointer" data-delay={String(i * 0.12)}>
              <div className="project-preview-surface">
                <span className="absolute bottom-3 left-4 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#7a9acc]">
                  {t.projects.imageLabel}
                </span>
              </div>
              <div className="flex items-center justify-between p-6">
                <span className="font-body font-semibold">{project.name}</span>
                <span className="tag-pill">{project.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
