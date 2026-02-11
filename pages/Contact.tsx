import React, { useState } from 'react';
import GlitchText from '../components/GlitchText';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SENDING');
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xgvlqwjl', {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (err) {
      setStatus('ERROR');
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-[1600px] mx-auto min-h-full flex flex-col">
       <header className="mb-12 border-b border-border-dim pb-8">
          <GlitchText 
            as="h1" 
            text="ESTABLISH_UPLINK" 
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2 block"
          />
          <p className="text-sm text-text-dim mt-4 max-w-xl">
             Initiate secure transmission protocol. Messages are encrypted and routed directly to the operator's neural interface.
          </p>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1 pb-12">
          
          <div className="bg-terminal-gray border border-border-dim p-8 relative overflow-hidden group">
             <div className="absolute inset-0 bg-phosphor/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
             
             {status === 'SUCCESS' ? (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 border-2 border-phosphor rounded-full flex items-center justify-center animate-pulse">
                       <span className="material-symbols-outlined text-phosphor text-3xl">check</span>
                    </div>
                    <h3 className="text-white text-xl font-mono">TRANSMISSION COMPLETE</h3>
                    <p className="text-text-dim text-sm max-w-xs mx-auto">Payload delivered successfully. Acknowledgment receipt generated.</p>
                    <button 
                       onClick={() => setStatus('IDLE')}
                       className="mt-6 px-6 py-2 border border-border-dim text-xs uppercase hover:bg-phosphor hover:text-black transition-all"
                    >
                       Reset Uplink
                    </button>
                 </div>
             ) : (
                 <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                       <label htmlFor="name" className="block text-[10px] uppercase text-gray-500 mb-2 tracking-widest">Identify Source</label>
                       <input 
                         type="text" 
                         name="name"
                         id="name"
                         required
                         placeholder="ENTER_DESIGNATION"
                         className="w-full bg-black/50 border border-border-dim p-3 text-white font-mono text-sm focus:border-phosphor outline-none focus:ring-1 focus:ring-phosphor/50 transition-all placeholder:text-gray-700"
                       />
                    </div>
                    
                    <div>
                       <label htmlFor="email" className="block text-[10px] uppercase text-gray-500 mb-2 tracking-widest">Return Address</label>
                       <input 
                         type="email" 
                         name="email"
                         id="email"
                         required
                         placeholder="ENTER_EMAIL_PROTOCOL"
                         className="w-full bg-black/50 border border-border-dim p-3 text-white font-mono text-sm focus:border-phosphor outline-none focus:ring-1 focus:ring-phosphor/50 transition-all placeholder:text-gray-700"
                       />
                    </div>

                    <div>
                       <label htmlFor="message" className="block text-[10px] uppercase text-gray-500 mb-2 tracking-widest">Message Payload</label>
                       <textarea 
                         name="message"
                         id="message"
                         required
                         rows={5}
                         placeholder="INPUT_DATA_STREAM..."
                         className="w-full bg-black/50 border border-border-dim p-3 text-white font-mono text-sm focus:border-phosphor outline-none focus:ring-1 focus:ring-phosphor/50 transition-all resize-none placeholder:text-gray-700"
                       />
                    </div>

                    <button 
                       type="submit" 
                       disabled={status === 'SENDING'}
                       className="w-full py-4 bg-phosphor/10 border border-phosphor text-phosphor font-bold uppercase tracking-[0.2em] hover:bg-phosphor hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                       {status === 'SENDING' ? 'TRANSMITTING...' : 'INITIATE_UPLOAD'}
                    </button>
                    {status === 'ERROR' && (
                      <div className="text-red-500 text-xs text-center font-mono mt-2">
                        TRANSMISSION FAILED. RETRY PROTOCOL INITIATED.
                      </div>
                    )}
                 </form>
             )}
          </div>

          <div className="space-y-8">
             <div className="border border-border-dim p-6 bg-black/20">
                <h3 className="text-white text-xs uppercase tracking-widest mb-6 border-b border-border-dim pb-2 flex items-center justify-between">
                   <span>Direct Links</span>
                   <span className="w-2 h-2 bg-phosphor rounded-full animate-pulse"></span>
                </h3>
                <div className="space-y-4">
                   <a href="https://github.com/farid-karimi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group p-3 border border-transparent hover:border-border-dim hover:bg-white/5 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-gray-500 group-hover:text-white">code</span>
                         <span className="text-sm text-gray-400 group-hover:text-phosphor font-mono">GITHUB_REPO</span>
                      </div>
                      <span className="text-[10px] text-gray-600 group-hover:text-white">ACCESS -&gt;</span>
                   </a>
                   
                   <a href="https://unsplash.com/@farid_karimi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group p-3 border border-transparent hover:border-border-dim hover:bg-white/5 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-gray-500 group-hover:text-white">camera_alt</span>
                         <span className="text-sm text-gray-400 group-hover:text-phosphor font-mono">UNSPLASH_GALLERY</span>
                      </div>
                      <span className="text-[10px] text-gray-600 group-hover:text-white">VIEW -&gt;</span>
                   </a>

                   <a href="https://www.linkedin.com/in/farid-kmi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group p-3 border border-transparent hover:border-border-dim hover:bg-white/5 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-gray-500 group-hover:text-white">work</span>
                         <span className="text-sm text-gray-400 group-hover:text-phosphor font-mono">LINKEDIN_PROFILE</span>
                      </div>
                      <span className="text-[10px] text-gray-600 group-hover:text-white">CONNECT -&gt;</span>
                   </a>

                   <a href="https://farid-karimi.github.io/Codeverse/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group p-3 border border-transparent hover:border-border-dim hover:bg-white/5 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-gray-500 group-hover:text-white">rocket_launch</span>
                         <span className="text-sm text-gray-400 group-hover:text-phosphor font-mono">CODEVERSE_PORTAL</span>
                      </div>
                      <span className="text-[10px] text-gray-600 group-hover:text-white">LAUNCH -&gt;</span>
                   </a>
                </div>
             </div>
             
             <div className="p-6 border border-border-dim bg-terminal-gray/50 text-center">
                <span className="material-symbols-outlined text-gray-600 text-4xl mb-4">satellite_alt</span>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                   Signal Strength: 100%
                </p>
             </div>
          </div>

       </div>
    </div>
  );
};

export default Contact;