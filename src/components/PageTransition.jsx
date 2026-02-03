import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.6 }}
      transition={{
        duration: 0.22,
        ease: "easeInOut",
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
