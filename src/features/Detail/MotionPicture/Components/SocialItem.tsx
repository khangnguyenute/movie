import { ReactNode, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

interface MotionPictureSocialItemProps {
  icon: ReactNode;
  link: string;
  content: string;
  className?: string;
}

const MotionPictureSocialItem = ({ icon, link, content, className }: MotionPictureSocialItemProps) => {
  const tooltipId = useMemo(() => `social-link-tooltip-${Math.random()}`, []);

  return (
    <Link
      to={link}
      target="_blank"
      className={twMerge("text-primary", className)}
      data-tooltip-id={tooltipId}
      data-tooltip-position-strategy="fixed"
    >
      {icon}
      <Tooltip id={tooltipId} content={content} place="top" positionStrategy="absolute" />
    </Link>
  );
};

export default memo(MotionPictureSocialItem);
