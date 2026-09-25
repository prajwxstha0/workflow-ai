import { useAuth } from "../../context/AuthContext";
import GreatingHeader from "./GreatingHeader";

const GreatingHeaderGird = ({ onCreateTask }) => {
  const { user } = useAuth();
  const userName = user.displayName;

  return (
    <div>
      <GreatingHeader userName={userName} onCreateTask={onCreateTask} />
    </div>
  );
};

export default GreatingHeaderGird;
