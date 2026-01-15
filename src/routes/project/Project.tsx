import { useState, useEffect, type Key } from "react";
import { useParams } from "react-router-dom";
import { MDXProvider } from '@mdx-js/react';
import 'highlight.js/styles/a11y-dark.css';
import { Tag } from "../index/components/ProjectCard";
import { useAnimatedNavigate } from "../../hooks/useAnimatedNavigate";

const components = {
  h1: ({ className = '', ...props }: any) => (
    <h1
      className={`${className} text-white text-3xl font-bold py-6`}
      {...props}
    />
  ),
  h2: ({ className = '', ...props }: any) => (
    <h1
      className={`${className} text-white text-2xl py-4`}
      {...props}
    />
  ),
  h3: ({ className = '', ...props }: any) => (
    <h3
      className={`${className} text-white text-xl py-2`}
      {...props}
    />
  ),
  h4: ({ className = '', ...props }: any) => (
    <h4
      className={`${className} text-white text-lg py-2`}
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      {...props}
      className="text-gray-400 underline"
    />
  ),
  code: (props: any) => (
    <code
      {...props}
      className="text-white rounded px-1 py-0.5 font-mono text-sm"
    />
  ),
  pre: (props: any) => (
    <pre
      {...props}
      className="bg-neutral-900 text-white rounded p-4 overflow-x-auto font-mono text-sm"
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-gray-300 italic pl-4"
    />
  ),
  ul: (props: any) => (
    <ul
      {...props}
      className="list-disc list-inside space-y-1 text-gray-400"
    />
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className="list-decimal list-inside space-y-1 text-gray-400"
    />
  ),
  li: (props: any) => (
    <li
      {...props}
      className="list-decimal list-inside space-y-1 text-gray-400"
    />
  ),
  p: ({ className = '', ...props }: any) => (
    <p
      className={`${className} mb-4 text-gray-400 whitespace-pre-line`}
      {...props}
    />
  ),
  br: () => (
    <br />
  ),
  img: (props: any) => (
    <img
      {...props}
      className="w-full h-auto rounded-lg"
    />
  )
};

export default components;

const modules: Record<string, { default: React.ComponentType, frontmatter?: any }> =
  import.meta.glob('../../projects/*.mdx', { eager: true });

export const Project = () => {
  const { slug } = useParams();
  const navigate = useAnimatedNavigate();

  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
  const [frontmatter, setFrontmatter] = useState<any>(null);

  useEffect(() => {
    const path = `../../projects/${slug}.mdx`;
    const mod = modules[path];
    if (mod) {
      setMDXContent(() => mod.default);
      setFrontmatter(mod.frontmatter || {});
    } else {
      setMDXContent(() => () => <div>{slug} not found</div>);
      setFrontmatter(null);
    }
  }, [slug]);

  if (!MDXContent) return (
    <>
    </>
  );

  return (
    <>
      <title>{frontmatter.title}</title>
      <div className="min-h-screen w-full bg-[#0C0C0C]">
        {frontmatter.heroImage && (
          <div className="relative w-full h-100 sm:h-125 overflow-hidden">
            <img 
              src={frontmatter.heroImage} 
              alt={frontmatter.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/70 to-[#0C0C0C]" />
            
            <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-4 z-10">
              <div className="max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                  <button 
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer" 
                    onClick={() => navigate('/')}
                  >
                    Start
                  </button>
                  <span className="text-gray-500 select-none">/</span>
                  <span className="text-gray-200 select-none">{slug}</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                  {frontmatter.title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-4">{frontmatter.date}</p>
                <div className="flex gap-2 flex-wrap justify-center opacity-100">
                  {frontmatter.tags.map((tag: Key | null | undefined) => (
                    <Tag key={tag} title={tag!.toString()} color="default" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#131313] rounded-lg p-6 sm:p-10">
              <MDXProvider components={components}>
                <main className="prose prose-invert dark:prose-invert max-w-none">
                  <MDXContent />
                </main>
              </MDXProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};