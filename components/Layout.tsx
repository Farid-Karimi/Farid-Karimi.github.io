import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: '01', label: '01. Neural_Arch', path: '/', icon: 'terminal' },
  { id: '02', label: '02. Talks', path: '/talks', icon: 'history_edu' }, // New item
  { id: '03', label: '03. Projects', path: '/projects', icon: 'folder_open' },
  { id: '04', label: '04. Comm_Link', path: '/contact', icon: 'satellite_alt' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-background text-text-dim font-mono">
      {/* Visual Effects */}
      <div className="noise-overlay" />
      <div className="scanlines" />
      
      {/* Top Mobile / Tablet Header */}
      <header className="lg:hidden flex-none flex justify-between items-center p-4 border-b border-border-dim z-20 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 bg-phosphor animate-pulse"></span>
           <span className="text-white tracking-widest text-xs">NODE_AUTH</span>
        </div>
        <div className="text-[10px] text-phosphor">SYS_READY</div>
      </header>

      <div className="flex flex-1 h-full relative z-10 overflow-hidden">
        {/* Sidebar Navigation (Desktop) - Fixed height relative to container */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-border-dim bg-background/95 h-full z-20">
          <div className="p-8 border-b border-border-dim flex-none">
            <h1 className="text-white text-sm tracking-tighter uppercase font-semibold">
              Node_Auth_Portfolio
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_5px_#33ff33]"></span>
              <span className="text-[10px] text-text-dim uppercase tracking-widest">
                v4.2.0 STABLE
              </span>
            </div>
          </div>

          <nav className="flex-1 py-8 overflow-y-auto">
            <ul className="space-y-1 px-4">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 text-xs tracking-wider transition-all duration-300 group
                        border-l-2 ${isActive 
                          ? 'border-phosphor bg-phosphor-dim text-white' 
                          : 'border-transparent hover:border-phosphor/50 hover:bg-white/5 text-text-dim hover:text-white'
                        }
                      `}
                    >
                      <span className={`material-symbols-outlined text-sm ${isActive ? 'text-phosphor' : 'text-gray-500 group-hover:text-phosphor'}`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-8 border-t border-border-dim space-y-4 flex-none">
             <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span>CPU_LOAD</span>
                  <span className="text-phosphor">14%</span>
                </div>
                <div className="w-full bg-border-dim h-[2px]">
                  <div className="bg-phosphor h-full w-[14%] animate-pulse"></div>
                </div>
             </div>
             <div className="text-[10px] text-gray-600 font-mono">
                ID: FK-833-P
             </div>
          </div>
        </aside>

        {/* Main Content Area - Scrollable internally */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative scroll-smooth">
          {children}
        </main>
      </div>
      
      {/* Mobile Footer Nav */}
      <nav className="lg:hidden flex-none fixed bottom-0 w-full bg-background border-t border-border-dim z-30 flex justify-around p-2">
         {NAV_ITEMS.map((item) => (
           <NavLink 
              key={item.id} 
              to={item.path} 
              className={({isActive}) => `flex flex-col items-center p-2 ${isActive ? 'text-phosphor' : 'text-gray-600'}`}
           >
              <span className="material-symbols-outlined">{item.icon}</span>
           </NavLink>
         ))}
      </nav>
    </div>
  );
};

export default Layout;