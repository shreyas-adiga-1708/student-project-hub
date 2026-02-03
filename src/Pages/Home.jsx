import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

import AnimatedBackground from "../components/AnimatedBackground";

/* Code snippets */
const CODE = {
  js: [
    "import React from 'react';",
    "",
    "export default function BrainTumorDetection() {",
    "  const accuracy = 96.4;",
    "",
    "  return (",
    "    <div className='project'>",
    "      <h1>Brain Tumor Detection</h1>",
    "      <p>Accuracy: {accuracy}%</p>",
    "    </div>",
    "  );",
    "}",
  ],
  python: [
    "import numpy as np",
    "from sklearn.model_selection import train_test_split",
    "",
    "X_train, X_test, y_train, y_test = train_test_split(X, y)",
    "",
    "model.fit(X_train, y_train)",
    "accuracy = model.score(X_test, y_test)",
    "print('Accuracy:', accuracy)",
  ],
  java: [
    "public class BrainTumorDetection {",
    "  public static void main(String[] args) {",
    "    double accuracy = 96.4;",
    "",
    "    System.out.println(",
    '      "Model Accuracy: " + accuracy + "%"',
    "    );",
    "  }",
    "}",
  ],
};

export default function Home() {
  const [lang, setLang] = useState("js");
  const [displayed, setDisplayed] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const lines = CODE[lang];

  useEffect(() => {
    setDisplayed("");
    setLineIndex(0);
    setCharIndex(0);
  }, [lang]);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    if (charIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayed(
          (prev) =>
            prev +
            (charIndex === currentLine.length ? "\n" : currentLine[charIndex])
        );
        setCharIndex(charIndex + 1);
      }, 35);

      return () => clearTimeout(timeout);
    } else {
      setCharIndex(0);
      setLineIndex(lineIndex + 1);
    }
  }, [charIndex, lineIndex, lines]);

  return (
    <>
      <Navbar />
      <AnimatedBackground />

      <div className="min-h-screen pt-20 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">
              Student Project Hub
            </h1>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Explore real academic projects built using real programming
              languages.
            </p>

            <Link
              to="/projects"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Explore Projects
            </Link>
          </motion.div>

          {/* RIGHT – LAPTOP + ICONS + CODE */}
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative"
          >
            {/* Programming Language Icons */}
            <div className="flex justify-center gap-6 mb-3">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                alt="JavaScript"
                className={`w-8 h-8 ${lang === "js" ? "" : "opacity-40"}`}
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                alt="Python"
                className={`w-8 h-8 ${lang === "python" ? "" : "opacity-40"}`}
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                alt="Java"
                className={`w-8 h-8 ${lang === "java" ? "" : "opacity-40"}`}
              />
            </div>

            {/* Language Switch */}
            <div className="flex gap-3 mb-3 justify-center">
              {["js", "python", "java"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold border ${
                    lang === l
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Laptop */}
            <div className="bg-slate-900 rounded-2xl shadow-2xl p-4">
              <div className="bg-black rounded-xl p-4 font-mono text-sm text-green-400 h-64 overflow-hidden whitespace-pre-wrap">
                {displayed}
                <motion.span
                  className="inline-block w-2 h-4 bg-green-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </div>
            </div>

            {/* Laptop base */}
            <div className="w-72 h-3 bg-slate-800 mx-auto rounded-b-xl mt-2" />
          </motion.div>

        </div>
      </div>
    </>
  );
}
