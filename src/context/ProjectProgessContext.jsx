import { createContext, useContext, useEffect, useState } from "react";
import { createProject, subscribetoProject } from "../services/projectService";
import { useAuth } from "./AuthContext";

const ProjectProgessContext = createContext();

export const ProjectProgessProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const addProject = (projectData) => {
    createProject(user.uid, projectData);
  };

  useEffect(() => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }
    const unsubscribe = subscribetoProject(
      user.uid,
      (project) => {
        setProjects(project);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  return (
    <ProjectProgessContext.Provider value={{ projects, loading, addProject }}>
      {children}
    </ProjectProgessContext.Provider>
  );
};

export function useProjectProgress() {
  return useContext(ProjectProgessContext);
}

export default ProjectProgessContext;
