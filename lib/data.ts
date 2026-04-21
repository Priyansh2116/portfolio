export const DATA = {
  name: 'Priyansh Sonthalia',
  role: 'Full-Stack Engineer',
  location: 'Chennai, IN',
  tagline: 'I build full-stack AI systems, network tools, and things that blur the line between the two.',
  status: "Open to Summer '26 internships",
  email: 'priyanshsonthalia23@gmail.com',
  github: 'github.com/Priyansh2116',
  githubUrl: 'https://github.com/Priyansh2116',
  linkedin: 'linkedin.com/in/priyansh-sonthalia',
  linkedinUrl: 'https://www.linkedin.com/in/priyansh-sonthalia-380817265/',
  resumeUrl: '/resume.pdf',

  stats: [
    { label: 'CGPA', value: '9.42' },
    { label: 'Projects shipped', value: '12+' },
    { label: 'Years building', value: '3' },
  ],

  about: [
    "CS undergrad at SRM (batch of '27) building full-stack systems across AI, network security, and cloud.",
    'Currently interning at Smoad Networks on a real-time network monitoring system. Previously at Samsung R&D, where I built an AI pricing platform with self-hosted LLMs.',
    'I like problems where the backend, the model, and the UI all have to agree.',
  ],

  skills: {
    'Full-Stack': ['React', 'Next.js', 'Node.js', 'FastAPI', 'REST APIs'],
    'AI & ML': ['Machine Learning', 'Agentic AI', 'nnU-Net', 'LLMs', 'Browser-Use'],
    Languages: ['Python', 'TypeScript', 'C', 'C++', 'Java', 'SQL'],
    Databases: ['PostgreSQL', 'MongoDB', 'Redis'],
    Systems: ['Network Security', 'ZeroMQ', 'Zephyr OS', 'RIPE Atlas', 'Docker'],
    Explore: ['Quantum Computation'],
  } as Record<string, string[]>,

  projects: [
    {
      id: 'aiimaging',
      title: 'AIIMAGING',
      kicker: 'Implant identifier',
      desc: 'Full-stack web system: FastAPI inference server + React frontend that identifies medical implants from X-rays using a 3D nnU-Net. Preprocessing, inference, and result viz in one flow.',
      tech: ['nnU-Net', 'FastAPI', 'React', 'Python'],
      year: '2025',
      status: 'Live',
      link: 'https://www.implantdetect.com',
    },
    {
      id: 'pricing',
      title: 'Samsung Pricing',
      kicker: 'LLM-powered e-commerce scanner',
      desc: 'FastAPI backend + React search frontend that pulls live prices from major e-commerce sites via Browser-Use + self-hosted LLMs. Automated browser workflows normalize offers.',
      tech: ['FastAPI', 'React', 'Browser-Use', 'LLMs'],
      year: '2025',
      status: 'Internal',
      link: null,
    },
    {
      id: 'rudra',
      title: 'RUDRA',
      kicker: 'Mars rover team site',
      desc: 'Full-stack Next.js site for my college\'s Mars rover team. REST APIs, signups, registrations, and content all backed by MongoDB.',
      tech: ['Next.js', 'MongoDB', 'TypeScript', 'Node.js'],
      year: '2024',
      status: 'Shipped',
      link: 'https://www.srmrudra.com',
    },
    {
      id: 'starship',
      title: 'STARSHIP',
      kicker: 'Rover base station',
      desc: 'Full-stack base station: React dashboard consuming a Python/FastAPI backend with ZeroMQ for real-time GPS + acceleration telemetry. LattePanda + Zephyr OS onboard.',
      tech: ['React', 'FastAPI', 'ZeroMQ', 'Zephyr OS'],
      year: '2025',
      status: 'Deployed',
      link: 'https://github.com/Priyansh2116/starship',
    },
    {
      id: 'netmon',
      title: 'Smoad NetMon',
      kicker: 'Real-time network monitor',
      desc: 'Full-stack monitoring dashboard: Node.js/FastAPI backend aggregates latency, jitter, and packet loss from RIPE Atlas hosts — visualized live on a React frontend.',
      tech: ['FastAPI', 'React', 'RIPE Atlas', 'Node.js'],
      year: '2025',
      status: 'In progress',
      link: null,
    },
    {
      id: 'glenoid',
      title: 'Glenoid Bone Loss',
      kicker: 'Medical 3D segmentation',
      desc: 'Trained a 3D nnU-Net on 52 CT scans to measure glenoid bone loss. Full pipeline: curation, annotation, training, eval.',
      tech: ['nnU-Net', 'PyTorch', 'Python'],
      year: '2024',
      status: 'Research',
      link: null,
    },
  ],

  experience: [
    {
      role: 'Project Intern',
      company: 'Smoad Networks',
      when: 'Sep 2025 — Present',
      bullets: [
        'Building a full-stack real-time network monitoring system (latency, jitter, packet loss).',
        'React dashboard + FastAPI backend for router performance and health metrics.',
        'Configured RIPE Atlas hosts with secure tunneled private-IP pinging.',
      ],
    },
    {
      role: 'Prism Project Intern',
      company: 'Samsung R&D Institute India — Bangalore',
      when: 'Jul 2025 — Dec 2025',
      bullets: [
        'Built an AI pricing platform using Browser-Use + self-hosted LLMs.',
        'FastAPI backend + automated browser workflows that normalize offers across retailers.',
        'Shipped a full-stack search-based frontend for cross-retailer price comparison.',
      ],
    },
    {
      role: 'B.Tech, Computer Science',
      company: 'SRM Institute of Science and Technology',
      when: 'Jun 2023 — May 2027',
      bullets: ['CGPA 9.42 / 10.00.', 'Focus: AI, network security, full-stack systems.'],
    },
  ],

  awards: [
    { t: '5th — Intl. Rover Challenge 2025', s: 'with team RUDRA' },
    { t: "SIH Top 50 — '24 & '25", s: 'Smart India Hackathon qualifiers' },
    { t: 'Microsoft GitHub Copilot Cert.', s: '' },
    { t: 'LCM Distinction', s: 'Public Communication' },
  ],
}

export type Project = (typeof DATA.projects)[0]
export type ExperienceEntry = (typeof DATA.experience)[0]
export type Award = (typeof DATA.awards)[0]
