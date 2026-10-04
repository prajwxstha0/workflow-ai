import { useProjectProgress } from "../../../context/ProjectProgessContext";

const ProjectProgress = ({ item }) => {
  const { updateProjectProgress } = useProjectProgress();
  return (
    <div className="flex flex-col gap-2 py-2 w-full">
      <div className="grid grid-cols-3 gap-2 w-full text-start items-center">
        <span className="text-[12px] font-medium">{item.name}</span>
        <span
          className={`${item.bgColor} text-[10px] rounded-2xl text-center justify-center w-fit h-fit px-2 py-1 font-medium`}
        >
          {item.status}
        </span>
        <span className="text-[14px] font-medium">
          {item.percent < 100 ? item.percent : 100}%
        </span>
      </div>
      <div
        className={`bg-amber-50 rounded-2xl border-2 text-red`}
        style={{ width: `${item.percent < 100 ? item.percent : 100}%` }}
      ></div>
    </div>
  );
};

export default ProjectProgress;
