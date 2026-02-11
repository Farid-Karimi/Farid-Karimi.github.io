import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import GlitchText from '../components/GlitchText';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Filter safe check (p &&)
  const project = PROJECTS.find(p => p && p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-full pb-20">
      {/* Detail Header */}
      <header className="bg-terminal-gray border-b border-border-dim px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs text-phosphor mb-6 hover:underline uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Archive
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div className="flex flex-col items-start">
                <div className="mb-3">
                   <span className="text-[10px] bg-phosphor/10 text-phosphor px-2 py-1 font-mono tracking-widest border border-phosphor/20">
                     {project.refId}
                   </span>
                </div>
                <GlitchText 
                   as="h1" 
                   text={project.title} 
                   className="text-3xl md:text-5xl font-bold text-white tracking-tight block"
                />
             </div>
             <div className="text-right text-[10px] font-mono text-gray-500 space-y-1">
                <div>DATE_LOGGED: <span className="text-white">{project.date}</span></div>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
         {/* Stats Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-b border-border-dim pb-12">
            <div className="p-4 border border-border-dim bg-white/5">
               <div className="text-[9px] uppercase text-gray-500 mb-1">Status</div>
               <div className="text-phosphor font-mono">COMPLETE</div>
            </div>
            {project.stats && (
               <div className="p-4 border border-border-dim bg-white/5">
                  <div className="text-[9px] uppercase text-gray-500 mb-1">{project.stats.label}</div>
                  <div className="text-white font-mono">{project.stats.value}</div>
               </div>
            )}
            <div className="col-span-2 p-4 border border-border-dim bg-white/5">
               <div className="text-[9px] uppercase text-gray-500 mb-1">Tags</div>
               <div className="flex gap-2 flex-wrap">
                  {project.tags.map(t => (
                     <span key={t} className="text-xs text-text-dim border border-border-dim px-1.5">{t}</span>
                  ))}
               </div>
            </div>
         </div>

         {/* Hero Image */}
         <div className="relative aspect-video mb-12 border border-border-dim overflow-hidden group">
            <img 
               src={project.imageUrl} 
               alt={project.title} 
               className="w-full h-full object-cover opacity-90 transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50"></div>
         </div>

         {/* Text Content */}
         <div className="prose prose-invert prose-headings:font-mono prose-headings:text-white prose-p:text-text-dim prose-a:text-phosphor max-w-none">
            {/* Using dangerouslySetInnerHTML to simulate rendered markdown */}
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
         </div>

         <div className="mt-16 pt-8 border-t border-border-dim text-center">
            <div className="text-[10px] text-gray-600 font-mono mb-4">END OF FILE</div>
            <div className="w-2 h-2 bg-phosphor mx-auto animate-pulse"></div>
         </div>
      </article>
    </div>
  );
};

export default ProjectDetail;