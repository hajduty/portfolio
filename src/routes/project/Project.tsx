import { useState, useEffect, useRef } from "preact/hooks";
import { useLocation } from "preact-iso";
import { MDXProvider } from "@mdx-js/preact";
import type { ComponentType } from "preact";
import "highlight.js/styles/a11y-dark.css";
import "./Project.css";

const components = {
  h1: ({ ...props }: any) => <h1 {...props} />,
  h2: ({ ...props }: any) => <h2 {...props} />,
  h3: ({ ...props }: any) => <h3 {...props} />,
  h4: ({ ...props }: any) => <h4 {...props} />,
  a: ({ ...props }: any) => <a {...props} />,
  code: ({ ...props }: any) => <code {...props} />,
  pre: ({ ...props }: any) => <pre {...props} />,
  blockquote: ({ ...props }: any) => <blockquote {...props} />,
  ul: ({ ...props }: any) => <ul {...props} />,
  ol: ({ ...props }: any) => <ol {...props} />,
  li: ({ ...props }: any) => <li {...props} />,
  p: ({ ...props }: any) => <p {...props} />,
  br: () => <br />,
  img: (props: any) => (
    <figure>
      <img {...props} />
    </figure>
  ),
  hr: () => <hr />,
  table: ({ ...props }: any) => <table {...props} />,
  th: ({ ...props }: any) => <th {...props} />,
  td: ({ ...props }: any) => <td {...props} />,
};

const modules: Record<
  string,
  { default: ComponentType; frontmatter?: any }
> = import.meta.glob("../../projects/*.mdx", { eager: true });

const NotFound = ({ slug }: { slug: string }) => (
  <div className="p-not-found">{slug} not found</div>
);

export const Project = () => {
  const location = useLocation();
  const slug = location.path.split("/").pop() ?? "";

  const [MDXContent, setMDXContent] = useState<ComponentType | null>(null);
  const [frontmatter, setFrontmatter] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = `../../projects/${slug}.mdx`;
    const mod = modules[path];
    if (mod) {
      setMDXContent(() => mod.default);
      setFrontmatter(mod.frontmatter || {});
    } else {
      setMDXContent(() => () => <NotFound slug={slug} />);
      setFrontmatter(null);
    }
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // parallax: image moves at 40% of scroll speed
      setParallaxY(y * 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!MDXContent) return null;

  const hasHero = !!frontmatter?.heroImage;

  return (
    <div class="min-h-screen w-full bg-[#0B0B0B] text-[#D4D4D4] font-[Geist,Helvetica_Neue,sans-serif] antialiased">
      <title>{frontmatter?.title ?? slug}</title>

      {/* ── Nav ── */}
      <nav class={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[clamp(1.25rem,4vw,2.5rem)] py-4 transition-all duration-300 ${scrolled ? "border-b border-[#222] bg-[#0B0B0B]/90" : "border-b border-transparent"}`}>
        <div class="flex items-center gap-2 font-normal text-[0.75rem] text-[#D4D4D4]">
          <button
            class="bg-none border-none p-0 cursor-pointer font-normal text-[0.75rem] text-[#D4D4D4] hover:text-[#F0F0F0] transition-colors"
            onClick={() => location.route("/")}
          >
            index
          </button>
          <span class="text-[#888]">/ {slug}</span>
        </div>
        {frontmatter?.date && (
          <span class="font-normal text-[0.75rem] text-[#D4D4D4]">{frontmatter.date}</span>
        )}
      </nav>

      {/* ── Hero ── */}
      {hasHero ? (
        <div
          ref={heroRef}
          class="relative w-full overflow-hidden bg-black"
          style={{ height: "clamp(320px, 50vh, 560px)" }}
        >
          {/* Parallax image — taller than container so it has room to move */}
          <img
            src={frontmatter.heroImage}
            alt=""
            aria-hidden={true}
            class="absolute inset-x-0 w-full object-cover opacity-[0.32] pointer-events-none select-none"
            style={{
              height: "140%",
              top: "-20%",
              transform: `translateY(${parallaxY}px)`,
              willChange: "transform",
            }}
          />

          {/* Gradient fade to bg */}
          <div class="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, #0B0B0B 100%)" }} />

          {/* Title block */}
          <div
            class="absolute bottom-0 left-0 right-0 mx-auto px-[clamp(1.25rem,4vw,2.5rem)]"
            style={{ maxWidth: "calc(860px + 2 * clamp(1.25rem,4vw,2.5rem))", paddingBottom: "clamp(2rem,5vw,3.5rem)" }}
          >
            <h1 class="font-semibold text-[#F0F0F0] tracking-tight m-0 mb-1" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              {frontmatter.title}
            </h1>
            {frontmatter.subtitle && (
              <p class="font-normal text-[0.8rem] text-[#888] mt-1 mb-3 tracking-wide">
                {frontmatter.subtitle}
              </p>
            )}
            <div class="flex items-center gap-4 flex-wrap">
              {frontmatter.date && (
                <span class="font-normal text-[0.75rem] text-[#D4D4D4]">{frontmatter.date}</span>
              )}
              {frontmatter.tags?.length > 0 && (
                <>
                  <span class="w-px h-3 bg-[#333] shrink-0" />
                  <span class="font-normal text-[0.75rem] text-[#D4D4D4]">
                    {frontmatter.tags.join(", ")}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── No-hero header ── */
        <div
          class="mx-auto border-b border-[#222]"
          style={{
            maxWidth: "calc(860px + 2 * clamp(1.25rem,4vw,2.5rem))",
            padding: "7rem clamp(1.25rem,4vw,2.5rem) 3rem",
          }}
        >
          <h1 class="font-semibold text-[#F0F0F0] m-0 mb-1" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            {frontmatter?.title ?? slug}
          </h1>
          {frontmatter?.subtitle && (
            <p class="font-normal text-[0.8rem] text-[#888] mt-1 mb-3 tracking-wide">
              {frontmatter.subtitle}
            </p>
          )}
          <div class="flex items-center gap-4 flex-wrap">
            {frontmatter?.date && (
              <span class="font-normal text-[0.75rem] text-[#D4D4D4]">{frontmatter.date}</span>
            )}
            {frontmatter?.tags?.length > 0 && (
              <>
                <span class="w-px h-3 bg-[#333] shrink-0" />
                <span class="font-normal text-[0.75rem] text-[#D4D4D4]">
                  {frontmatter.tags.join(", ")}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div
        class="mx-auto"
        style={{
          maxWidth: "calc(860px + 2 * clamp(1.25rem,4vw,2.5rem))",
          padding: "clamp(2.5rem,6vw,4rem) clamp(1.25rem,4vw,2.5rem)",
        }}
      >
        <MDXProvider components={components}>
          <article class="p-prose">
            <MDXContent />
          </article>
        </MDXProvider>
      </div>

      {/* ── Footer ── */}
      <div class="border-t border-[#222] w-full">
        <footer
          class="mx-auto flex items-center justify-between"
          style={{
            maxWidth: "calc(860px + 2 * clamp(1.25rem,4vw,2.5rem))",
            padding: "1.75rem clamp(1.25rem,4vw,2.5rem)",
          }}
        >
          <span class="font-normal text-[0.72rem] text-[#888]">/{slug}</span>
          <button
            class="bg-none border-none p-0 cursor-pointer font-normal text-[0.72rem] text-[#D4D4D4] hover:text-[#F0F0F0] transition-colors"
            onClick={() => location.route("/")}
          >
            index
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Project;