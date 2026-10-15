import { BrowserRouter } from "react-router-dom";
import { ActivityProvider } from "./context/ActivityContext";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProgessProvider } from "./context/ProjectProgessContext";
import TaskContext from "./context/TaskContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ActivityProvider>
            <TaskContext>
              <ProjectProgessProvider>
                <AppRoutes />
              </ProjectProgessProvider>
            </TaskContext>
          </ActivityProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
