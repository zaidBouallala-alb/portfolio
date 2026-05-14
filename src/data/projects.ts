export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    githubUrl?: string; // Optional
    liveUrl?: string; // Optional
    image: string;
    demo?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "OFPPT Learning Resources Platform",
        description: "A React-based educational platform inspired by OFPPT course systems to organize and share learning materials for students.",
        tech: ["React", "JavaScript", "CSS", "Vite"],
        liveUrl: "https://ofppt-cours.vercel.app/",
        image: "https://placehold.co/800x450/1e293b/cbd5e1?text=OFPPT+Platform",
        demo: "/ofppt-demo.png",
        featured: true,
    },
    {
        id: 2,
        title: "Weather Forecast App",
        description: "A responsive weather application that fetches real-time weather data from an external API and displays forecasts.",
        tech: ["React", "JavaScript", "Weather API", "CSS"],
        liveUrl: "https://weather-app-nu-gold-51.vercel.app/",
        image: "https://placehold.co/800x450/1e293b/cbd5e1?text=Weather+App",
        demo: "/weather-demo.png",
    },
    {
        id: 3,
        title: "School Management System",
        description: "A full-stack school management application for managing students, classes, schedules, and academic resources.",
        tech: ["Full Stack", "React", "Laravel", "MySQL", "Tailwind CSS"],
        githubUrl: "https://github.com/zaidBouallala/school-management-system",
        liveUrl: undefined,
        image: "https://placehold.co/800x450/1e293b/cbd5e1?text=School+Management",
        demo: "/school-demo.png",
    },
    {
        id: 4,
        title: "Job Application Tracker",
        description: "A full-stack MERN application to track and manage job applications. Features user authentication, job CRUD, status tracking, dashboard, and search.",
        tech: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
        githubUrl: "https://github.com/zaidBouallala/Job-Application-Tracker",
        liveUrl: undefined,
        image: "https://placehold.co/800x450/1e293b/cbd5e1?text=Job+Tracker",
        demo: "/job-tracker-demo.png",
    }
];
