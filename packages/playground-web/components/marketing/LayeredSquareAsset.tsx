export const LayeredSquareAsset = ({
  className = '',
  size = '100%',
  showBackground = true,
}: {
  className?: string;
  size?: number | string;
  showBackground?: boolean;
}) => {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: showBackground ? '#ffffff' : 'transparent',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="main-logo-svg"
      >
        <defs>
          {showBackground && (
            <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="rgba(0, 0, 0, 0.08)"
                strokeWidth="1"
              />
            </pattern>
          )}

          <linearGradient id="topLayerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0056FF" />
            <stop offset="100%" stopColor="#004CD4" />
          </linearGradient>

          <linearGradient id="midLayerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#004CD4" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="bottomLayerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
          </linearGradient>

          <filter id="innerShadow">
            <feOffset dx="0" dy="1.5" />
            <feGaussianBlur stdDeviation="1.5" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.1" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>

          <radialGradient id="gridMask" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="40%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="radialMask">
            <rect width="200" height="200" fill="url(#gridMask)" />
          </mask>
        </defs>

        {/* 그리드 배경 (SVG 내부로 이동) */}
        {showBackground && (
          <rect width="200" height="200" fill="url(#grid-pattern)" mask="url(#radialMask)" />
        )}

        {/* 레이어드 스퀘어 조형물 (더 진한 블루 & 촘촘한 간격) */}
        <g transform="translate(0, 0)">
          <g
            style={{ filter: 'drop-shadow(0px 15px 30px rgba(2,132,199,0.2))' }}
            className="transition-transform duration-700 hover:scale-[1.05]"
          >
            {/* 하단 레이어 (수직 간격 축소: 12px) */}
            <path
              d="M100 85 L155 115 Q165 120 155 125 L100 155 Q90 160 81 155 L26 125 Q16 120 26 115 L81 85 Q90 80 100 85 Z"
              fill="url(#bottomLayerGradient)"
              transform="translate(0, 24)"
            />

            {/* 중간 레이어 (수직 간격 축소: 12px) */}
            <path
              d="M100 85 L155 115 Q165 120 155 125 L100 155 Q90 160 81 155 L26 125 Q16 120 26 115 L81 85 Q90 80 100 85 Z"
              fill="url(#midLayerGradient)"
              transform="translate(0, 12)"
            />

            {/* 상단 레이어 (가장 상단 배치) */}
            <path
              d="M100 85 L155 115 Q165 120 155 125 L100 155 Q90 160 81 155 L26 125 Q16 120 26 115 L81 85 Q90 80 100 85 Z"
              fill="url(#topLayerGradient)"
              style={{ filter: 'url(#innerShadow)' }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
