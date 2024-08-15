import { cloneElement, useEffect, useState } from "react";
import { Link, LinkProps, matchRoutes, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

import useSelector from "@hooks/useSelector";
import { layoutSidebarIsCollapseSelector, layoutSidebarTypeSelector } from "@selectors/commonSelector";

export interface LayoutSidebarItemProps extends Pick<LinkProps, "state"> {
  id: string;
  sidebarId?: string;
  to: string;
  icon: JSX.Element;
  isChild?: boolean;
  text: string;
  textColor?: string;
  className?: string;
}

const LayoutSidebarItem = ({
  id,
  sidebarId,
  to,
  icon,
  isChild,
  text,
  textColor,
  className,
  state,
}: LayoutSidebarItemProps) => {
  const [isActivated, setIsActivated] = useState(false);

  const isCollapsed = useSelector(layoutSidebarIsCollapseSelector(sidebarId as string));
  const { isSEM, isGitlab } = useSelector(layoutSidebarTypeSelector(sidebarId as string));

  const { pathname } = useLocation();

  useEffect(() => {
    if (to === pathname) {
      setIsActivated(true);

      return;
    }

    const toWithoutRole = to.replace(/\/[^/]+/, "");

    if (!toWithoutRole) {
      setIsActivated(false);

      return;
    }

    const toPattern = `${to}/*`;
    const matchedRoutes = matchRoutes([{ path: toPattern }], pathname);

    if (!matchedRoutes) {
      setIsActivated(false);

      return;
    }

    setIsActivated(matchedRoutes.some((matchRoute) => matchRoute.pathname === pathname));
  }, [pathname, to]);

  return (
    <>
      <Link
        to={to}
        className={twMerge(
          "before:bg-primary-800 hover:text-primary-600 group relative my-1 flex items-center rounded-md px-4 py-3 font-[450] before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-sm hover:bg-gray-200 xs:px-7 md:px-6",
          isActivated ? "text-primary-600 bg-gray-200 before:block" : "text-slate-700 before:hidden",
          isCollapsed && isSEM && "flex-col justify-center pt-4 text-center md:px-2",
          isCollapsed && isGitlab && !isChild && "h-10 w-full items-center justify-start md:px-2.5 md:py-0",
          isChild && "md:py-2 md:pl-3 md:pr-4",
        )}
        state={state}
        data-tooltip-id={id}
        data-tooltip-content={text}
        data-tooltip-place="right"
        data-tooltip-position-strategy="fixed"
        data-tooltip-offset={16}
      >
        {cloneElement(icon, {
          className: twMerge(
            "flex-shrink-0 w-5 mr-4 group-hover:text-primary-600 ml-0.5 xs:ml-0",
            textColor,
            className,
            isCollapsed && (isSEM || (isGitlab && !isChild)) && "mr-0",
          ),
          size: 20,
        })}
        {!(isCollapsed && isGitlab && !isChild) && (
          <div
            className={twMerge(
              "!line-clamp-1 hidden md:inline-block",
              textColor,
              isCollapsed && isSEM && "mt-1 text-sm",
              isCollapsed && isGitlab && "whitespace-nowrap",
              isChild && "w-full",
            )}
            id={id}
          >
            {text}
          </div>
        )}
      </Link>
      {isCollapsed && isGitlab && !isChild && <Tooltip id={id} />}
    </>
  );
};

export default LayoutSidebarItem;
