import { useRef, useState } from "react";
import { useProjectProgress } from "../../context/ProjectProgessContext";
import { useTask } from "../../context/TaskContext";

const TestNewTask = ({ onSaveTask }) => {
  const projectref = useRef();

  const { projects } = useProjectProgress();

  const [tasktitle, settasktitle] = useState("");
  const [taskdesc, settaskdesc] = useState("");
  const [projectId, setprojectId] = useState("");
  const [taskpriority, settaskpriority] = useState("");
  const [prioritylevel, setprioritylevel] = useState("low");
  const [taskassignee, settaskassignee] = useState("");
  const [taskduedate, settaskduedate] = useState("");
  const [tasktag, settasktag] = useState("");
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const { addTask } = useTask();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (saving) return;  
    setError("")
    setSaving(true)

    try{
    const newTask = {
      title: tasktitle,
      projectId: projectId,
      priority: prioritylevel,
      assignee: taskassignee,
      duedate: taskduedate,
      tag: tasktag,
      description: taskdesc,
      };
      await addTask(newTask);
      await onSaveTask();
    }
    catch (err) {
      console.log(err)
      setError("Could not save the task. Please try again")
    }
    finally {
      setSaving(false)
    }
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
        <select
          className="text-gray-700 outline-none border rounded-md px-5 py-1 focus:outline-none"
          onChange={(e) => 
            setprojectId(e.target.value)
          }
        >
          <option value="">
            {projects.length ? "Select a project" : "Create a project first"}
          </option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.projectName }</option>
          ))}
        </select>
      </div>

      <div className="text-start flex justify-between px-15">
        <label className="">Priority</label>
        <input
          required
          type="range"
          className="border rounded-md px-3 py-1 focus:outline-none "
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
        {saving ? "Saving...":"Submit"}
      </button>
    </form>
  );
};

export default TestNewTask;
