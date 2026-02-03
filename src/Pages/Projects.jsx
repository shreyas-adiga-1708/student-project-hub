import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";

/* 🔹 Generate initials */
const getInitials = (title) => {
  if (!title) return "?";
  const words = title.trim().split(" ");
  return words.length === 1
    ? words[0][0].toUpperCase()
    : (words[0][0] + words[1][0]).toUpperCase();
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  const [downloadingId, setDownloadingId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [speed, setSpeed] = useState("");

  /* 🔴 Cancel ref (IMPORTANT) */
  const cancelRef = useRef(false);

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects")) || []);
  }, []);

  /* ❌ Cancel download */
  const cancelDownload = () => {
    cancelRef.current = true;
  };

  /* 🔄 Reset download UI */
  const resetDownloadState = () => {
    cancelRef.current = false;
    setDownloadingId(null);
    setProgress(0);
    setCurrentFile("");
    setSpeed("");
  };

  /* ✅ REAL ZIP DOWNLOAD WITH WORKING CANCEL */
  const handleDownload = async (project) => {
    setDownloadingId(project.id);
    setProgress(0);
    setCurrentFile("");
    setSpeed("");
    cancelRef.current = false;

    const zip = new JSZip();
    const startTime = Date.now();
    const totalFiles = project.files.length;
    let processedFiles = 0;

    /* 📁 Add files */
    for (const { path, file } of project.files) {
      if (cancelRef.current) {
        resetDownloadState();
        return;
      }

      zip.file(path, file);
      processedFiles++;
      setCurrentFile(file.name);
      setProgress(Math.floor((processedFiles / totalFiles) * 70));

      await new Promise((r) => setTimeout(r, 80)); // smooth UX
    }

    /* 📦 Generate ZIP */
    const blob = await zip.generateAsync(
      { type: "blob" },
      (metadata) => {
        if (cancelRef.current) return;

        const percent = 70 + Math.floor(metadata.percent * 0.3);
        setProgress(percent);

        const elapsed = (Date.now() - startTime) / 1000;
        const kbProcessed = (metadata.percent * 50) || 1;
        setSpeed(`${(kbProcessed / elapsed).toFixed(1)} KB/s`);
      }
    );

    if (cancelRef.current) {
      resetDownloadState();
      return;
    }

    /* ⬇ Trigger download */
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.title}.zip`;
    a.click();
    URL.revokeObjectURL(url);

    /* 📊 Update usage */
    const updated = projects.map((p) =>
      p.id === project.id
        ? { ...p, downloads: (p.downloads || 0) + 1, status: "Used" }
        : p
    );

    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));

    setTimeout(resetDownloadState, 800);
  };

  return (
    <div className="min-h-screen px-6 pt-28 pb-12">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-12">
        Available Projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-lg p-4"
            >
              {/* Thumbnail */}
              <div className="w-full h-40 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-indigo-600 to-violet-600
                text-white text-5xl font-bold mb-4 shadow-inner">
                {getInitials(project.title)}
              </div>

              <h2 className="text-lg font-semibold mb-1">
                {project.title}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {project.tech}
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(project)}
                  className="flex-1 border border-indigo-600 text-indigo-600
                    py-2 rounded-lg font-medium hover:bg-indigo-50"
                >
                  View Details
                </motion.button>

                {downloadingId === project.id ? (
                  <div className="flex-1 text-center">
                    <div className="h-2 w-full bg-gray-200 rounded overflow-hidden mb-2">
                      <div
                        className="h-full bg-indigo-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="text-xs text-indigo-600 font-medium">
                      {progress}% • {speed || "Preparing..."}
                    </p>

                    {currentFile && (
                      <p className="text-[10px] text-gray-500 truncate">
                        {currentFile}
                      </p>
                    )}

                    <button
                      onClick={cancelDownload}
                      className="text-xs text-red-600 hover:underline mt-1"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(project)}
                    className="flex-1 bg-indigo-600 text-white
                      py-2 rounded-lg font-medium hover:bg-indigo-700"
                  >
                    Download ZIP
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-[90%] max-w-lg p-6 relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-red-500"
              />

              <div className="w-full h-40 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-indigo-600 to-violet-600
                text-white text-4xl font-bold mb-5 shadow-lg">
                {getInitials(selected.title)}
              </div>

              <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                {selected.title}
              </h2>

              <p className="text-gray-600 mb-1">
                <strong>Technology:</strong> {selected.tech}
              </p>

              <p className="text-gray-600 mb-4">
                <strong>Status:</strong> {selected.status || "Fresh"}
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload(selected)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg
                  font-semibold hover:bg-indigo-700"
              >
                Download ZIP
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
