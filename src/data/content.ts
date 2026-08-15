export const site = {
  name: "Farid Karimi",
  email: "fkarimi8320@gmail.com",
  github: "https://github.com/Farid-Karimi",
  githubPages: "https://farid-karimi.github.io",
  linkedin: "https://www.linkedin.com/in/farid-kmi",
  telegram: "https://t.me/farid_kmi",
  location: "Tehran, Iran",
  status: "CS @ Shahid Beheshti University · B.Sc. 2026",
  gpa: "18.85/20",
  taCredits: 27,
  formspree: "https://formspree.io/f/xgvlqwjl",
};

export const hero = {
  headline: "FARID KARIMI",
  subtitle:
    "AI/ML Engineer — building recommenders, LLM agents, and end-to-end ML pipelines.",
  statusLine: "CS Student & AI/ML Engineer, Tehran",
};

export const marquee = [
  "Recommendation Systems",
  "LLM Agents",
  "Bioinformatics",
  "PyTorch",
  "LangGraph",
  "LangChain",
  "Scikit-learn",
  "n8n",
  "Docker",
  "Power BI",
  "Data Pipelines",
  "Streamlit",
];

export const services = [
  {
    title: "AI/ML Engineering",
    description:
      "Building intelligent systems with PyTorch, LangGraph, LangChain, N8N, Scikit-learn, and LLM APIs. Specializing in AI Agents, recommendation systems, NLP, and predictive models.",
  },
  {
    title: "Data Science",
    description:
      "End-to-end data pipelines using pandas, NumPy, PowerBI and SQL. Experience with large record datasets and statistical analysis.",
  },
  {
    title: "Photography",
    description:
      "Landscape and travel photography. Published on Unsplash with 2M+ views, capturing the world through my lens.",
  },
  {
    title: "Research & Academic Work",
    description:
      "Scientific reviewer for CS Department Journal. Published section on ML in Mental Health and Suicide Risk Detection.",
  },
  {
    title: "Software Development",
    description:
      "Full-stack deployment with Docker, Git, Streamlit, and cloud APIs. Built Telegram bots and web applications.",
  },
  {
    title: "Teaching & Mentoring",
    description:
      "Head TA across 27+ course credit hours. Supervisor & Teacher at Salam High School, Head of Scientific Committee, coordinating seminars and academic events.",
  },
];

export const about = {
  hook: "I build AI systems that turn research into practical tools.",
  paragraphs: [
    "My work spans machine learning, large language models, recommender systems, and intelligent automation, with a focus on creating software that solves real problems rather than showcasing algorithms.",
    "My journey combines research, engineering, and education. I've contributed to AI research, mentored hundreds of students as a TA, reviewed academic papers for the department journal, and continuously explore new developments in intelligent systems.",
    "I believe great software comes from balancing curiosity with engineering discipline. I like exploring new ideas, but I care just as much about clean implementation, maintainability, and building products that deliver real value.",
  ],
};

export const stats = [
  { value: "18.85", label: "GPA / 20" },
  { value: "27", label: "credit hours taught" },
  { value: "05", label: "projects shipped" },
  { value: "98,979", label: "cells analyzed" },
];

export interface Project {
  slug: string;
  title: string;
  year: number;
  role: string;
  stack: string[];
  metrics: Array<{ label: string; value: string }>;
  summary: string;
  featured: boolean;
  order: number;
  sections: {
    summary: string;
    challenge: string;
    architecture: string;
    results: string;
  };
}

