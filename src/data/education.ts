export interface EducationItem {
    id: number;
    year: string;
    title: string;
    institution: string;
    description: string;
}

export const education: EducationItem[] = [
    {
        id: 1,
        year: "2025 – 2026",
        title: "Diploma in Full Stack Web Development",
        institution: "ISTA",
        description: "Emphasize React.js for frontend, Laravel and Express.js for backend, RESTful API development, and full-stack application architecture."
    },
    {
        id: 2,
        year: "2024 – 2025",
        title: "Diploma in Digital Development",
        institution: "ISTA",
        description: "Focus on JavaScript and PHP, web fundamentals (HTML, CSS), and building dynamic web applications."
    },
    {
        id: 3,
        year: "2022 – 2024",
        title: "University Studies in Economics & Management",
        institution: "Faculty of Economics",
        description: "Focused on economics, management fundamentals, analytical thinking, and organizational skills."
    },
    {
        id: 4,
        year: "2022",
        title: "Baccalaureate in Mathematical Sciences",
        institution: "High School",
        description: "Emphasize strong foundations in mathematics, logic, and problem-solving."
    }
];

