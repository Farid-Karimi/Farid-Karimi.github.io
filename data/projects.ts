import { Project } from '../types';

export const PROJECTS: Project[] = [
  // --- PROJECTS (External Links) ---
  {
    id: '1',
    type: 'project',
    refId: '#REC-001',
    title: 'Movie Recommendation System',
    description: 'CineMatch is a movie recommendation system designed to provide personalized movie suggestions. It builds on data from The Movie Database (TMDb) and MovieLens to deliver relevant recommendations.',
    content: '',
    tags: ['Python', 'Content-based filtering', 'Collaborative filtering'],
    imageUrl: 'https://picsum.photos/seed/cine/600/400?grayscale',
    externalLink: 'https://github.com',
    date: '2023.12.01',
    stats: { label: 'DATASET', value: 'TMDB' }
  },
  {
    id: '2',
    type: 'project',
    refId: '#AI-099',
    title: 'AI-Powered Burnout Coach',
    description: 'Equa is a comprehensive system for burnout detection that uses machine learning and a large language model (LLM) to provide a proactive approach to workplace wellness through analyzing key employee metrics.',
    content: '',
    tags: ['Python', 'PyTorch', 'Scikit-learn', 'LLM'],
    imageUrl: 'https://picsum.photos/seed/ai/600/401?grayscale',
    externalLink: 'https://github.com',
    date: '2023.11.15',
    stats: { label: 'MODEL', value: 'LLM' }
  },
  {
    id: '3',
    type: 'project',
    refId: '#NLP-BERT',
    title: 'Sentiment Analysis',
    description: 'A fine-grained sentiment analysis project exploring classical and modern approaches to classify subtle emotional cues. Implementations include SVMs, RNNs and logistic regression, as well as transformer-based models (BERT / DistilBERT).',
    content: '',
    tags: ['Python', 'PyTorch', 'BERT', 'DistilBERT'],
    imageUrl: 'https://picsum.photos/seed/nlp/600/402?grayscale',
    externalLink: 'https://github.com',
    date: '2023.10.10',
    stats: { label: 'ACCURACY', value: 'SOTA' }
  },
  {
    id: '4',
    type: 'project',
    refId: '#GAME-CPP',
    title: 'Pac-Man CLI',
    description: 'A Pac-Man inspired game with randomly generated maps, custom colors, and a leaderboard. Maze generation uses DFS, ghost behavior is driven by BFS, visuals are rendered using ASCII art and Unicode.',
    content: '',
    tags: ['C++', 'CLI', 'ASCII visuals', 'DFS', 'BFS'],
    imageUrl: 'https://picsum.photos/seed/game/600/403?grayscale',
    externalLink: 'https://github.com',
    date: '2023.09.05',
    stats: { label: 'LANG', value: 'C++' }
  },

  // --- TALKS (Internal Blogs) ---
  {
    "id": "7749",
    "type": "talk",
    "refId": "#RES-30",
    "title": "Resume Guide",
    "description": "A quick guide I made for first year students on how to write a decent resume.",
    "content": "<h1>Building Your First Resume</h1><br /><h2>1. Understanding the Purpose of Your Resume</h2><br /><br />A resume is basically a quick, neat way to show people what you’ve done and what you can do.  <br />It’s not your life story, it’s more like a highlight reel.<br /><br /><h3><b>Academic vs. industry resumes</b>  </h3><br />If you’re aiming for a <b>TA<i> or </i>research assistant</b> position, the focus is on education, academic projects, teaching experience, skills, awards, and other achievements from your studies.  <br />For industry jobs, the spotlight is more on <b>skills<i>, experience, </i>measurable</b> results, and short project descriptions.<br /><br />For most undergrads, keeping it to one page is best. Two pages is fine only if you’ve actually done a lot worth putting in there not just because you want to fit in your high school debate trophy.<br /><h2>2. Core Principles for First-Time Resume Writers</h2><br /><br /><h3><b>ATS-friendly design</b>  </h3><br />- <a href='https://en.wikipedia.org/wiki/Applicant<i>tracking</i>system' target='_blank' rel='noopener noreferrer'>ATS (Applicant Tracking Systems)</a>it's basically a robot that scans resumes. <b>Robots get confused by fancy stuff</b>, so keep it simple. <br />- Pick standard fonts like Times New Roman, Arial, Calibri, or Helvetica.  <br />- If you’re using LaTeX, <code class=\"bg-white/10 px-1 rounded\">\\usepackage{lmodern}</code> is a safe choice.  <br />- Avoid tables for your main content; sections and bullet points are your friends.<br /><h3><b>Clarity and brevity</b>  </h3><br />- Use bullet points that start with action verbs like Designed, Developed, Led, or Analyzed.  <br />- Don’t write a paragraph in a bullet point keep it under two lines.<br /><h3><b>Measurable achievements</b>  </h3><br />- Numbers make things stronger. Instead of saying “Helped with grading,” say “Graded assignments for 60 students, with feedback ready in three days.”<br /><h3><b>Consistency</b>  </h3><br />- Dates should follow the same format throughout (e.g., Jan 2025 – May 2025).  <br />- Section titles should look the same in terms of font and size. Same with bullet styles.<br /><h3><b>Relevance</b>  </h3><br />- Cut anything that doesn’t help your case for the role.  <br />- And seriously make different versions for different roles. One-size-fits-all resumes just look lazy. Read the requirements and put in the things that match.<br /><br /><h2>3. Recommended Resume Structure</h2><br /><br />1. <b>Header</b>  <br />    Name, email, phone, LinkedIn, GitHub. No photo unless it’s required.<br />2. <b>Education</b>  <br />    University name, major, GPA if it’s decent (above 3.2/4.0), relevant coursework.<br />3. <b>Teaching Experience (or Academic Experience)</b>  <br />    TA roles, tutoring, mentoring. Use bullet points with numbers and specifics.<br />4. <b>Projects</b>  <br />    University or personal projects, especially if they’re related to teaching or open-source work.<br />5. <b>Skills</b>  <br />    Programming languages, tools, LaTeX, teaching-related software like GitHub Classroom.<br />6. <b>Awards and Achievements</b>  <br />    Scholarships, competitions, publications.<br />7. <b>Optional</b>  <br />    Languages or certifications.<br /><br /><h2>4. LaTeX Resume Building Tips</h2><br /><br />- Use Overleaf for LaTeX editing - <a href='https://www.overleaf.com/gallery/tagged/cv' target='_blank' rel='noopener noreferrer'>Overleaf Resume Templates</a><br />- <b>BUT<i> overleaf is filtered in Iran and it doesn't play nicely with vpns so I recommend to setup </i>TexStudio</b> but it is not that easy so the choice is yours.<br /><br />Good starting templates:<br />- <a href='https://github.com/posquit0/Awesome-CV' target='_blank' rel='noopener noreferrer'>Awesome CV</a> - modern and works well for academic stuff.<br />- <a href='https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs' target='_blank' rel='noopener noreferrer'>Jake’s Resume</a> - clean and simple (My resume template) .<br /><br />Keep color use minimal <b>black<i> or </i>gray</b> is safest.  <br />Avoid text boxes, images, or complicated tables if you want your resume to play nice with ATS.<br /><br /><h2>5. Writing the Content</h2><br /><br />- Follow this formula for bullet points: <b>Action verb + task + result</b>.  <br />\t<b>Example</b>: \"Led a study group of 15 students, improving average scores by 20%\".<br />- Use past tense for past work and present tense for ongoing work.  <br />- For TA roles, highlight <b>the impact you had on students</b>.<br /><h2>6. What to Avoid</h2><br /><br />- <b>Two-column layouts</b>. You’re not making a magazine spread, also they are less ATS friendly.<br />- <b>Personal pronouns</b> like “I” or “my.”<br />- Don’t write <b>“helped”<i> or </i>“worked on.”</b> Be clear about what you did.  <br /><h2>7. Useful Resume-Building Websites</h2><br /><br />- <b>Templates</b><br />\t- <a href='https://www.overleaf.com/gallery/tagged/cv' target='_blank' rel='noopener noreferrer'>Overleaf CV Library</a><br />\t- <a href='https://www.latextemplates.com/cat/curricula-vitae' target='_blank' rel='noopener noreferrer'>LaTeX Templates – CVs</a><br />- <b>Industry Resume Checkers</b><br />\t- <a href='https://www.jobscan.co/' target='_blank' rel='noopener noreferrer'>Jobscan ATS Checker</a><br />\t- <a href='https://resumeworded.com/' target='_blank' rel='noopener noreferrer'>ResumeWorded</a><br />- <b>Academic Resume Examples</b><br />\t- <a href='https://capd.mit.edu/resources/resumes-cvs-cover-letters-and-linkedin/' target='_blank' rel='noopener noreferrer'>MIT Career Advising CV Guide</a><br /><h2>8. Adapting for Jobs Beyond TA Roles</h2><br /><br />- If you’re applying for industry jobs, focus more on <b>skills<i> and </i>results</b> rather than academic awards.  <br />- Add <b>soft skills</b> like teamwork, communication, or leadership.  <br />- You can also start with a short summary or objective at the top to explain what you’re looking for.<br /><h2>9. FAQ</h2><br /><br /><h3>1. Why use LaTeX instead of Word?  </h3><br />- LaTeX gives you more control over formatting and makes things look more professional.  <br />- It’s also a skill you’ll need in later semesters for technical reports in courses like <b>data Science<i> or </i>Machine Learning</b>.  <br />- If you’re in a rush, there are online resume builders, but I do not recommend you to use them.<br /><h3>2. Why make a resume now if I have nothing to put on it?  </h3><br />- Because you’ll need one eventually, and <b>it’s easier to start early</b> and just keep it updated.  <br />- When you’re in your third year and suddenly need a resume, <b>you won’t have to dig through old messages</b> or remember what year you joined that student club.  <br />- It’s also practice for writing about yourself in a professional way.<br /><h3>3. Should I include high school stuff?  </h3><br />Only <b>if it’s really relevant.</b> Winning a national coding competition in high school? Sure. Your 10th-grade math club attendance? Probably not.<br /><h3>4. Do I need a photo?  </h3><br />Not unless the application asks for it. <b>Most resumes are without photos</b> and they are just fine.<br /><h3>5. How often should I update my resume?  </h3><br /><b>Every semester</b> is a good habit. Add new projects, jobs, or awards while they’re fresh in your mind.<br /><h3>6. Can I use colors or fancy fonts to make my resume stand out?  </h3><br />You can, but <b>don’t overdo it</b>. A clean, readable layout will “stand out” more than bright purple headings.<br /><h3>7. Should I put hobbies on my resume?  </h3><br />Only if they’re interesting or connected to the role. “I play chess competitively” is fine. “I like watching movies” is filler.",
    "tags": [
      "Resume"
    ],
    "imageUrl": "https://cdn.enhancv.com/images/1920/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vSG93X3RvX3dyaXRlX2FfcmVzdW1lX2ZlYXR1cmVfaW1nXzdiMDFhYjNmNDEuanBn.jpg",
    "date": "2026-02-11",
    "stats": {
      "label": "READ_TIME",
      "value": "15 MIN"
    }
  }
];