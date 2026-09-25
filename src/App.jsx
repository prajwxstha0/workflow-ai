import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TaskContext from "./context/TaskContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <TaskContext>
            <AppRoutes />
          </TaskContext>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
