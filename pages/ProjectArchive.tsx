import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PROJECTS } from '../data/projects';

const ProjectArchive: React.FC = () => {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [sortNewest, setSortNewest] = useState(true);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowTagMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // FILTER: Only show items that are 'project' type AND exist (p && ...)
  const projectsOnly = useMemo(() => PROJECTS.filter(p => p && p.type === 'project'), []);

  const allTags = useMemo(() => {
    return Array.from(new Set(projectsOnly.flatMap(p => p.tags)));
  }, [projectsOnly]);

  const filteredProjects = useMemo(() => {
    return projectsOnly
      .filter(p => !filterTag || p.tags.includes(filterTag))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortNewest ? dateB - dateA : dateA - dateB;
      });
  }, [projectsOnly, filterTag, sortNewest]);

  return (
    <div className="flex flex-col min-h-full">
       {/* Sticky Header */}
       <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border-dim px-6 py-4 flex justify-between items-center">
          <div>
             <h2 className="text-white text-xs font-mono uppercase tracking-[0.2em] mb-1">
                Project_Showcase // External
             </h2>
             <div className="text-[10px] text-gray-500">
               {filteredProjects.length} Repositories Found
             </div>
          </div>
          <div className="flex gap-2 relative items-center">
             <div ref={menuRef} className="relative">
               <button 
                  onClick={() => setShowTagMenu(!showTagMenu)}
                  className={`h-8 px-4 border text-[10px] uppercase transition-colors flex items-center justify-center whitespace-nowrap min-w-[100px] ${
                     filterTag 
                     ? 'border-phosphor text-phosphor bg-phosphor/10' 
                     : 'border-border-dim text-gray-400 hover:text-phosphor hover:border-phosphor'
                  }`}
               >
                  Filter: {filterTag || 'All'}
               </button>
               
               {/* Dropdown Menu */}
               {showTagMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-terminal-gray border border-border-dim shadow-xl z-50 max-h-64 overflow-y-auto">
                     <button 
                        onClick={() => { setFilterTag(null); setShowTagMenu(false); }}
                        className="w-full text-left px-4 py-3 text-[10px] uppercase text-gray-400 hover:text-white hover:bg-white/5 border-b border-border-dim"
                     >
                        View All
                     </button>
                     {allTags.map(tag => (
                        <button 
                           key={tag}
                           onClick={() => { setFilterTag(tag); setShowTagMenu(false); }}
                           className={`w-full text-left px-4 py-2 text-[10px] uppercase hover:bg-white/5 ${
                              filterTag === tag ? 'text-phosphor' : 'text-gray-400 hover:text-white'
                           }`}
                        >
                           {tag}
                        </button>
                     ))}
                  </div>
               )}
             </div>

             <button 
                onClick={() => setSortNewest(!sortNewest)}
                className="h-8 px-4 border border-border-dim text-[10px] uppercase text-gray-400 hover:text-phosphor hover:border-phosphor transition-colors flex items-center justify-center whitespace-nowrap min-w-[100px]"
             >
                Sort: {sortNewest ? 'Newest' : 'Oldest'}
             </button>
          </div>
       </header>

       <div className="p-6 md:p-10 max-w-[1600px] mx-auto w-full pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {filteredProjects.map((project) => (
                <a 
                    key={project.id}
                    href={project.externalLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-terminal-gray border border-border-dim group flex flex-col transition-all duration-300 hover:border-phosphor/50 hover:shadow-[0_0_10px_rgba(51,255,51,0.1)] relative overflow-hidden block h-full"
                >
                     {/* Top Info Bar */}
                     <div className="h-8 border-b border-border-dim bg-white/5 flex items-center justify-between px-3">
                        <span className="text-[9px] text-gray-500 font-mono tracking-wider">{project.refId}</span>
                        <div className="flex gap-1.5">
                           <div className="w-1 h-1 bg-phosphor/50 rounded-full"></div>
                           <div className="w-1 h-1 bg-phosphor/50 rounded-full"></div>
                        </div>
                     </div>

                     {/* Content - Expanded since image is gone */}
                     <div className="p-5 flex-1 flex flex-col min-h-[180px]">
                        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-phosphor transition-colors flex items-center gap-2">
                          {project.title}
                          <span className="material-symbols-outlined text-sm text-gray-500 -rotate-45 group-hover:text-phosphor">arrow_forward</span>
                        </h3>
                        <p className="text-xs text-text-dim leading-relaxed mb-6 flex-1">
                           {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto">
                           {project.tags.map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 border border-border-dim text-[9px] uppercase text-gray-500 bg-black/20">
                                 {tag}
                              </span>
                           ))}
                        </div>
                     </div>

                     {/* Footer Info */}
                     <div className="px-5 py-3 border-t border-border-dim bg-black/20 flex justify-between items-center text-[9px] font-mono">
                        <span className="text-phosphor flex items-center gap-1 uppercase tracking-widest group-hover:underline">
                           <span className="material-symbols-outlined text-sm">code</span>
                           Source_Code
                        </span>
                        <div className="text-gray-600">
                           {project.date}
                        </div>
                     </div>
                </a>
             ))}
             
             {filteredProjects.length === 0 && (
                <div className="col-span-full py-20 text-center border border-border-dim border-dashed text-gray-500 text-sm font-mono">
                   NO_RECORDS_FOUND_FOR_QUERY
                </div>
             )}

          </div>
       </div>
    </div>
  );
};

export default ProjectArchive;