export interface SkillCategory {
    title: string;
    skills: string[];
}

export const skillsData: SkillCategory[] = [
    {
        title: "Frontend",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Redux"
        ],
    },
    {
        title: "Backend",
        skills: [
            "Laravel",
            "PHP",
            "Python"
        ],
    },
    {
        title: "Databases",
        skills: [
            "MySQL",
            "MongoDB"
        ],
    },
    {
        title: "Tools & Principles",
        skills: [
            "Git",
            "GitHub",
            "GitLab",
            "Clean Code",
            "REST APIs",
            "Scalable Architecture"
        ],
    },
];
