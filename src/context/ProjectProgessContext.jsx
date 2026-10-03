import { createContext, useContext, useState } from "react";

const ProjectProgessContext = createContext();

export const ProjectProgessProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    { name: "Mobile App v3", status: "on-track", percent: 68 },
    { name: "API Gateway", status: "at-risk", percent: 50 },
    { name: "Design System", status: "on-track", percent: 90 },
    { name: "Analytics Dashboard", status: "delayed", percent: 23 },
  ]);

  const updateProjectProgress = (newPercent) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        return project.name === "Mobile App v3"
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
