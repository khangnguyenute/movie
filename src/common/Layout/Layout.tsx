import { ReactElement, memo } from "react";

import { LayoutContainer } from "@common/Layout";

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default memo(Layout);
