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
    <section className="section-light py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <span className="reveal-element section-label block mb-4" data-delay="0">PORTFOLIO</span>
        <div className="flex items-center justify-between mb-10">
          <h2 className="reveal-element font-display text-[44px] font-bold" data-delay="0.05">
            Placeholder Title
          </h2>
          <div className="reveal-element flex items-center gap-4" data-delay="0.1">
            <a href="#" className="font-body text-sm hover:opacity-70 transition-colors duration-300 hidden sm:block" style={{ color: "#0059ff" }}>
              Zobacz wszystkie →
            </a>
            <button
              onClick={() => setOffset(Math.max(0, offset - 1))}
              className="icon-circle hover:bg-primary/20"
            >
              <ChevronLeft size={16} style={{ color: "#0059ff" }} />
            </button>
            <button
              onClick={() => setOffset(Math.min(projects.length - 1, offset + 1))}
              className="icon-circle hover:bg-primary/20"
            >
              <ChevronRight size={16} style={{ color: "#0059ff" }} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div key={i} className="reveal-element card-surface group cursor-pointer" data-delay={String(i * 0.12)}>
              <div className="aspect-video relative" style={{ background: "linear-gradient(135deg, #e8ecf4, #d4dced)" }}>
                <span className="absolute bottom-3 left-4 section-label" style={{ color: "#7a9acc" }}>Image Placeholder</span>
              </div>
              <div className="p-6 flex items-center justify-between">
                <span className="font-body font-semibold">{p.name}</span>
                <span className="font-body text-[11px] px-3 py-1 rounded-full border" style={{ background: "rgba(0,89,255,0.08)", color: "#0059ff", borderColor: "rgba(0,89,255,0.2)" }}>
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
