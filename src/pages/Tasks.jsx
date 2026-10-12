import { useTask } from "../context/TaskContext";

const Tasks = () => {
  const { task } = useTask();
  console.log(task);

  return <div>Tasks</div>;
};

export default Tasks;
