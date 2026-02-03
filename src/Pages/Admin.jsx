import { useEffect, useState } from "react";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects")) || []);
  }, []);

  const handleUpload = () => {
    if (!title || !tech || files.length === 0) return;

    const newProject = {
      id: Date.now(),
      title,
      tech,
      description,
      files: Array.from(files).map((file) => ({
        path: file.webkitRelativePath || file.name,
        file,
      })),
      downloads: 0,
      status: "Fresh",
      thumbnail: "",
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));

    setTitle("");
    setTech("");
    setDescription("");
    setFiles([]);
  };

  const handleDelete = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-screen pt-28 px-6 overflow-hidden">

      {/* 🌫 Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Soft accent shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />

      {/* CONTENT (unchanged) */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Upload and manage academic projects
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Upload New Project
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Project Title"
              className="border px-4 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Technology (React, Python, etc.)"
              className="border px-4 py-2 rounded"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
            />
          </div>

          <textarea
            placeholder="Project Description"
            className="border px-4 py-2 rounded w-full mb-4"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            multiple
            webkitdirectory="true"
            className="mb-4"
            onChange={(e) => setFiles(e.target.files)}
          />

          <button
            onClick={handleUpload}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg
            font-semibold hover:bg-indigo-700 transition"
          >
            Upload Project
          </button>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Uploaded Projects
          </h2>

          {projects.length === 0 ? (
            <p className="text-gray-500">
              No projects uploaded yet.
            </p>
          ) : (
            <div className="space-y-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between
                  border rounded-lg px-4 py-3"
                >
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-600">{p.tech}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}