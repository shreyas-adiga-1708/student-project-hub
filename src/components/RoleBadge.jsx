export default function RoleBadge() {
  const role = localStorage.getItem("role");

  const isAdmin = role === "admin";

  return (
    <div className="fixed top-4 right-4 z-50">
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${
          isAdmin
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {isAdmin ? "Admin" : "Viewer"}
      </span>
    </div>
  );
}
