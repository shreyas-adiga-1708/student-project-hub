import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, onClose, onDownload }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
            />

            <h2 className="text-2xl font-bold text-indigo-600 mb-2">
              {project.title}
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              {project.description}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <b>Status:</b> {project.status}
            </p>

            <p className="text-sm text-gray-600 mb-4">
              <b>Downloads:</b> {project.downloads}
            </p>

            <button
              onClick={() => {
                onDownload(project);
                onClose();
              }}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Download ZIP
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
