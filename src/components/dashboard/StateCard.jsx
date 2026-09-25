const StateCard = ({ icon, iconBg, label, value, sublabel }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5  flex items-start justify-center gap-4  hover:shadow-lg hover:transition-shadow duration-200">
      <div
        className="w-10 h-10 rounded-md  flex items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>

      <div className="">
        <h2 className="text-[14px] text-gray-500">{label}</h2>
        <h2 className="text-2xl font-bold">{value}</h2>
        <h2 className="text-[14px] text-gray-500">{sublabel}</h2>
      </div>
    </div>
  );
};

export default StateCard;
