interface GradientOverlayProps {
  isDarkMode: boolean;
}

export default function GradientOverlay({ isDarkMode }: GradientOverlayProps) {
  if (isDarkMode) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-purple-300 rounded-full blur-3xl translate-x-20"></div>
      </div>
    </div>
  );
}
