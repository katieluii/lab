import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';
import type { Status } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const STATUS_FILTERS: { label: string; value: Status | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: '💡 Ideating', value: 'ideating' },
  { label: '🚧 Building', value: 'building' },
  { label: '✅ Live', value: 'live' },
  { label: '💤 Later', value: 'later' },
];

export default function Home() {
  const [filter, setFilter] = useState<Status | 'all'>('all');

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.status === filter);

  const sorted = [...filtered].sort((a, b) => a.priority - b.priority);

  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      {/* Nav */}
      <header className="sticky top-0 z-10 bg-[#fdf8f3]/80 backdrop-blur-md border-b border-zinc-200/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧪</span>
            <span className="font-bold text-zinc-900 tracking-tight">Katie's Lab</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://katieluii.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1"
            >
              Professional work <ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/katieluii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="mb-3">
          <span className="inline-block text-xs font-semibold tracking-widest text-zinc-400 uppercase">
            ✦ personal projects ✦
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 leading-tight tracking-tight mb-4">
          Katie's Lab
        </h1>
        <p className="text-xl text-zinc-500 max-w-xl leading-relaxed mb-2">
          Things I'm building because they should exist. AI tools, recommenders,
          couple stuff, culture apps.
        </p>
        <p className="text-sm text-zinc-400 italic">
          6 ideas · 0 shipped (yet) · infinite caffeine
        </p>

        {/* Stats bar */}
        <div className="mt-8 flex flex-wrap gap-4">
          {[
            { n: '6', label: 'total projects' },
            { n: '4', label: 'use Claude API' },
            { n: '2', label: 'need a backend' },
            { n: '2', label: 'are expensive 💸' },
          ].map(({ n, label }) => (
            <div key={label} className="bg-white rounded-xl px-4 py-3 ring-1 ring-zinc-200/60 shadow-sm">
              <div className="text-2xl font-bold text-zinc-900">{n}</div>
              <div className="text-xs text-zinc-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter chips */}
      <section className="max-w-5xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all border ${
                filter === value
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Project grid */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16 text-zinc-400">
            <div className="text-4xl mb-3">🫙</div>
            <p className="text-sm">Nothing here yet — check back soon.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 bg-white/50">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="text-lg">🧪</span>
            <span>Katie's Lab — personal projects</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <a
              href="https://katieluii.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-700 transition-colors"
            >
              Professional portfolio →
            </a>
            <a
              href="https://github.com/katieluii"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-700 transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
