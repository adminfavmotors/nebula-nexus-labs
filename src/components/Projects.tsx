import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const projects = [
  { name: "Placeholder Project", tag: "Web App" },
  { name: "Placeholder Project", tag: "E-commerce" },
  { name: "Placeholder Project", tag: "SaaS" },
];

const Projects = () => {
  const ref = useScrollReveal(0.12);
  const [offset, setOffset] = useState(0);

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <h2 className="reveal-element font-display text-[clamp(28px,4vw,44px)] text-foreground" data-delay="0">
            Placeholder Title
          </h2>
          <div className="reveal-element flex items-center gap-4" data-delay="0.1">
            <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 hidden sm:block">
              Zobacz wszystkie →
            </a>
            <button
              onClick={() => setOffset(Math.max(0, offset - 1))}
              className="icon-circle hover:bg-primary/20"
            >
              <ChevronLeft size={16} className="text-primary" />
            </button>
            <button
              onClick={() => setOffset(Math.min(projects.length - 1, offset + 1))}
              className="icon-circle hover:bg-primary/20"
            >
              <ChevronRight size={16} className="text-primary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="reveal-element card-surface group cursor-pointer" data-delay={String(i * 0.12)}>
              {/* Image placeholder */}
              <div className="aspect-video relative" style={{ background: "linear-gradient(135deg, hsl(224 76% 17%), hsl(226 80% 22%))" }}>
                <span className="absolute bottom-3 left-4 section-label">Image Placeholder</span>
              </div>
              <div className="p-6 flex items-center justify-between">
                <span className="font-body font-semibold text-foreground">{p.name}</span>
                <span className="font-body text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {p.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
