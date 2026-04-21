// Shared data extracted from resume
const DATA = {
  name: 'Priyansh Sonthalia',
  role: 'AI Engineer & Builder',
  location: 'Chennai, IN',
  tagline: 'I build AI systems, network tools, and things that blur the line between the two.',
  status: 'Open to summer \'26 internships',
  email: 'priyansh@example.com',
  github: 'github.com/priyansh',
  linkedin: 'linkedin.com/in/priyansh',

  stats: [
    { label: 'CGPA', value: '9.42' },
    { label: 'Projects shipped', value: '12+' },
    { label: 'Rover challenge', value: '5th intl.' },
    { label: 'Years building', value: '3' },
  ],

  about: [
    "CS undergrad at SRM (batch of \u201927) working across AI, network security, and systems.",
    "Currently interning at Smoad Networks on a real-time network monitoring system. Previously at Samsung R&D, where I built an AI pricing platform with self-hosted LLMs.",
    "I like problems where the hardware, the model, and the UI all have to agree."
  ],

  skills: {
    'AI & ML': ['Machine Learning', 'Agentic AI', 'nnU-Net', 'LLMs', 'Browser-Use'],
    'Languages': ['Python', 'TypeScript', 'C', 'C++', 'Java', 'SQL'],
    'Systems': ['Network Security', 'FastAPI', 'ZeroMQ', 'Zephyr OS', 'RIPE Atlas'],
    'Frontend': ['React', 'Next.js', 'MongoDB'],
    'Explore': ['Quantum Computation'],
  },

  projects: [
    {
      id: 'starship',
      title: 'STARSHIP',
      kicker: 'Rover base station',
      desc: 'React base station for real-time GPS + acceleration telemetry from a rover. ZeroMQ for fast comms, LattePanda + Zephyr OS onboard.',
      tech: ['React', 'ZeroMQ', 'Python', 'Zephyr OS'],
      year: '2025',
      status: 'Deployed',
    },
    {
      id: 'aiimaging',
      title: 'AIIMAGING',
      kicker: 'Implant identifier',
      desc: 'Web system that identifies medical implants from X-rays using a 3D nnU-Net. Preprocessing, inference, and result viz in one flow.',
      tech: ['nnU-Net', 'Python', 'FastAPI', 'React'],
      year: '2025',
      status: 'Live',
    },
    {
      id: 'glenoid',
      title: 'Glenoid Bone Loss',
      kicker: 'Medical 3D segmentation',
      desc: 'Trained a 3D nnU-Net on 52 CT scans to measure glenoid bone loss. Full pipeline: curation, annotation, training, eval.',
      tech: ['nnU-Net', 'PyTorch', 'Python'],
      year: '2024',
      status: 'Research',
    },
    {
      id: 'rudra',
      title: 'RUDRA',
      kicker: "Mars rover team site",
      desc: 'Full-stack Next.js site for my college\u2019s Mars rover team. Signups, registrations, content, all on MongoDB.',
      tech: ['Next.js', 'MongoDB', 'TypeScript'],
      year: '2024',
      status: 'Shipped',
    },
    {
      id: 'pricing',
      title: 'Samsung Pricing',
      kicker: 'LLM-powered e-commerce scanner',
      desc: 'AI pricing platform that pulls live prices from major e-commerce sites via Browser-Use + self-hosted LLMs. FastAPI backend, search UI.',
      tech: ['Browser-Use', 'FastAPI', 'LLMs', 'Python'],
      year: '2025',
      status: 'Internal',
    },
    {
      id: 'netmon',
      title: 'Smoad NetMon',
      kicker: 'Real-time network monitor',
      desc: 'Latency, jitter, packet loss \u2014 visualized live. Routers set up as RIPE Atlas hosts with secure tunneled private-IP pings.',
      tech: ['RIPE Atlas', 'Networking', 'Dashboards'],
      year: '2025',
      status: 'In progress',
    },
  ],

  experience: [
    {
      role: 'Project Intern',
      company: 'Smoad Networks',
      when: 'Sep 2025 \u2014 Present',
      bullets: [
        'Real-time network monitoring (latency, jitter, packet loss).',
        'Router dashboard for performance + health metrics.',
        'Configured RIPE Atlas hosts with secure tunneled private-IP pinging.',
      ],
    },
    {
      role: 'Prism Project Intern',
      company: 'Samsung R&D Institute India \u2014 Bangalore',
      when: 'Jul 2025 \u2014 Dec 2025',
      bullets: [
        'AI pricing platform using Browser-Use + self-hosted LLMs.',
        'FastAPI backend + automated browser workflows that normalize offers.',
        'Shipped a search-based frontend for cross-retailer price compare.',
      ],
    },
    {
      role: 'B.Tech, Computer Science',
      company: 'SRM Institute of Science and Technology',
      when: 'Jun 2023 \u2014 May 2027',
      bullets: [
        'CGPA 9.42 / 10.00.',
        'Focus: AI, network security, systems.',
      ],
    },
  ],

  awards: [
    { t: '5th \u2014 Intl. Rover Challenge 2025', s: 'with team RUDRA' },
    { t: 'SIH Top 50 \u2014 \u201924 & \u201925', s: 'Smart India Hackathon qualifiers' },
    { t: 'Microsoft GitHub Copilot Cert.', s: '' },
    { t: 'LCM Distinction', s: 'Public Communication' },
  ],
};

window.DATA = DATA;
