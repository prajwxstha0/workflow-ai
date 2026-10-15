import { useState } from "react";
import { useProjectProgress } from "../../../context/ProjectProgessContext";

const NewProjectForm = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("planning");
  const [priority, setPriority] = useState("medium");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { addProject } = useProjectProgress();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setError("");
    setSaving(true);

    try {
      const projectData = {
        projectName: projectName,
        description: description,
        status: status,
        priority: priority,
      };
      await addProject(projectData);
      setSaving(false);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className=" top-5 left-0  p-4 bg-amber-50">
      <form className="flex flex-col text-start gap-3" onSubmit={handleSubmit}>
        {saving && <div>Saving...</div>}
        <div>
          <label>Name</label>
          <input
            required
            type="text"
            className="border"
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            placeholder="What is this project about?"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        <div>
          <label>Statues</label>
          <select
            className="border rounded-2xl"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="hold">Hold</option>
          </select>
        </div>

        <div>
          <label>Priority</label>
          <select
            className="border rounded-2xl"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
          >
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button type="submit" className="border">
          Create Project
        </button>
      </form>
      <div className="border" onClick={onClose}>
        Cancel
      </div>
    </div>
  );
};

export default NewProjectForm;
