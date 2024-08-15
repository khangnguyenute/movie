import { ReactNode, memo } from "react";

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

interface LayoutDefaultProps {
  children: ReactNode | ReactNode[];
  headerPrefix?: ReactNode;
}

const LayoutDefault = ({ children, headerPrefix }: LayoutDefaultProps) => {
  return (
    <>
      <Header prefix={headerPrefix} />
      {children}
      <Footer />
    </>
  );
};

export default memo(LayoutDefault);
