
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
        description: "Built full-stack web applications with React.js, Laravel, Express.js, and RESTful APIs."
    },
    {
        id: 2,
        year: "2024 – 2025",
        title: "Diploma in Digital Development",
        institution: "ISTA",
        description: "Developed dynamic web applications using JavaScript, PHP, HTML, and CSS."
    },
    {
        id: 3,
        year: "2022 – 2024",
        title: "University Studies in Economics & Management",
        institution: "Faculty of Economics",
        description: "Strengthened analytical thinking and business fundamentals."
    },
    {
        id: 4,
        year: "2022",
        title: "Baccalaureate in Mathematical Sciences",
        institution: "High School",
        description: "Built a strong foundation in mathematics and problem-solving."
    }
];
