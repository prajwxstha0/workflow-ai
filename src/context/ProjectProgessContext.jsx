import { createContext, useContext, useEffect, useState } from "react";
import { createProject, subscribetoProject } from "../services/projectService";
import { useActivity } from "./ActivityContext";
import { useAuth } from "./AuthContext";

const ProjectProgessContext = createContext();

export const ProjectProgessProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const { addActivity } = useActivity();

  const addProject = async (projectData) => {
    try {
      await createProject(user.uid, projectData);
      addActivity("created a new Project");
    } catch (error) {
      console.error("project is not created");
    } finally {
      setLoading(false);
    }
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
