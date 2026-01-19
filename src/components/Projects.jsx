import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
} from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // search filters
  const [searchTitle, setSearchTitle] = useState("");
  const [searchSkill, setSearchSkill] = useState("");
  const [searchDescription, setSearchDescription] = useState("");

  // add / edit state
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  /* =============================
     FETCH PROJECTS (WITH FILTERS)
  ============================== */

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const filters = {};
      if (searchTitle.trim()) filters.title = searchTitle;
      if (searchSkill.trim()) filters.skill = searchSkill;
      if (searchDescription.trim()) filters.description = searchDescription;

      const res = await getProjects(filters);
      setProjects(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Failed to fetch projects", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  /* =============================
     DEBOUNCED SEARCH
  ============================== */

  useEffect(() => {
    const timeout = setTimeout(fetchProjects, 400);
    return () => clearTimeout(timeout);
  }, [searchTitle, searchSkill, searchDescription]);

  /* =============================
     ADD PROJECT
  ============================== */

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      skills: "",
      github: "",
      live: "",
    });
  };

  const saveAdd = async () => {
    await createProject({
      title: formData.title,
      description: formData.description,
      skills: formData.skills.split(",").map((s) => s.trim()),
      github: formData.github || null,
      live: formData.live || null,
    });

    cancelActions();
    fetchProjects();
  };

  /* =============================
     EDIT PROJECT
  ============================== */

  const startEdit = (project) => {
    setEditingId(project._id);
    setIsAdding(false);
    setFormData({
      ...project,
      skills: project.skills.join(", "),
    });
  };

  const saveEdit = async () => {
    await updateProject(editingId, {
      title: formData.title,
      description: formData.description,
      skills: formData.skills.split(",").map((s) => s.trim()),
      github: formData.github || null,
      live: formData.live || null,
    });

    cancelActions();
    fetchProjects();
  };

  const cancelActions = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  /* =============================
     JSX
  ============================== */

  return (
    <section className="w-full min-h-screen py-20 px-6 flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-12">
        <h2 className="text-6xl font-semibold">Projects</h2>
        <button onClick={startAdd} className="px-4 py-2 border">
          + Add Project
        </button>
      </div>

      {/* SEARCH FILTERS */}
      <div className="w-full max-w-5xl mb-12 flex flex-col gap-4">
        <input
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="border px-4 py-3"
        />
        <input
          placeholder="Search by skill (Node.js, React, MongoDB)"
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
          className="border px-4 py-3"
        />
        <input
          placeholder="Search in description"
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
          className="border px-4 py-3"
        />
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-12">

        {/* ADD MODE */}
        {isAdding && (
          <div className="border p-6 flex flex-col gap-3">
            <input
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Project Title"
              className="border px-3 py-2"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Project Description"
              className="border px-3 py-2"
            />
            <input
              name="skills"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="Skills (comma separated)"
              className="border px-3 py-2"
            />
            <input
              name="github"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="GitHub URL"
              className="border px-3 py-2"
            />
            <input
              name="live"
              value={formData.live}
              onChange={(e) => setFormData({ ...formData, live: e.target.value })}
              placeholder="Live URL"
              className="border px-3 py-2"
            />

            <div className="flex gap-4 mt-4">
              <button onClick={saveAdd} className="px-4 py-2 bg-black text-white">
                Save
              </button>
              <button onClick={cancelActions} className="px-4 py-2 border">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* PROJECT LIST */}
        {loading ? (
          <p className="text-center">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-600">No projects found</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="border-b pb-8">
              {editingId === project._id ? (
                /* EDIT MODE */
                <div className="flex flex-col gap-3">
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border px-3 py-2"
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="border px-3 py-2"
                  />
                  <input
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="border px-3 py-2"
                  />
                  <input
                    value={formData.github || ""}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="border px-3 py-2"
                  />
                  <input
                    value={formData.live || ""}
                    onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                    className="border px-3 py-2"
                  />

                  <div className="flex gap-4 mt-4">
                    <button onClick={saveEdit} className="px-4 py-2 bg-black text-white">
                      Save
                    </button>
                    <button onClick={cancelActions} className="px-4 py-2 border">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEW MODE */
                <div className="flex flex-col gap-3">
                  <h3 className="text-3xl">{project.title}</h3>
                  <p className="text-gray-700">{project.description}</p>

                  <div className="flex gap-2 flex-wrap">
                    {project.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 border text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 text-sm mt-2">
                    {project.github && <a href={project.github} className="underline">GitHub</a>}
                    {project.live && <a href={project.live} className="underline">Live</a>}
                  </div>

                  <button
                    onClick={() => startEdit(project)}
                    className="mt-3 self-start text-sm underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Projects;
