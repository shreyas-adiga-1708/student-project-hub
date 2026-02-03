export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-50">
      
      {/* Floating soft circles */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-gray-200 opacity-40 animate-float-slow"></div>

      <div className="absolute top-1/3 right-32 w-56 h-56 rounded-full bg-gray-300 opacity-30 animate-float-medium"></div>

      <div className="absolute bottom-24 left-1/3 w-48 h-48 rounded-full bg-gray-200 opacity-40 animate-float-fast"></div>

      {/* Subtle dot pattern */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)]
          bg-[size:22px_22px]
          opacity-30
        "
      />
    </div>
  );
}
