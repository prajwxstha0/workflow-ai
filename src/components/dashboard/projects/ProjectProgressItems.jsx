import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProjectProgress } from "../../../context/ProjectProgessContext";
import ProjectProgress from "./ProjectProgress";

const ProjectProgressItems = () => {
  const { projects } = useProjectProgress();

  return (
    <div className="h-100 bg-white rounded-2xl">
      <div className="flex px-4 py-6">
        <h1>Project Progress</h1>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>

      <div>
        {projects.length === 0 && (
          <span className="text-red-400">No project yet</span>
        )}
        {projects.map((item) => (
          <ProjectProgress key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectProgressItems;
