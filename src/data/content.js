export const personalInfo = {
  name: "Jason Kyauk",
  tagline: "CS Student | AI/ML @ Stanford ",
  email: "jkyauk@stanford.edu",
  github: "https://github.com/kyauk",
  linkedin: "https://linkedin.com/in/jkyauk",
  headshot: "/headshot.jpg", // Add your headshot to public folder
};

export const projects = [
  {
    title: "Surgical Phase Detection",
    description: "Surgical phase detector that takes in a video and can infer what phase of surgery a frame is in with 87% overall accuracy. Project built towards preprocessing real-world messy data, and learning sequential networks.",
    tech: ["Pytorch", "OpenCV", "ResNet", "LSTM & GRU", "AWS"],
    github: "https://github.com/kyauk/surgical-phase-recognition",
    demo: "",
  },
  {
    title: "Probabilistic Adaptive-Computation Neural Networks",
    description: "CS229 Final Project, aimed towards taking a probabilistic approach to adaptive neural networks, rather than traditional heuristic-based methods. Achieved competitive accuracy-compute tradeoff compared to SOTA heuristic models",
    tech: ["Pytorch", "Expectation-Maximization", "CNNs", "Mixture-of-Experts"],
    github: "https://github.com/kyauk/em_adaptive",
    demo: "/cs229-final.pdf",
    image: "/cs229-poster.pdf", // Add your poster to public folder
  },
  {
    title: "FoGStop",
    description: "Very first ML Project, aimed at detecting Freezing of Gait from treadmill data, a symptom of Parkinson's using Random Forest & Decision Trees",
    tech: ["Python", "Scikit-learn", "Signal Processing", "Feature Engineering", "Random Forest + Decision Trees"],
    github: "https://github.com/kyauk/fog",
    demo: null,
  },
  {
    title: "Salesforce Tower Blender",
    description: "Fun Blender project, I recreated Salesforce Tower from Scratch!",
    tech: ["Blender", "Ray-Tracing", "Texture Mapping", "Volumetric Modeling"],
    github:"",
    demo: null,
    images: ["/jkyauk_varA.png", "/jkyauk.png", "/jkyauk_varB.png" ], // Add your render to public folder
  },
  
];

export const experiences = [
  {
    role: "Student Research Intern - Machine Learning",
    company: "Stanford University School of Medicine",
    dates: "Jun 2025 - Present",
    description: "Not currently active right now. Working on researching how to make more uncertainty-aware agents in pathology.",
  },
  {
    role: "Student Research Assistant",
    company: "Wu Tsai Human Performance Alliance",
    dates: "Jun 2024 - Sep 2024",
    description: "Built data analytics pipeline to measure correlation between various metrics like skeletal alignment and load in order to help learn about ways to reduce heel-striking running injuries",
  },
];

export const skills = {
  languages: ["Python", , "C/C++", "MATLAB", "SQL"],
  frameworks: ["PyTorch", "TensorFlow", "LangGraph", "Scikit-learn", "NumPy", "Pandas"],
  tools: ["Git", "Google Cloud", "AWS", "PostgreSQL", "Isaac Sim", "Blender", "Figma"],
};

export const aboutMe = {
  location: "Daly City, CA",
  education: "B.S. Computer Science (AI Track) @ Stanford University",
  shortBio: "Passionate about advancing physical and embodied intelligence in pursuit of accelerating our understanding of the world + improve human health and safety globally.",
  currently: [
    "Learning and building with agents, world models, and VLAs",
    "Building an agentic data refinery for Physical AI"
  ],
  interests: [
    "Robotics",
    "World Models",
    "Drug Discovery",
    "Embodied Intelligence",
    "Generative Models",
    "Advancing Reasoning Models",
  ],
  learning: [
    "VLAs",
    "World Models",
    "Building industrial grade platforms",
    "Computer Vision Methods"
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
