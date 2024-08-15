import { createSelector } from "@reduxjs/toolkit";

import { LayoutSidebarTypeEnum } from "@common/Layout/constant";

import { RootState } from "../store";

export const layoutSidebarSelector = (id: string) =>
  createSelector(
    (state: RootState) => state.common.layoutSidebars.find((sidebar) => sidebar.id === id),
    (sidebar) => sidebar,
  );

export const layoutSidebarsSelector = (ids?: string[]) =>
  createSelector(
    (state: RootState) => state.common.layoutSidebars.filter((sidebar) => ids?.includes(sidebar.id)),
    (sidebars) => sidebars,
  );

export const layoutSidebarTypeSelector = (id: string) =>
  createSelector(layoutSidebarSelector(id), (layoutSidebar) => {
    let isJira = false;
    let isSEM = false;
    let isGitlab = false;

    if (layoutSidebar) {
      isJira = layoutSidebar.type === LayoutSidebarTypeEnum.JIRA;
      isSEM = layoutSidebar.type === LayoutSidebarTypeEnum.SEM;
      isGitlab = layoutSidebar.type === LayoutSidebarTypeEnum.GITLAB;
    }

    return {
      isJira,
      isSEM,
      isGitlab,
    };
  });

export const layoutSidebarIsCollapseSelector = (id: string) =>
  createSelector(layoutSidebarSelector(id), (sidebar) => sidebar?.isCollapsed ?? false);
