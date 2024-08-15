import { debounce } from "lodash";
import { memo, useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { LayoutContentWrapperTabProps } from "../interface";
import ContentWrapperTabItem from "./ContentWrapperTabItem";

const LayoutContentWrapperTab = ({
  activeBarClassName,
  activatedTab,
  activatedTabItemClassName,
  className,
  itemClassName,
  tabs,
  tabStyle,
  onChange,
}: LayoutContentWrapperTabProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBarRef = useRef<HTMLSpanElement>(null);
  const scrollMaskRef = useRef<HTMLDivElement>(null);

  const handleActiveTab = useCallback(
    (tabElement: HTMLDivElement) => {
      const activeBarElement = activeBarRef.current;

      if (!tabElement || !activeBarElement) {
        return;
      }

      const { width } = tabElement.getBoundingClientRect();
      const { offsetLeft } = tabElement;

      if (tabStyle === "line") {
        activeBarElement.style.width = `${width - 24}px`;
        activeBarElement.style.left = `${offsetLeft + 12}px`;
      } else {
        activeBarElement.style.width = `${width - 52}px`;
        activeBarElement.style.left = `${offsetLeft + 26}px`;
      }
    },
    [tabStyle],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleActiveTabDebounced = useCallback(debounce(handleActiveTab, 50), [handleActiveTab]);

  const handleOverflowX = useCallback(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const isOverflowX = containerElement.scrollWidth > containerElement.clientWidth;

    if (isOverflowX) {
      containerElement.classList.remove("justify-center");
      containerElement.classList.add("justify-start");
    }
  }, []);

  useEffect(() => {
    handleOverflowX();
  }, [handleOverflowX, tabs]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={twMerge(
        "relative left-0 z-10 -mb-0.5 flex select-none items-center rounded-t-lg p-4",
        tabStyle === "line" && "-mb-0.5 bg-transparent",
        className,
      )}
      ref={containerRef}
    >
      {tabs.map((tab) => (
        <ContentWrapperTabItem
          activeClassName={activatedTabItemClassName}
          className={itemClassName}
          id={tab.id}
          isActive={activatedTab === tab.id}
          key={tab.id}
          style={tabStyle}
          title={tab.title}
          onChange={onChange}
          onActive={handleActiveTabDebounced}
        />
      ))}
      <span
        className={twMerge(
          "lg:border-primary-700 absolute bottom-px left-6 border-t-2 border-transparent duration-100",
          activeBarClassName,
        )}
        ref={activeBarRef}
      />
      <div className={twMerge("absolute inset-y-0 z-10 cursor-grab bg-transparent")} ref={scrollMaskRef} />
    </div>
  );
};

export default memo(LayoutContentWrapperTab);
