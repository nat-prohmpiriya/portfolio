interface GradientOverlayProps {
  isDarkMode: boolean;
}

export default function GradientOverlay({ isDarkMode }: GradientOverlayProps) {
  if (isDarkMode) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 rounded-full blur-3xl translate-x-20"></div>
      </div>
    </div>
  );
}
