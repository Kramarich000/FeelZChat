export default function Skeleton({
  height = "h-48",
  textRows = 1,
  textWidths = ["w-full"],
  blockType = "rect",
  className = "",
  children,
}) {
  const baseStyles = "bg-gray-300 animate-pulse";
  const borderRadius = blockType === "circle" ? "rounded-full" : "rounded";

  if (children) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`${baseStyles} ${height} ${blockType === "circle" ? "w-48 h-48" : "w-full"} ${borderRadius}`}
      ></div>

      {/* Строки текста */}
      {Array.from({ length: textRows }).map((_, index) => (
        <div
          key={index}
          className={`${baseStyles} h-6 ${textWidths[index] || textWidths[0]}`}
        ></div>
      ))}
    </div>
  );
}
