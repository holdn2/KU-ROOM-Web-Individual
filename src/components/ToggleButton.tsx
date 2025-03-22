import React from "react";

interface ToggleButtonProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOn, onToggle }) => {
  return (
    <svg
      width="66"
      height="42"
      viewBox="0 0 66 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onToggle}
      style={{
        cursor: "pointer",
        overflow: "visible",
        position: "absolute",
        right: 0,
        top: "13px",
      }}
    >
      {/* 배경 */}
      <g filter="url(#filter0_ii)">
        <rect
          width="66"
          height="39"
          rx="19.5"
          fill="#E3E7EB"
          fillOpacity="0.3"
        />
      </g>

      {/* 이동하는 원 */}
      <g filter="url(#filter1_dii)">
        <circle
          cx={isOn ? 46.5 : 19.5} // 위치 변화
          cy="19.5"
          r="15.5"
          fill={isOn ? "#4CAF50" : "#9EAAB5"}
          style={{
            transition: "cx 0.3s ease-in-out, fill 0.3s ease-in-out",
          }}
        />
      </g>

      {/* 필터 정의 */}
      <defs>
        <filter
          id="filter0_ii"
          x="-1"
          y="-1"
          width="68"
          height="41"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.619608 0 0 0 0 0.666667 0 0 0 0 0.709804 0 0 0 0.5 0"
          />
          <feBlend in2="shape" result="effect1_innerShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" dy="-1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend in2="effect1_innerShadow" result="effect2_innerShadow" />
        </filter>

        {/* 🎯 필터 영역 넓힘: x, width, height 조정 */}
        <filter
          id="filter1_dii"
          x="0"
          y="0"
          width="70"
          height="42"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.619608 0 0 0 0 0.666667 0 0 0 0 0.709804 0 0 0 0.5 0"
          />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend in2="shape" result="effect2_innerShadow" />
          <feOffset dx="-1" dy="-1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend in2="effect2_innerShadow" result="effect3_innerShadow" />
        </filter>
      </defs>
    </svg>
  );
};

export default ToggleButton;
