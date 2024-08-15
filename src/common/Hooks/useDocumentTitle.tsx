import { ReactNode, useEffect } from "react";

const useDocumentTitle = (title: ReactNode, isScrollToTop = true) => {
  useEffect(() => {
    if (typeof title !== "string" || !isScrollToTop) {
      return;
    }

    window.document.title = `${title} | KMovie`;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isScrollToTop, title]);
};

export default useDocumentTitle;
