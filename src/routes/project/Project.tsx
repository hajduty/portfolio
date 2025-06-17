import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MDXProvider } from '@mdx-js/react';
import 'highlight.js/styles/a11y-dark.css';
import { useAnimatedNavigate } from "../../hooks/useIsNavigated";

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
  )
};

export default components;

const modules: Record<string, { default: React.ComponentType }> =
  import.meta.glob('../../projects/*.mdx', { eager: true });

export const Project = () => {
  const { slug } = useParams();

  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
  const navigate = useAnimatedNavigate();

  useEffect(() => {
    const path = `../../projects/${slug}.mdx`;
    const mod = modules[path];
    console.log("slugupdae");
    if (mod) {
      setMDXContent(() => mod.default);
    } else {
      setMDXContent(() => () => <div>{slug} not found</div>);
    }
  }, [slug]);

  if (!MDXContent) return (
    <>
    </>
  );

  return (
    <>
      <div className="min-h-screen w-full bg-[#131313] flex justify-center items-start px-4 py-6">
        <div className="flex flex-col gap-2">
          <div>
            <p className="rounded-sm p-2 text-lg text-gray-400 pointer-none select-none">
              <button className="text-gray-400 cursor-pointer hover:text-white transform duration-250" onClick={() => navigate('/')}>Start</button> &gt; {slug}
            </p>
          </div>
          <div className="w-full max-w-4xl bg-[#0C0C0C] rounded-md p-6 sm:p-8">
            <MDXProvider components={components}>
              <main className="prose prose-invert dark:prose-invert max-w-none">
                <MDXContent />
              </main>
            </MDXProvider>
          </div>
        </div>
      </div>
    </>
  );
};
