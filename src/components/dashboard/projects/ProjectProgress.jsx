const ProjectProgress = ({ item }) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-6 w-full">
      {item.name}
      <div className="bg-amber-50 border rounded-2xl border-2 w-[30%]"></div>
    </div>
  );
};

export default ProjectProgress;
