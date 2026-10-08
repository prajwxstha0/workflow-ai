import { createContext, useContext, useState } from "react";

const ProjectProgessContext = createContext();

export const ProjectProgessProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      name: "Mobile App v3",
      status: "on-track",
      percent: 0,
      bgColor: "bg-green-100",
    },
    {
      name: "API Gateway",
      status: "at-risk",
      percent: 0,
      bgColor: "bg-orange-100",
    },
    {
      name: "Design System",
      status: "on-track",
      percent: 0,
      bgColor: "bg-green-100",
    },
    {
      name: "Analytics Dashboard",
      status: "delayed",
      percent: 0,
      bgColor: "bg-red-100",
    },
  ]);

  return (
    <ProjectProgessContext.Provider value={{ projects }}>
      {children}
    </ProjectProgessContext.Provider>
  );
};

export function useProjectProgress() {
  return useContext(ProjectProgessContext);
}

export default ProjectProgessContext;
