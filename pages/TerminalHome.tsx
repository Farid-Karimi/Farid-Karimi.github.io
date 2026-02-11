import React, { useState, useEffect } from 'react';
import GlitchText from '../components/GlitchText';

const TerminalHome: React.FC = () => {
  // CONFIGURATION: UNPLASH IMAGES
  // Since we are not using the API, simply paste the Direct Image URLs 
  // from your Unsplash profile below.
  // How to get URL: Open photo on Unsplash -> Right Click Image -> "Copy Image Address"
  const MY_IMAGES = [
   "https://images.unsplash.com/photo-1757333239616-311e2240c045?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1737065833137-145487f8f351?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1736594558765-cdbbf00b75f8?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1757333239637-8187e7ebb489?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1749071884452-7b012406392f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1748956274063-e870f68b1f93?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1743449469945-2679d6a46307?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1743449469880-b91fcb8902c3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1743449469777-ca5072f80893?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1743449469792-202c7dff67b0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1743449469778-208abd2e7ef4?q=80&w=679&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1738751130401-87f9824fd8c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1723320731483-f145b04c7f42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1723288920355-cb450dcfc3ec?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1719005153511-1f76e7f70e55?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1714761827419-c7f07e2d93b1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1713476328163-96418b7ce072?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1713341503868-9b1742ffad2c?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1693694853654-55e9023b19e9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1692309695460-df9eade16fa6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1692309665965-4675e041b096?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1692309484678-01b25f7f8856?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1692309458678-e9b429d2da30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [profileImg, setProfileImg] = useState<string>(MY_IMAGES[0]);

  useEffect(() => {
    // Pick a random image from the array on mount
    const randomIndex = Math.floor(Math.random() * MY_IMAGES.length);
    setProfileImg(MY_IMAGES[randomIndex]);
  }, []);

  return (
    <div className="p-6 md:p-12 max-w-[1600px] mx-auto pb-24">
      
      {/* Header Section - Title Only */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-border-dim pb-6 mb-8 gap-8">
        <div className="max-w-3xl">
          <GlitchText 
            as="h1" 
            text="Farid Karimi //" 
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter block"
          />
        </div>
        
        <div className="hidden xl:flex flex-col items-end text-[10px] font-mono gap-1 min-w-[200px]">
           <div className="flex items-center gap-2">
             <span className="text-phosphor">[ SYSTEM_ONLINE ]</span>
             <span className="w-2 h-2 bg-phosphor rounded-full animate-pulse"></span>
           </div>
           <span className="opacity-50">LOC: TEHRAN, IRAN</span>
           <span className="opacity-50">UNIV: SHAHID BEHESHTI</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Avatar & Quick Stats */}
        <div className="lg:col-span-3 flex flex-col gap-6">
           <a 
             href={profileImg} 
             target="_blank" 
             rel="noopener noreferrer"
             className="block border border-border-dim p-1 bg-terminal-gray relative group overflow-hidden aspect-square cursor-pointer"
           >
              <div className="absolute inset-0 bg-phosphor/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img 
                src={profileImg} 
                alt="Profile" 
                className="w-full h-full object-cover contrast-125 brightness-90 saturate-[0.4] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 text-[10px] text-phosphor bg-black/50 px-1 z-20">
                My_Images
              </div>
           </a>

           <div className="border border-border-dim p-4 space-y-4 font-mono text-xs bg-terminal-gray">
              <div className="flex justify-between items-center border-b border-border-dim pb-2">
                 <span className="text-gray-500">CURRENT_STATUS</span>
                 <span className="text-white">STUDENT</span>
              </div>
              <div className="flex justify-between items-center border-b border-border-dim pb-2">
                 <span className="text-gray-500">FOCUS</span>
                 <span className="text-phosphor">CREATION</span>
              </div>
           </div>
        </div>

        {/* Center Column: Terminal (About Me Content) */}
        <div className="lg:col-span-6 flex flex-col h-full min-h-[500px]">
           <div className="flex-1 bg-terminal-gray border border-border-dim relative overflow-hidden flex flex-col">
              {/* Terminal Window Header */}
              <div className="bg-white/5 border-b border-border-dim p-2 flex justify-between items-center">
                 <div className="flex gap-1.5 ml-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-border-dim"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-border-dim"></div>
                 </div>
                 <span className="text-[10px] uppercase tracking-widest opacity-50">Terminal_Session: Bio_Link</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm space-y-6 overflow-y-auto custom-scrollbar flex-1">
                 
                 {/* Command Block: whoami */}
                 <div>
                    <div className="flex gap-3 mb-2">
                        <span className="text-phosphor shrink-0">USER@SBU:~$</span>
                        <span className="text-white">whoami</span>
                    </div>
                    <div className="pl-4 border-l-2 border-border-dim ml-1 text-text-dim">
                        <span>farid_karimi</span>
                    </div>
                 </div>

                 {/* Command Block: cat about_me.txt */}
                 <div>
                     <div className="flex gap-3 mb-2">
                        <span className="text-phosphor shrink-0">USER@SBU:~$</span>
                        <span className="text-white">cat about_me.txt</span>
                     </div>
                     <div className="pl-4 border-l-2 border-border-dim ml-1 space-y-4 text-text-dim leading-relaxed">
                        <p>
                          I’m a <span className="text-white">Computer Science student</span> who’s driven by the idea of creating things that matter—whether that means tools used by many people or projects that make life a little better for someone out there. For me, technology is more than just code; it’s a way to be both creative and useful, and to make the most of my limited time by pushing for better conditions through what I build.
                        </p>
                        <p>
                          Outside of tech, I’m fascinated by the beauty of creation in different forms—<span className="text-phosphor">photography</span>, <span className="text-phosphor">origami</span>, even <span className="text-phosphor">woodworking</span> (though I’ve only admired it from afar). These interests remind me that building something meaningful can start from the simplest materials, whether it’s paper, wood, or lines of code.
                        </p>
                     </div>
                 </div>

                 {/* Command Block: list interests (Flavor) */}
                 <div>
                    <div className="flex gap-3 mb-2">
                       <span className="text-phosphor shrink-0">USER@SBU:~$</span>
                       <span className="text-white">grep -r "Interests" ./mind</span>
                    </div>
                    <div className="pl-4 text-text-dim grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <span>&gt; Photography</span>
                        <span>&gt; Origami</span>
                        <span>&gt; Woodworking</span>
                        <span>&gt; Open Source</span>
                    </div>
                 </div>
                 
                 {/* Active Cursor */}
                 <div className="flex gap-3 pt-2">
                    <span className="text-phosphor shrink-0">USER@SBU:~$</span>
                    <span className="w-2.5 h-5 bg-phosphor animate-pulse"></span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: Skills & Map */}
        <div className="lg:col-span-3 flex flex-col gap-6">
           
           {/* Languages */}
           <div className="bg-terminal-gray border border-border-dim p-4">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 border-b border-border-dim pb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {['C++', 'Python', 'Java'].map(tech => (
                  <span key={tech} className="text-xs bg-white/5 px-2 py-1 text-white border border-transparent hover:border-phosphor/50 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
           </div>

           {/* Frameworks */}
           <div className="bg-terminal-gray border border-border-dim p-4">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 border-b border-border-dim pb-2">Frameworks & Libs</h4>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'].map(tech => (
                  <span key={tech} className="text-xs bg-white/5 px-2 py-1 text-white border border-transparent hover:border-phosphor/50 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
           </div>

           {/* Tools */}
           <div className="bg-terminal-gray border border-border-dim p-4">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 border-b border-border-dim pb-2">Tools & Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {['Git', 'GitHub', 'Hugging Face', 'PostgreSQL', 'Jupyter', 'LaTeX'].map(tech => (
                  <span key={tech} className="text-xs bg-white/5 px-2 py-1 text-white border border-transparent hover:border-phosphor/50 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
           </div>
           
           {/* Map Section */}
           <div className="relative border border-border-dim bg-terminal-gray overflow-hidden h-[200px] group">
              {/* Interactive OSM Map - Embed centered on SBU */}
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                title="Shahid Beheshti University Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=51.388,35.795,51.400,35.805&layer=mapnik&marker=35.7997,51.3934" 
                className="absolute inset-0 w-full h-full opacity-60 hover:opacity-100 transition-opacity"
                style={{ filter: 'grayscale(100%) invert(100%) contrast(1.2) brightness(0.8) sepia(0.2) hue-rotate(100deg)' }}
              ></iframe>
              
              {/* Overlays to keep the terminal feel over the map */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-3 left-3 pointer-events-none">
                 <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-white font-bold bg-black/50 px-1">SHAHID BEHESHTI UNIV</span>
                 </div>
                 <div className="text-[9px] text-phosphor font-mono bg-black/50 px-1 inline-block">
                    35.7997° N, 51.3934° E
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default TerminalHome;