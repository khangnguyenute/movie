import {
  Children,
  ReactElement,
  cloneElement,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BiChevronLeft } from "react-icons/bi";
import { matchPath, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useTimeout } from "usehooks-ts";

import { LayoutSidebarTypeEnum } from "@common/Layout/constant";
import { BaseLayoutSidebarProps } from "@common/Layout/interface";
import useDispatch from "@hooks/useDispatch";
import useSelector from "@hooks/useSelector";
import { layoutSidebarIsCollapseSelector, layoutSidebarTypeSelector } from "@selectors/commonSelector";
import {
  addSidebar,
  collapseLayoutSidebar,
  expandLayoutSidebar,
  toggleLayoutSidebar,
} from "@slices/commonSlice";
import { getTwScreenWidth } from "@utils/Helpers";

import SidebarLink from "./Link/Link";

interface LayoutSidebarProps extends BaseLayoutSidebarProps {
  children?: ReactElement[] | ReactElement;
  id: string;
  type?: LayoutSidebarTypeEnum;
  sidebarLinkClassName?: string;
  isDisabledCollapse?: boolean;
}

const LayoutSidebar = ({
  children,
  className,
  containerClassName,
  sidebarLinkClassName,
  defaultCollapsedPaths,
  defaultOpeningGroups,
  type = LayoutSidebarTypeEnum.GITLAB,
  id: sidebarId,
  isDisabledCollapse = false,
}: LayoutSidebarProps) => {
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [openingGroudIds, setOpeningGroudIds] = useState<string[]>(defaultOpeningGroups || []);
  const [visibleFooterHeight, setVisibleFooterHeight] = useState(0);
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  const isMatchCollapsedPath = useMemo(() => {
    if (!defaultCollapsedPaths) {
      return false;
    }

    return defaultCollapsedPaths.some((path) => matchPath(path, pathname));
  }, [defaultCollapsedPaths, pathname]);
  const isCollapsed = useSelector(layoutSidebarIsCollapseSelector(sidebarId));
  const { isJira, isSEM, isGitlab } = useSelector(layoutSidebarTypeSelector(sidebarId));

  const containerCollapsedClassName = useMemo(() => {
    if (!isCollapsed) {
      return "";
    }

    if (isJira) {
      return "w-6 hover:w-72";
    }

    if (isSEM) {
      return "w-28";
    }

    return "w-14";
  }, [isCollapsed, isJira, isSEM]);

  const footerElement = useMemo(() => {
    const element = document.querySelector("#footer");

    if (element) {
      return element;
    }

    return null;
  }, []);

  const dispatch = useDispatch();

  const handleDocumentScroll = useCallback(() => {
    if (!footerElement) {
      setVisibleFooterHeight(0);
      return;
    }

    const { top } = footerElement.getBoundingClientRect();

    if (top === 0) {
      setVisibleFooterHeight(0);
      return;
    }

    setVisibleFooterHeight(Math.max(0, window.innerHeight - top));
  }, [footerElement]);

  const handleClickCollapse = useCallback(() => {
    if (isDisabledCollapse) return;
    dispatch(toggleLayoutSidebar(sidebarId));
  }, [dispatch, isDisabledCollapse, sidebarId]);

  const handleHoverSidebar = useCallback(() => {
    setIsHoveringSidebar(true);
  }, []);

  const handleLeaveSidebar = useCallback(() => {
    setIsHoveringSidebar(false);
  }, []);

  const handleOpenSidebarGroup = useCallback((id: string, isChildSelected = true) => {
    setOpeningGroudIds((prev) => {
      if (isChildSelected) {
        return [id];
      }

      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [id];
    });
  }, []);

  const autoCloseSidebar = useCallback(() => {
    const windowWidth = window.document.body.clientWidth;
    const minWindowWidth = getTwScreenWidth("md");
    const maxWindowWidth = getTwScreenWidth("lg");

    if (windowWidth >= minWindowWidth && windowWidth < maxWindowWidth) {
      dispatch(collapseLayoutSidebar(sidebarId));
    } else if (windowWidth >= maxWindowWidth && isMatchCollapsedPath) {
      dispatch(collapseLayoutSidebar(sidebarId));
    } else {
      dispatch(expandLayoutSidebar(sidebarId));
    }
  }, [dispatch, isMatchCollapsedPath, sidebarId]);

  useEffect(() => {
    window.addEventListener("scroll", handleDocumentScroll);

    return () => {
      window.removeEventListener("scroll", handleDocumentScroll);
    };
  }, [handleDocumentScroll]);

  useLayoutEffect(() => {
    dispatch(addSidebar({ id: sidebarId, type }));
  }, [dispatch, sidebarId, type]);

  useEffect(() => {
    autoCloseSidebar();

    window.addEventListener("resize", autoCloseSidebar);

    return () => {
      window.removeEventListener("resize", autoCloseSidebar);
    };
  }, [autoCloseSidebar]);

  useTimeout(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.transitionDuration = "100ms";
  }, 1000);

  return (
    <div
      className={twMerge(
        "fixed bottom-0 left-0 top-0 z-40 border-r-2 border-gray-100 bg-gray-100 pt-20",
        className,
      )}
      style={{ height: `calc(100vh - ${visibleFooterHeight}px)` }}
      onMouseEnter={handleHoverSidebar}
      onMouseLeave={handleLeaveSidebar}
    >
      <div
        className={twMerge("group/sidebar relative h-full w-72 bg-gray-100", containerCollapsedClassName)}
        ref={ref}
      >
        <div
          className={twMerge(
            "h-full w-full px-4 py-5 scrollbar-none hover:overflow-clip hover:overflow-y-auto",
            containerClassName,
            isCollapsed && isJira && "opacity-0 group-hover/sidebar:opacity-100",
            isCollapsed && isSEM && "p-3",
            isCollapsed && isGitlab && "overflow-visible px-2 hover:overflow-visible",
          )}
        >
          {children &&
            Children?.map(children, (child) =>
              cloneElement(child, {
                ...child?.props,
                key: child?.props?.id,
                isOpen: openingGroudIds.includes(child?.props.id),
                sidebarId,
                onOpen: handleOpenSidebarGroup,
              }),
            )}
          <SidebarLink className={sidebarLinkClassName} />
        </div>
      </div>
      <div
        role="button"
        tabIndex={0}
        className={twMerge(
          "absolute -right-3.5 top-26.5 z-10 hidden h-7 w-7 cursor-pointer select-none items-center justify-center rounded-full border-2 border-gray-100 bg-white opacity-0 shadow-lg hover:bg-gray-50",
          (isHoveringSidebar || (isCollapsed && isJira)) && "opacity-100",
          isDisabledCollapse && "hidden opacity-0",
        )}
        onClick={handleClickCollapse}
      >
        <BiChevronLeft
          className={twMerge("text-slate-500 duration-100", isCollapsed && "rotate-180")}
          size={18}
        />
      </div>
    </div>
  );
};
export default memo(LayoutSidebar);
