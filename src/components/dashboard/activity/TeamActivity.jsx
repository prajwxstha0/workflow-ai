import Img from "../../../assets/hero.png";
const TeamActivity = ({ ownername, time, action }) => {
  return (
    <div className="flex">
      <div className="px-4 ">
        <img
          src={Img}
          alt="no img"
          className="border-none rounded-full w-6 h-6"
        />
      </div>
      <div className="flex flex-col text-start">
        <p>
          <span className="font-bold">{ownername}</span> {action}
        </p>
        <span className="text-[10px]">New</span>
      </div>
    </div>
  );
};

export default TeamActivity;
