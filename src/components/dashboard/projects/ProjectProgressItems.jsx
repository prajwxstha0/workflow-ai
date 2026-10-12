import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useProjectProgress } from "../../../context/ProjectProgessContext";
import { useTask } from "../../../context/TaskContext";
import NewProjectForm from "./NewProjectForm";
import ProjectProgress from "./ProjectProgress";

const ProjectProgressItems = () => {
  const { projects } = useProjectProgress();
  const { getProjectTaskCount } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [projectType, setProjectType] = useState("");

  console.log(projects);

  return (
    <div className="relative h-100 bg-white rounded-2xl px-4 py-6">
      <div className="flex justify-between items-center pb-2">
        <h1 className="font-bold">Project Progress</h1>

        <FontAwesomeIcon
          icon={faAdd}
          onClick={() => setShowForm(true)}
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col text-start overflow-y-auto w-full">
        {projects.length === 0 && (
          <span className="text-red-400">No project yet</span>
        )}

        {projects.map((item) => {
          const { totalTasks, completeTasks } = getProjectTaskCount(item.id);

          const percent = totalTasks
            ? Math.round((completeTasks / totalTasks) * 100)
            : 0;

          const progressStatus =
            percent < 30
              ? { type: "delayed", color: "bg-red-200 text-red-600" }
              : percent < 60
                ? { type: "at-risk", color: "bg-yellow-200 text-yellow-700" }
                : { type: "on-track", color: "bg-green-200 text-green-700" };

          return (
            <ProjectProgress
              key={item.id}
              item={{
                ...item,
                percent,
                progressType: progressStatus.type,
                progressColor: progressStatus.color,
              }}
            />
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50  flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowForm(true)}
          />

          {/* Form container */}
          <div className="relative z-10">
            <NewProjectForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectProgressItems;
