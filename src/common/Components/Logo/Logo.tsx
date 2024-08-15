import { HTMLAttributes, memo } from "react";

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  imageClassName?: string;
}

const Logo = ({ className, imageClassName }: LogoProps) => {
  return (
    <div className={className}>
      <img src="/logo_name.png" alt="KMovie" className={imageClassName} />
    </div>
  );
};

export default memo(Logo);
