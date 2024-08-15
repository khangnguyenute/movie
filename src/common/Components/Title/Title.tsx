import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  title: string;
  subtitle: string | ReactNode;
  className?: string;
  titleClassname?: string;
  subtitleClassname?: string;
  onClick?: () => void;
}

const Title = ({ title, subtitle, className, titleClassname, subtitleClassname, onClick }: TitleProps) => {
  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        className={twMerge("w-fit text-lg font-semibold duration-300", titleClassname)}
        onClick={onClick}
      >
        {title}
      </div>
      <i className={subtitleClassname}>{subtitle ?? "_"}</i>
    </div>
  );
};

export default memo(Title);