export const projects: Project[] = [
  {
    slug: "ai-research-agent",
    title: "AI-Agent for Research Channel",
    year: 2025,
    role: "Solo Developer",
    stack: ["n8n", "Gemini API", "OpenRouter", "DeepSeek", "Telegram API"],
    metrics: [
      { label: "Sources fused", value: "YT + Web + Papers" },
      { label: "Uptime", value: "24/7 bot" },
    ],
    summary:
      "An autonomous Telegram research agent that watches YouTube lectures, reads papers, and scans the web — returning structured, AI-generated summaries on demand.",
    featured: true,
    order: 1,
    sections: {
      summary:
        "An autonomous research assistant that lives inside Telegram: you send it a topic, and it returns a structured summary synthesized from a YouTube lecture transcript, web articles, and academic papers. It was designed to close the gap between raw research material and usable notes, and to run unattended as a 24/7 bot. Built solo in 2025 with n8n orchestrating the entire pipeline.",
      challenge:
        "Research discovery is fragmented across YouTube, the web, and paper repositories, and none of those sources is structured for quick reading. Extracting transcripts reliably, parsing noisy web content, and condensing multi-source material into one coherent summary demands long-context handling and careful prompt design. Keeping the whole flow alive 24/7 also means every stage needs retries, timeouts, and fallbacks.",
      architecture:
        "n8n is the orchestrator: a Telegram webhook triggers the workflow, a fetch stage gathers the sources, and an LLM stage synthesizes the summary. The Gemini API handles the primary summarization pass, while OpenRouter routes fallback requests to DeepSeek models whenever a provider is rate-limited or unavailable. Each stage is an isolated, testable node, with state passed as JSON between nodes and errors surfaced back to the user in Telegram.",
      results:
        "The bot runs as a 24/7 service, fusing YouTube, web, and paper sources into summaries on demand. It replaced hours of manual note-taking during coursework and research reading, and the modular n8n graph means adding a new source type is a small node change.",
    },
  },
  {
    slug: "movie-recommender",
    title: "Movie Recommendation System",
    year: 2024,
    role: "Solo Developer",
    stack: ["Python", "Scikit-learn", "Surprise", "Hugging Face"],
    metrics: [
      { label: "RMSE", value: "0.89" },
      { label: "Storage", value: "15x less" },
      { label: "Memory", value: "<1GB" },
    ],
    summary:
      "A hybrid recommender that combines content-based retrieval with SVD collaborative filtering — hitting an RMSE of 0.89 while keeping the full index under 1GB of memory.",
    featured: true,
    order: 2,
    sections: {
      summary:
        "A hybrid movie recommendation system that combines content-based retrieval with SVD collaborative filtering. Candidate movies are first narrowed by content similarity, then reranked by a matrix-factorization model trained on user ratings. The system reaches an RMSE of 0.89 while keeping the full index under 1GB of memory.",
      challenge:
        "Pure collaborative filtering suffers from the cold-start problem for new and unpopular movies, while pure content-based systems never learn taste. The full rating matrix is also expensive to store on disk and hold in memory. The goal was a system that fixes cold start, stays under 1GB of RAM, and still scores below an RMSE of 1.0.",
      architecture:
        "The Surprise library provides the SVD implementation; scikit-learn is used for content features and similarity computation; public ratings data is pulled through Hugging Face. Retrieval uses content fingerprints to produce a short candidate list per user, and the SVD reranker scores those candidates with learned latent factors. Feature data is compressed and quantized so the whole index takes 15x less storage than the raw matrix.",
      results:
        "The pipeline reports an RMSE of 0.89 on held-out ratings, with the complete index running in under 1GB of memory and occupying 15x less storage than the raw ratings matrix. The two-stage design keeps cold-start behavior sane: unseen movies still surface through content retrieval, while the SVD personalizes the final ordering.",
    },
  },
  {
    slug: "burnout-detector",
    title: "AI-Powered Burnout Detector",
    year: 2024,
    role: "Solo Developer",
    stack: ["Python", "Scikit-learn", "Streamlit", "Mistral-7B"],
    metrics: [
      { label: "R²", value: "0.90" },
      { label: "Records", value: "22.7K" },
    ],
    summary:
      "A burnout-risk predictor trained on 22.7K employee records with an R² of 0.90, fronted by a Streamlit dashboard whose predictions are explained in plain language by Mistral-7B.",
    featured: true,
    order: 3,
    sections: {
      summary:
        "A machine-learning tool that predicts burnout risk in the workplace from survey and HR-style records. Trained on 22.7K employee records, the regression model reaches an R² of 0.90 and explains its predictions in plain language through a Mistral-7B-powered layer. The whole thing ships as a Streamlit app that a non-technical user can operate.",
      challenge:
        "Workplace burnout data is noisy, self-reported, and heavy on missing values, and a raw risk score means little to someone who is not a data scientist. The model needed to be accurate enough to trust — hence 5-fold cross-validation throughout — and explainable enough to act on.",
      architecture:
        "A scikit-learn preprocessing pipeline handles imputation, encoding, and scaling, feeding a gradient-boosting regressor. Every modeling choice is validated with 5-fold cross-validation on the 22.7K records. The trained model runs behind a Streamlit dashboard, and a Mistral-7B step translates feature contributions into natural-language explanations for each prediction.",
      results:
        "The final model reaches an R² of 0.90 across 5-fold cross-validation on the 22.7K-record dataset. The Streamlit interface makes the tool usable by HR teams, with every prediction accompanied by an explanation of which factors drive the risk.",
    },
  },
  {
    slug: "scrnaseq-covid",
    title: "Single-cell RNA-seq Analysis",
    year: 2025,
    role: "Researcher",
    stack: ["Python", "Scanpy", "scVI", "Scikit-learn", "UMAP"],
    metrics: [
      { label: "Cells", value: "98,979" },
      { label: "Genes", value: "20,631" },
      { label: "Test set", value: "8,912" },
    ],
    summary:
      "An end-to-end scVI analysis of the GSE171524 COVID-19 cohort — 98,979 cells across 20,631 genes — with severity classification validated on a held-out test set of 8,912 cells.",
    featured: false,
    order: 4,
    sections: {
      summary:
        "An end-to-end single-cell RNA-seq analysis of the GSE171524 COVID-19 cohort, spanning 98,979 cells across 20,631 genes. The pipeline uses scVI to learn a batch-corrected latent representation and a scikit-learn classifier to separate disease severity states. The held-out test set comprises 8,912 cells.",
      challenge:
        "Single-cell data at this scale is noisy and high-dimensional, and samples come from multiple batches whose technical effects swamp biological signal. Reproducible preprocessing across 98,979 cells and 20,631 genes also demands careful normalization and memory discipline.",
      architecture:
        "Scanpy handles quality control, filtering, and normalization across the 98,979 cells and 20,631 genes. scVI learns a variational latent space that removes batch effects, and UMAP projects that space for visualization. A scikit-learn classifier is trained on the latent embeddings and evaluated on a held-out test set of 8,912 cells.",
      results:
        "The held-out test set of 8,912 cells confirms the classifier generalizes beyond the cells it was trained on, and the scVI latent space separates severity states that are not visible in raw expression space. The pipeline is fully reproducible from the GSE171524 cohort through a single script.",
    },
  },
  {
    slug: "fine-grained-sentiment",
    title: "Fine-Grained Sentiment Analysis",
    year: 2024,
    role: "Researcher",
    stack: ["Python", "PyTorch", "BERT"],
    metrics: [
      { label: "Accuracy", value: "53%" },
      { label: "Gap to SOTA", value: "5%" },
    ],
    summary:
      "A fine-tuned BERT model for five-class sentiment classification on SST-5, reaching 53% accuracy — only 5% behind the state of the art.",
    featured: false,
    order: 5,
    sections: {
      summary:
        "A fine-grained sentiment classifier that assigns reviews to one of five sentiment classes on the SST-5 dataset, using a fine-tuned BERT model implemented in PyTorch. The system reaches 53% accuracy, within 5% of the current state of the art. The project is an exercise in making a strong pretrained baseline behave on a genuinely hard five-way task.",
      challenge:
        "SST-5 is one of the harder sentiment benchmarks: five ordered classes mean the difference between \"slightly negative\" and \"neutral\" is often a matter of nuance, and models frequently collapse into predicting the middle classes. Fine-tuning is slow and memory-hungry, and a careless learning-rate schedule destroys the pretrained representations.",
      architecture:
        "A pretrained BERT encoder is fine-tuned with a classification head in PyTorch, with tokenization handled by the model's own tokenizer. The training loop uses a warmup-then-decay learning-rate schedule, gradient clipping, and early stopping on the validation split. Evaluation reports accuracy so the five classes are weighted equally.",
      results:
        "The final model reaches 53% accuracy on SST-5 — only 5% behind the state of the art — with the remaining error concentrated in the adjacent-class confusions the dataset is designed to expose. The training pipeline is deterministic and reproducible from the raw dataset.",
    },
  },
];

