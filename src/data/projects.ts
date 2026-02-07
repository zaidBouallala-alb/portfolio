export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    githubUrl: string;
    liveUrl?: string; // Optional
    image: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "OFPPT Learning Resources Platform",
        description: "A React-based educational platform inspired by OFPPT course systems to organize and share learning materials for students.",
        tech: ["React", "JavaScript", "CSS", "Vite"],
        githubUrl: "https://github.com/zaidBouallala-alb/reactApp",
        liveUrl: undefined,
        image: "https://placehold.co/800x450/1e293b/cbd5e1?text=OFPPT+Platform",
        featured: true,
    },
    {
        id: 2,
        title: "Weather Forecast App",
        description: "A responsive weather application that fetches real-time weather data from an external API and displays forecasts.",
        tech: ["React", "JavaScript", "Weather API", "CSS"],
        githubUrl: "https://github.com/zaidBouallala-alb/weather-app",
        liveUrl: undefined,
        image: "https://placehold.co/800x450/1e293b/cbd5e1?text=Weather+App",
    },
    {
        id: 3,
        title: "School Management System",
        description: "A full-stack school management application for managing students, classes, schedules, and academic resources.",
        tech: ["React", "Laravel", "MySQL", "Tailwind CSS"],
        githubUrl: "https://github.com/zaidBouallala-alb/school-management-system",
        liveUrl: undefined,
        image: "https://placehold.co/800x450/1e293b/cbd5e1?text=School+Management",
    }
];
