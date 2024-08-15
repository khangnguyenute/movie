import { ReactNode, memo, useRef } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@components/Logo";

import HeaderNavbar from "./HeaderNavbar";
import HeaderSearch from "./HeaderSearch";

interface HeaderProps {
  prefix?: ReactNode;
}

const Header = ({ prefix }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-0 z-50 h-20 w-full bg-primary shadow-md" ref={headerRef}>
      <div className="mx-auto flex h-full w-full max-w-layout items-center justify-between">
        <div className="flex items-center justify-start">
          {prefix}
          <Link to="/" className="flex h-full flex-shrink-0 items-center">
            <Logo imageClassName="h-full" className="h-12" />
          </Link>
          <HeaderNavbar />
        </div>
        <HeaderSearch />
      </div>
    </div>
  );
};
export default memo(Header);