export const experience = [
  {
    title: "Teaching Assistant & Head TA",
    org: "Department of Computer Science, Shahid Beheshti University",
    period: "2023 – 2026",
    points: [
      "Led and taught across 27 credit hours of undergraduate CS courses.",
      "Coordinated lab sessions, grading, and office hours; mentored junior TAs.",
    ],
  },
  {
    title: "Supervisor & Teacher",
    org: "Salam High School",
    period: "2023 – 2026",
    points: [
      "Taught programming and data science courses; supervised student projects.",
    ],
  },
  {
    title: "Head of Scientific Committee",
    org: "Department of Computer Science, Shahid Beheshti University",
    period: "—",
    points: [
      "Organized scientific events, workshops, and guest talks for the CS department.",
    ],
  },
  {
    title: "Scientific Reviewer",
    org: "Shahid Beheshti University CS Journal",
    period: "—",
    points: [
      "Peer-reviewed submissions on machine learning in mental health and suicide risk detection.",
    ],
  },
];

export const education = {
  degree: "B.Sc. in Computer Science",
  school: "Shahid Beheshti University",
  period: "Sep 2022 – Jun 2026",
  gpa: "18.85/20",
};

export const certificates = [
  {
    title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    issuer: "DeepLearning.AI",
    date: "Aug 2024",
  },
  {
    title: "Deep Learning",
    issuer: "Neuromatch Academy",
    date: "Jul 2024",
  },
  {
    title: "AI Agents and Automation",
    issuer: "Udemy",
    date: "Oct 2025",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  body: string;
}

export const contactChannels = [
  {
    label: "GitHub",
    href: "https://github.com/Farid-Karimi",
    note: "code & projects",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/farid-kmi",
    note: "professional profile",
  },
  {
    label: "Email",
    href: "mailto:fkarimi8320@gmail.com",
    note: "fkarimi8320@gmail.com",
  },
  {
    label: "Unsplash",
    href: "https://unsplash.com/@farid_karimi",
    note: "landscape & travel photography",
  },
];