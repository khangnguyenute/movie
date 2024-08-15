import { Children, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import useDocumentTitle from "@hooks/useDocumentTitle";

import { LayoutContentWrapperProps } from "../interface";
import LayoutContentWrapperBody from "./ContentWrapperBody";
import LayoutContentWrapperHeader from "./ContentWrapperHeader";
import LayoutContentWrapperTab from "./ContentWrapperTab";

const LayoutContentWrapper = ({
  actions,
  activatedTab,
  activatedTabItemClassName,
  className,
  bodyClassName,
  headerClassName,
  children,
  isBlank,
  isBorder,
  isShowHeader = true,
  tabClassName,
  tabItemClassName,
  tabHeader,
  tabs,
  tabStyle,
  title,
  tabAction,
  onChangeTab,
}: LayoutContentWrapperProps) => {
  const activatedTabIndex = useMemo(
    () => tabs?.findIndex((tab) => tab.id === activatedTab) ?? 0,
    [activatedTab, tabs],
  );

  const childTabElement = useMemo(
    () => Children.toArray(children)[activatedTabIndex] ?? null,
    [activatedTabIndex, children],
  );

  useDocumentTitle(title, isShowHeader);

  return (
    <div className={twMerge("mb-4 w-full lg:mb-0", className)}>
      {(title || actions) && isShowHeader && (
        <LayoutContentWrapperHeader className={headerClassName} title={title} actions={actions} />
      )}
      <div className="relative">
        {tabs && (
          <LayoutContentWrapperTab
            activatedTab={activatedTab}
            activatedTabItemClassName={activatedTabItemClassName}
            className={tabClassName}
            itemClassName={tabItemClassName}
            tabStyle={tabStyle}
            tabs={tabs}
            onChange={onChangeTab}
          />
        )}
        {tabAction}
      </div>

      <LayoutContentWrapperBody
        className={bodyClassName}
        isBlank={isBlank}
        isBorder={isBorder}
        isTab={Boolean(tabs?.length)}
      >
        <div>
          {tabHeader}
          {!tabs?.length || !childTabElement ? children : childTabElement}
        </div>
      </LayoutContentWrapperBody>
    </div>
  );
};

export default memo(LayoutContentWrapper);
