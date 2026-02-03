export function generateThumbnail(title) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#0f172a"; // dark slate
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Accent bar
  ctx.fillStyle = "#6366f1"; // indigo
  ctx.fillRect(0, 0, canvas.width, 12);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const words = title.split(" ");
  let line = "";
  let lines = [];

  words.forEach((word) => {
    const test = line + word + " ";
    if (ctx.measureText(test).width > 480) {
      lines.push(line);
      line = word + " ";
    } else {
      line = test;
    }
  });
  lines.push(line);

  lines.forEach((l, i) => {
    ctx.fillText(
      l.trim(),
      canvas.width / 2,
      canvas.height / 2 + i * 42
    );
  });

  return canvas.toDataURL("image/png");
}
