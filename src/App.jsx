import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import TaskContext from "./context/TaskContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <TaskContext>
              <AppRoutes />
            </TaskContext>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </>
  );
};

export default App;
