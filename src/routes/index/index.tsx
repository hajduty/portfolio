import { useLocation } from "preact-iso";

const modules: Record<string, { frontmatter?: any }> =
  import.meta.glob("../../projects/*.mdx", { eager: true });

const preloadCache = new Set<string>();

function preloadProject(slug: string) {
  const mod = modules[`../../projects/${slug}.mdx`];
  const heroImage = mod?.frontmatter?.heroImage;
  if (!heroImage || preloadCache.has(heroImage)) return;
  preloadCache.add(heroImage);
  const img = new Image();
  img.src = heroImage;
}

interface Tag { title: string; color?: "favorite" | "default" }
interface Project { title: string; year: number; href: string; tags: Tag[]; old: boolean }

const projects: Project[] = [
  {
    title: "jobtracker",
    year: 2026,
    href: "/projects/jobtracker",
    tags: [{ color: "favorite", title: "⭐" }, { title: "C#" }, { title: "React" }, { title: "TypeScript" }, { title: "SQLite" }, { title: "Local" }],
    old: false,
  },
  {
    title: "easycourse",
    year: 2025,
    href: "/projects/easycourse",
    tags: [{ color: "favorite", title: "⭐" }, { title: ".NET" }, { title: "React" }, { title: "C#" }, { title: "TypeScript" }, { title: "SQL Server" }],
    old: false,
  },
  {
    title: "teamsketch",
    year: 2025,
    href: "/projects/teamsketch",
    tags: [{ color: "favorite", title: "⭐" }, { title: ".NET" }, { title: "Microservices" }, { title: "Azure" }],
    old: false,
  },
  {
    title: "webclicker",
    year: 2024,
    href: "/projects/webclicker",
    tags: [{ title: ".NET" }, { title: "React" }, { title: "C++" }, { title: "MySQL" }],
    old: true,
  },
  {
    title: "leaguereplaytool",
    year: 2024,
    href: "/projects/leaguereplaytool",
    tags: [{ title: "React" }, { title: "Electron" }],
    old: true,
  },
  {
    title: "prerecs",
    year: 2022,
    href: "/projects/prerecs",
    tags: [{ title: "C++" }, { title: "Dear ImGui" }],
    old: true,
  },
];

function ProjectRow({ project, navigate }: { project: Project; navigate: (h: string) => void }) {
  const techTags = project.tags.filter(t => t.color !== "favorite");

  return (
    <button
      onClick={() => navigate(project.href)}
      onMouseEnter={() => preloadProject(project.title)}
      className="group cursor-pointer w-full text-left flex items-center gap-6 py-4 border-b border-white/6 hover:border-white/[0.14] transition-colors"
    >
      <span className="font-normal text-xs text-neutral-600 w-10 shrink-0">{project.year}</span>
      <span className="text-neutral-400 text-base font-medium tracking-tight group-hover:text-white transition-colors shrink-0">
        {project.title}
      </span>
      <div className="flex items-center gap-3 flex-wrap">
        {techTags.map(t => (
          <span key={t.title} className="font-normal text-[0.7rem] text-neutral-500 group-hover:text-neutral-400 transition-colors">
            {t.title}
          </span>
        ))}
      </div>
    </button>
  );
}

export function Home() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full bg-[#0d0d0d]">
      <div className="relative z-10 flex min-h-screen max-w-5xl mx-auto">

        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between w-72 shrink-0 px-10 py-16" style={{ borderRight: "1px solid rgba(255,255,255,0.06)", alignSelf: "stretch" }}>
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-semibold text-white tracking-tight leading-tight">
                Hajder Al-Remahy
              </h1>
              <p className="font-normal text-sm text-neutral-500 mt-1">
                Software Developer
              </p>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Software development graduate (YH) with five years of
              project experience building everything from web apps to
              distributed systems with microservices and Kubernetes.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed -mt-4">
              Most comfortable with .NET and React, with a growing interest in backend architecture.
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://www.linkedin.com/in/hajderalremahy" target="_blank" rel="noreferrer"
                className="font-normal text-sm text-neutral-500 hover:text-white transition-colors w-fit cursor-pointer">
                linkedin
              </a>
              <a href="https://www.github.com/hajduty" target="_blank" rel="noreferrer"
                className="font-normal text-sm text-neutral-500 hover:text-white transition-colors w-fit cursor-pointer">
                github
              </a>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col px-10 py-16 gap-12 min-w-0">

          {/* Mobile identity */}
          <div className="md:hidden">
            <h1 className="text-2xl font-semibold text-white tracking-tight">Hajder Al-Remahy</h1>
            <p className="font-normal text-sm text-neutral-500 mt-1">Software Engineer</p>
            <p className="text-sm text-neutral-400 leading-relaxed mt-4">
              Software development graduate (YH) with five years of
              project experience building everything from web apps to
              distributed systems with microservices and Kubernetes.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed mt-3">
              Strongest in .NET and React, with a focus on backend
              architecture and real-time communication.
            </p>
            <div className="flex gap-5 mt-5">
              <a href="https://www.linkedin.com/in/hajderalremahy" target="_blank" rel="noreferrer"
                className="font-normal text-sm text-neutral-500 hover:text-white transition-colors cursor-pointer">
                linkedin
              </a>
              <a href="https://www.github.com/hajduty" target="_blank" rel="noreferrer"
                className="font-normal text-sm text-neutral-500 hover:text-white transition-colors cursor-pointer">
                github
              </a>
            </div>
          </div>

          {/* Projects */}
          <div className="flex flex-col gap-3">
            <span className="font-normal text-xs tracking-widest uppercase text-neutral-300">
              projects
            </span>
            <div className="border-t border-white/6">
              {projects.map(p => (
                <ProjectRow key={p.title} project={p} navigate={location.route} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}