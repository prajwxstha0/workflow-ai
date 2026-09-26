import { createContext, useContext } from "react";

const ProjectProgessContext = createContext();

export const ProjectProgessProvider = ({ children }) => {
  const projects = [
    { name: "Mobile App v3", status: "on-track", percent: 68 },
    { name: "API Gateway", status: "at-risk", percent: 45 },
    { name: "Design System", status: "on-track", percent: 90 },
    { name: "Analytics Dashboard", status: "delayed", percent: 23 },
  ];
  return (
    <div>
      <ProjectProgessContext.Provider value={{ projects }}>
        {children}
      </ProjectProgessContext.Provider>
    </div>
  );
};

export function useProjectProgress() {
  return useContext(ProjectProgessContext);
}

export default ProjectProgessContext;
