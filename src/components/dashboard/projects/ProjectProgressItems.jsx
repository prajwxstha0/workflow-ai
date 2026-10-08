import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useProjectProgress } from "../../../context/ProjectProgessContext";
import { useTask } from "../../../context/TaskContext";
import ProjectProgress from "./ProjectProgress";

const ProjectProgressItems = () => {
  const { projects } = useProjectProgress();
  const { getProjectTaskCount } = useTask();
  const navigate = useNavigate();

  return (
    <div className="h-100 bg-white rounded-2xl px-4 py-6 ">
      <div className="flex justify-between items-center pb-2">
        <h1 className="font-bold">Project Progress</h1>
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => navigate("/project")}
        />
      </div>

      <div className=" flex flex-col  text-start overflow-y-auto w-full">
        {projects.length === 0 && (
          <span className="text-red-400">No project yet</span>
        )}
        {projects.map((item) => {
          const { totalTasks, completeTasks } = getProjectTaskCount(item.name);
          const percent = totalTasks
            ? Math.round((completeTasks / totalTasks) * 100)
            : 0;
          return <ProjectProgress key={item.id} item={{ ...item, percent }} />;
        })}
      </div>
    </div>
  );
};

export default ProjectProgressItems;
