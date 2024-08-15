import { memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import "./index.scss";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar = ({ percentage, className }: ProgressBarProps) => {
  const strokeBgColor = useMemo(() => {
    if (percentage >= 75) {
      return "stroke-green-100";
    }
    if (percentage >= 50) {
      return "stroke-yellow-100";
    }
    if (percentage >= 25) {
      return "stroke-orange-100";
    }
    return "stroke-red-100";
  }, [percentage]);

  const strokeColor = useMemo(() => {
    if (percentage >= 75) {
      return "stroke-green-500";
    }
    if (percentage >= 50) {
      return "stroke-yellow-500";
    }
    if (percentage >= 25) {
      return "stroke-orange-500";
    }
    return "stroke-red-500";
  }, [percentage]);

  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      <svg viewBox="0 0 36 36" className="circular-chart rounded-full bg-gray-700 p-0.25">
        <path
          className={twMerge("circle-bg", strokeBgColor)}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={twMerge("circle", strokeColor)}
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="22" className="percentage fill-white text-sm font-bold">
          {percentage}
        </text>
      </svg>
    </div>
  );
};

export default memo(ProgressBar);
