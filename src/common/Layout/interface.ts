import { ReactElement } from "react";

import { LayoutContentWrapperHeaderProps } from "./Components/ContentWrapperHeader";

export interface LayoutContentWrapperBodyProps {
  children: boolean | ReactElement | ReactElement[];
  isBorder?: boolean;
  isBlank?: boolean;
  isTab?: boolean;
  className?: string;
}

export interface LayoutContentWrapperTabItemType {
  id: string;
  title: string;
}

export interface LayoutContentWrapperTabProps {
  activatedTab: string;
  activatedTabItemClassName?: string;
  activeBarClassName?: string;
  className?: string;
  itemClassName?: string;
  tabs: LayoutContentWrapperTabItemType[];
  tabStyle?: "default" | "line";
  onChange: (id: string) => void;
}

interface LayoutContentWrapperBaseProps
  extends LayoutContentWrapperHeaderProps,
    LayoutContentWrapperBodyProps {
  bodyClassName?: string;
  className?: string;
  tabAction?: ReactElement;
  isShowHeader?: boolean;
  onChangeTab?: (id: string) => void;
}

interface LayoutContentWrapperWithTabProps extends Omit<LayoutContentWrapperTabProps, "onChange"> {
  isBlank?: never;
  isBorder?: never;
  tabClassName?: string;
  tabItemClassName?: string;
  tabHeader?: ReactElement;
  activatedTabItemClassName?: string;
  onChangeTab: (id: string) => void;
  headerClassName?: string;
}

interface LayoutContentWrapperWithoutTabProps {
  activatedTab?: never;
  activatedTabItemClassName?: never;
  isBlank?: boolean;
  isBorder?: boolean;
  tabs?: never;
  tabHeader?: never;
  tabStyle?: never;
  tabClassName?: never;
  tabItemClassName?: never;
  onChangeTab?: never;
  headerClassName?: string;
}

export type LayoutContentWrapperProps = LayoutContentWrapperBaseProps &
  (LayoutContentWrapperWithTabProps | LayoutContentWrapperWithoutTabProps);

export interface ContentWrapperTabItemProps extends LayoutContentWrapperTabItemType {
  activeClassName?: string;
  className?: string;
  isActive: boolean;
  style?: LayoutContentWrapperTabProps["tabStyle"];
  onChange: (id: string) => void;
  onActive: (element: HTMLDivElement) => void;
}

export interface BaseLayoutSidebarProps {
  containerClassName?: string;
  className?: string;
  defaultCollapsedPaths?: string[];
  defaultOpeningGroups?: string[];
}
