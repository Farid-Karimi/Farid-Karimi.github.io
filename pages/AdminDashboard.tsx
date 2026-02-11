import React, { useState, useEffect } from 'react';
import { ItemType } from '../types';

// --- CONFIGURATION ---
const DEFAULT_GH_CONFIG = {
  token: '',
  owner: 'Farid-Karimi',
  repo: 'Farid-Karimi.github.io',
  branch: 'master',
  path: 'data/projects.ts'
};

const AdminDashboard: React.FC = () => {
  // --- Form State ---
  const [formData, setFormData] = useState<{
    type: ItemType;
    title: string;
    description: string;
    content: string;
    tags: string[];
    imageUrl: string;
    externalLink: string;
    statsLabel: string;
    statsValue: string;
  }>({
    type: 'project', // Default
    title: '',
    description: '',
    content: '## Section 1\nStart writing markdown here...',
    tags: [],
    imageUrl: 'https://picsum.photos/600/400',
    externalLink: '',
    statsLabel: '', // Default empty
    statsValue: ''  // Default empty
  });
  const [tagInput, setTagInput] = useState('');

  // --- Output State ---
  const [generatedJson, setGeneratedJson] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>(['> SYSTEM_READY', '> AWAITING_INPUT']);

  // --- GitHub Config State ---
  const [ghConfig, setGhConfig] = useState(DEFAULT_GH_CONFIG);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    // Load GitHub config from local storage if available
    const savedConfig = localStorage.getItem('node_auth_gh_config');
    if (savedConfig) {
      // Merge saved config with defaults, but prioritize saved values
      setGhConfig(prev => ({ ...prev, ...JSON.parse(savedConfig) }));
    }
  }, []);

  const addLog = (msg: string) => {
    setConsoleLogs(prev => [...prev, `> ${msg}`]);
  };

  // --- Helpers ---
  const parseMarkdown = (md: string) => {
    let html = md
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1 rounded">$1</code>')
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Formatting
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/__(.*)__/gim, '<b>$1</b>')
      .replace(/_(.*)_/gim, '<i>$1</i>')
      // Links & Images
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' class='my-4 border border-border-dim' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank' rel='noopener noreferrer'>$1</a>")
      // Newlines to breaks (simple approach)
      .replace(/\n/gim, '<br />');

    return html.trim();
  };

  const generateProjectObject = () => {
    const newId = Math.floor(Math.random() * 10000).toString();
    const cleanTags = formData.tags || ['UNCATEGORIZED'];
    const refTag = cleanTags[0] ? cleanTags[0].substring(0, 3).toUpperCase() : 'DAT';

    // Only include relevant fields based on type
    const contentVal = formData.type === 'talk' ? parseMarkdown(formData.content || '') : '';
    const externalVal = formData.type === 'project' ? formData.externalLink : undefined;

    // Construct stats object if label and value are present
    const statsObj = formData.statsLabel && formData.statsValue ? {
      label: formData.statsLabel,
      value: formData.statsValue
    } : undefined;

    const projectObject = {
      id: newId,
      type: formData.type,
      refId: `#${refTag}-${Math.floor(Math.random() * 999)}`,
      title: formData.title,
      description: formData.description,
      content: contentVal,
      tags: formData.tags,
      imageUrl: formData.imageUrl,
      ...(externalVal ? { externalLink: externalVal } : {}),
      date: new Date().toISOString().split('T')[0],
      ...(statsObj ? { stats: statsObj } : {}),
    };

    return projectObject;
  };

  const handleGenerate = () => {
    const obj = generateProjectObject();
    setGeneratedJson(JSON.stringify(obj, null, 2));
    addLog('JSON_OBJECT_GENERATED');
  };

  const addTag = () => {
    if (tagInput) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput] });
      setTagInput('');
    }
  };

  // --- GitHub Logic ---
  const handleDeploy = async () => {
    // Sanitize inputs (remove accidental spaces)
    const owner = ghConfig.owner.trim();
    const repo = ghConfig.repo.trim();
    const path = ghConfig.path.trim();
    const branch = ghConfig.branch.trim();
    const token = ghConfig.token.trim();

    if (!token || !owner || !repo) {
      addLog('ERROR: MISSING_GITHUB_CREDENTIALS');
      return;
    }

    setIsDeploying(true);
    addLog('INITIATING_UPLINK_TO_GITHUB...');

    // Save sanitized config
    localStorage.setItem('node_auth_gh_config', JSON.stringify({ token, owner, repo, branch, path }));

    try {
      const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      // Add ref parameter to fetch from specific branch
      const fetchUrl = `${baseUrl}?ref=${branch}`;

      // 1. Get current file content
      addLog(`FETCHING_FILE: ${path} [${branch}]`);
      const getRes = await fetch(fetchUrl, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!getRes.ok) {
        const errData = await getRes.json().catch(() => ({}));
        let helpfulMsg = '';
        if (getRes.status === 404) helpfulMsg = '(File not found. Check Path/Branch/Token permissions)';
        if (getRes.status === 401) helpfulMsg = '(Unauthorized. Check Token)';

        throw new Error(`GitHub API Error ${getRes.status}: ${errData.message || getRes.statusText} ${helpfulMsg}`);
      }

      const fileData = await getRes.json();
      const currentContent = atob(fileData.content);

      // 2. Modify content
      // We look for the closing of the array `];`
      const projectObj = generateProjectObject();
      const jsonString = JSON.stringify(projectObj, null, 2);

      // A somewhat fragile but effective replacement for this specific file structure
      // Finds the last occurrence of "];" and inserts the new object before it
      const lastBracketIndex = currentContent.lastIndexOf('];');
      if (lastBracketIndex === -1) throw new Error('Could not parse PROJECTS array structure. Ensure file ends with "];"');

      const comma = currentContent.includes('}') ? ',' : ''; // Add comma if list not empty
      const newContent = currentContent.slice(0, lastBracketIndex) +
        `${comma}\n  ${jsonString}\n` +
        currentContent.slice(lastBracketIndex);

      // 3. Commit back
      addLog('UPLOADING_NEW_DATA_STREAM...');
      // PUT request needs branch in body
      const putRes = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `chore: add ${projectObj.type} "${projectObj.title}" via Admin Terminal`,
          content: btoa(newContent),
          sha: fileData.sha,
          branch: branch
        })
      });

      if (!putRes.ok) {
        const errData = await putRes.json().catch(() => ({}));
        throw new Error(`Commit Failed ${putRes.status}: ${errData.message || putRes.statusText}`);
      }

      addLog('SUCCESS: DEPLOYMENT_TRIGGERED');
      addLog('SYSTEM: Changes pushed to GitHub. Netlify/Pages should rebuild shortly.');
      setGeneratedJson(JSON.stringify(projectObj, null, 2));

    } catch (error: any) {
      addLog(`ERROR: ${error.message}`);
      console.error(error);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto custom-scrollbar">
      <header className="bg-terminal-gray border-b border-border-dim px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <h2 className="text-white font-mono text-sm">CONTENT_MANAGEMENT_SYS</h2>
          <span className="px-2 py-0.5 bg-phosphor/20 text-phosphor text-[9px] rounded border border-phosphor/50 animate-pulse">
            ADMIN_ACCESS_GRANTED
          </span>
        </div>
      </header>

      <div className="p-8 max-w-[1800px] mx-auto w-full grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* LEFT: Editor */}
        <div className="space-y-6">
          {/* 1. Meta Data Panel */}
          <div className="space-y-4 p-6 border border-border-dim bg-terminal-gray">
            <h3 className="text-white text-xs uppercase tracking-widest border-b border-border-dim pb-2 mb-4">01. Meta Data</h3>

            {/* Type Selection */}
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={formData.type === 'project'}
                  onChange={() => setFormData({ ...formData, type: 'project' })}
                  className="accent-phosphor"
                />
                <span className={`text-xs ${formData.type === 'project' ? 'text-white' : 'text-gray-500'}`}>Project (GitHub Link)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={formData.type === 'talk'}
                  onChange={() => setFormData({ ...formData, type: 'talk' })}
                  className="accent-phosphor"
                />
                <span className={`text-xs ${formData.type === 'talk' ? 'text-white' : 'text-gray-500'}`}>Talk (Article/Blog)</span>
              </label>
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-1">Title</label>
              <input
                type="text"
                className="w-full bg-black border border-border-dim p-2 text-white text-sm focus:border-phosphor outline-none transition-colors"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title..."
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-1">Description (Short)</label>
              <textarea
                className="w-full bg-black border border-border-dim p-2 text-white text-sm focus:border-phosphor outline-none h-20 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary for the cards..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  className="w-full bg-black border border-border-dim p-2 text-white text-sm focus:border-phosphor outline-none"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              {/* Conditional Field: External Link (Project) vs Placeholder (Talk) */}
              {formData.type === 'project' ? (
                <div>
                  <label className="block text-[10px] text-phosphor uppercase mb-1">External Link (GitHub)</label>
                  <input
                    type="text"
                    className="w-full bg-black border border-border-dim p-2 text-white text-sm focus:border-phosphor outline-none"
                    value={formData.externalLink}
                    onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
              ) : (
                <div className="opacity-50 pointer-events-none">
                  <label className="block text-[10px] text-gray-700 uppercase mb-1">External Link</label>
                  <input disabled className="w-full bg-black border border-border-dim p-2 text-gray-700 text-sm" placeholder="N/A for Talks" />
                </div>
              )}

              {/* NEW: Stats Section */}
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Stats Label</label>
                <input
                  type="text"
                  className="w-full bg-black border border-border-dim p-2 text-white text-sm focus:border-phosphor outline-none"
                  value={formData.statsLabel}
                  onChange={(e) => setFormData({ ...formData, statsLabel: e.target.value })}
                  placeholder="e.g. READ_TIME"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Stats Value</label>
                <input
                  type="text"
                  className="w-full bg-black border border-border-dim p-2 text-white text-sm focus:border-phosphor outline-none"
                  value={formData.statsValue}
                  onChange={(e) => setFormData({ ...formData, statsValue: e.target.value })}
                  placeholder="e.g. 5 MIN"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Tags (Press Enter)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full bg-black border border-border-dim p-2 text-white text-sm outline-none focus:border-phosphor"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  />
                  <button onClick={addTag} className="px-3 bg-border-dim text-white hover:bg-phosphor hover:text-black transition-colors">+</button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.tags?.map(t => (
                    <span key={t} className="text-[9px] bg-phosphor/10 text-phosphor px-1.5 border border-phosphor/20">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Content Editor (Visible only for Talks) */}
          {formData.type === 'talk' && (
            <div className="p-6 border border-border-dim bg-terminal-gray h-[500px] flex flex-col">
              <h3 className="text-white text-xs uppercase tracking-widest border-b border-border-dim pb-2 mb-4 flex justify-between">
                <span>02. Content Body</span>
                <span className="text-gray-500 text-[9px]">SUPPORTS MARKDOWN</span>
              </h3>
              <textarea
                className="flex-1 w-full bg-black border border-border-dim p-4 text-white font-mono text-sm focus:border-phosphor outline-none resize-none leading-relaxed"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="# Header\n\nWrite your article here..."
              />
            </div>
          )}
        </div>

        {/* RIGHT: Output & Actions */}
        <div className="flex flex-col h-full gap-6">

          {/* 3. GitHub Integration */}
          <div className="border border-border-dim bg-terminal-gray p-6">
            <h3 className="text-white text-xs uppercase tracking-widest border-b border-border-dim pb-2 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              03. GitHub Uplink (Auto-Deploy)
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-[9px] text-gray-500 uppercase mb-1">Owner</label>
                <input
                  className="w-full bg-black border border-border-dim p-2 text-white text-xs"
                  placeholder="e.g., username"
                  value={ghConfig.owner}
                  onChange={(e) => setGhConfig({ ...ghConfig, owner: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[9px] text-gray-500 uppercase mb-1">Repo</label>
                <input
                  className="w-full bg-black border border-border-dim p-2 text-white text-xs"
                  placeholder="e.g., portfolio"
                  value={ghConfig.repo}
                  onChange={(e) => setGhConfig({ ...ghConfig, repo: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[9px] text-gray-500 uppercase mb-1">Branch</label>
                <input
                  className="w-full bg-black border border-border-dim p-2 text-white text-xs"
                  placeholder="e.g., main"
                  value={ghConfig.branch}
                  onChange={(e) => setGhConfig({ ...ghConfig, branch: e.target.value })}
                />
              </div>
              <div className="col-span-3">
                <label className="block text-[9px] text-gray-500 uppercase mb-1">Personal Access Token (Repo Scope)</label>
                <input
                  type="password"
                  className="w-full bg-black border border-border-dim p-2 text-white text-xs"
                  placeholder="ghp_xxxxxxxxxxxx"
                  value={ghConfig.token}
                  onChange={(e) => setGhConfig({ ...ghConfig, token: e.target.value })}
                />
                <p className="text-[9px] text-gray-600 mt-1">Token is stored locally in your browser only.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                className="flex-1 py-3 border border-border-dim text-text-dim text-xs uppercase hover:text-white hover:border-white transition-colors"
              >
                Preview JSON Only
              </button>
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="flex-1 py-3 bg-phosphor/10 border border-phosphor text-phosphor text-xs uppercase tracking-widest hover:bg-phosphor hover:text-black transition-all disabled:opacity-50 disabled:cursor-wait"
              >
                {isDeploying ? 'TRANSMITTING...' : 'PUSH TO DEPLOY'}
              </button>
            </div>
          </div>

          {/* 4. Terminal Output */}
          <div className="flex-1 border border-border-dim bg-black p-4 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-2 text-[9px] text-gray-600 border-l border-b border-border-dim bg-terminal-gray">
              SYS_LOG
            </div>

            {/* Console Log Area */}
            <div className="h-32 overflow-y-auto font-mono text-[10px] text-gray-500 mb-4 border-b border-border-dim pb-2 space-y-1">
              {consoleLogs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>

            {/* JSON Preview Area */}
            <div className="flex-1 overflow-auto relative">
              <pre className="text-xs text-phosphor font-mono absolute inset-0 p-2">
                {generatedJson || '// Generated object will appear here...'}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;