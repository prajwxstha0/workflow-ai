import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProgessProvider } from "./context/ProjectProgessContext";
import TaskContext from "./context/TaskContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ProjectProgessProvider>
            <TaskContext>
              <AppRoutes />
            </TaskContext>
          </ProjectProgessProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
