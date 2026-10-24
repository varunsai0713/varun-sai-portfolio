import { SectionHeading } from "./SectionHeading.jsx";
import { ProjectCard } from "./ProjectCard.jsx";
const Projects = ({ projects }) => {
  return <section id="projects" aria-labelledby="projects-heading" className="py-16 md:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
    eyebrow="04. Featured Projects"
    title="Full-stack & frontend software projects"
    description="Key web applications highlighting API design, authentication, state management, and modern component architectures."
  />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>;
};
export {
  Projects
};
