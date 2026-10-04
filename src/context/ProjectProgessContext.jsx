import { createContext, useContext, useState } from "react";

const ProjectProgessContext = createContext();

export const ProjectProgessProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      name: "Mobile App v3",
      status: "on-track",
      percent: 68,
      bgColor: "bg-green-100",
    },
    {
      name: "API Gateway",
      status: "at-risk",
      percent: 50,
      bgColor: "bg-orange-100",
    },
    {
      name: "Design System",
      status: "on-track",
      percent: 90,
      bgColor: "bg-green-100",
    },
    {
      name: "Analytics Dashboard",
      status: "delayed",
      percent: 23,
      bgColor: "bg-red-100",
    },
  ]);

  const updateProjectProgress = (newPercent, comProject) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        return project.name === comProject
          ? { ...project, percent: project.percent + newPercent }
          : project;
      });
    });
  };

  return (
    <ProjectProgessContext.Provider value={{ projects, updateProjectProgress }}>
      {children}
    </ProjectProgessContext.Provider>
  );
};

export function useProjectProgress() {
  return useContext(ProjectProgessContext);
}

export default ProjectProgessContext;
