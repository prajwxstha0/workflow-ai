import { useState } from "react";
import { useTask } from "../../context/TaskContext";

const TestNewTask = ({ onSaveTask }) => {
  const [tasktitle, settasktitle] = useState("");
  const [taskdesc, settaskdesc] = useState("");
  const [taskproject, settaskproject] = useState("");
  const [taskpriority, settaskpriority] = useState("");
  const [prioritylevel, setprioritylevel] = useState("low");
  const [taskassignee, settaskassignee] = useState("");
  const [taskduedate, settaskduedate] = useState("");
  const [tasktag, settasktag] = useState("");

  const { addTask } = useTask();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title: tasktitle,
      project: taskproject,
      priority: prioritylevel,
      assignee: taskassignee,
      duedate: taskduedate,
      tag: tasktag,
      description: taskdesc,
    };

    addTask(newTask);

    onSaveTask();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-3 w-100 rounded-2xl flex flex-col justify-center text-center py-5"
      style={{
        background:
          "linear-gradient(151deg, #888ecd 0%, #6aa3dc 50%, #20686f 100%)",
      }}
    >
      <div className="text-start flex justify-between px-15">
        <label>Task title</label>
        <input
          required
          type="text"
          className="border rounded-md px-3 py-1 focus:outline-none"
          value={tasktitle}
          onChange={(e) => {
            settasktitle(e.target.value);
          }}
        />
      </div>

      <div className="text-start flex justify-between px-15">
        <label>Project</label>
        <input
          required
          type="text"
          className="border rounded-md px-3 py-1 focus:outline-none"
          value={taskproject}
          onChange={(e) => {
            settaskproject(e.target.value);
          }}
        />
      </div>

      <div className="text-start flex justify-between px-15">
        <label className="">Priority</label>
        <input
          required
          type="range"
          className="border rounded-md px-3 py-1 focus:outline-none"
          value={taskpriority}
          onChange={(e) => {
            settaskpriority(e.target.value);
            if (taskpriority <= 30) {
              setprioritylevel("low");
            } else if (taskpriority <= 70) {
              setprioritylevel("medium");
            } else {
              setprioritylevel("high");
            }
          }}
        />
        <span>{prioritylevel}</span>
      </div>

      <div className="text-start flex justify-between px-15">
        <label className="">Assignee</label>
        <input
          required
          type="text"
          className="border rounded-md px-3 py-1 focus:outline-none"
          value={taskassignee}
          onChange={(e) => {
            settaskassignee(e.target.value);
          }}
        />
      </div>
      <div className="text-start flex justify-between px-15">
        <label className="">Due data</label>
        <input
          type="date"
          className="border rounded-md px-3 py-1 focus:outline-none"
          value={taskduedate}
          onChange={(e) => {
            settaskduedate(e.target.value);
          }}
        />
      </div>
      <div className="text-start flex justify-between px-15">
        <label className="">Tags</label>
        <input
          required
          type="text"
          className="border rounded-md px-3 py-1 focus:outline-none"
          value={tasktag}
          onChange={(e) => {
            settasktag(e.target.value);
          }}
        />
      </div>

      <div className="text-start flex justify-between px-15">
        <label className="">Task description</label>
        <textarea
          type="text"
          className="border rounded-md px-3 py-1 focus:outline-none overflow-hidden"
          value={taskdesc}
          onChange={(e) => {
            settaskdesc(e.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="border mx-40 rounded-2xl cursor-pointer hover:bg-black"
      >
        Submit
      </button>
    </form>
  );
};

export default TestNewTask;
