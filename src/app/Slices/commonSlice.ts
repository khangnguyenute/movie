import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { LayoutSidebarTypeEnum } from "@common/Layout/constant";
import { ConfigDataType, LanguageDataType } from "@interfaces/Common";

export interface GlobalStateLayoutSidebarConfigType {
  id: string;
  type: LayoutSidebarTypeEnum;
  isCollapsed?: boolean;
}

interface CommonGlobalStateType {
  configs: ConfigDataType[];
  languages: LanguageDataType[];
  isOpenLayoutSidebar?: boolean;
  layoutSidebarType: LayoutSidebarTypeEnum;
  layoutSidebars: GlobalStateLayoutSidebarConfigType[];
}

const initialState: CommonGlobalStateType = {
  configs: [],
  languages: [],
  isOpenLayoutSidebar: true,
  layoutSidebarType: LayoutSidebarTypeEnum.GITLAB,
  layoutSidebars: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setConfigs: (state, action: PayloadAction<ConfigDataType[]>) => {
      if (!_.isEqual(action.payload, state.configs)) {
        Object.assign(state.configs ?? {}, action.payload);
      }
    },
    setLanguage: (state, action: PayloadAction<LanguageDataType[]>) => {
      state.languages = action.payload;
    },
    toggleLayoutSidebar: (state, action: PayloadAction<string>) => {
      const layoutSidebar = state.layoutSidebars.find((sidebar) => sidebar.id === action.payload);

      if (layoutSidebar) {
        layoutSidebar.isCollapsed = !layoutSidebar.isCollapsed;
      }
    },
    collapseLayoutSidebar: (state, action: PayloadAction<string>) => {
      const layoutSidebar = state.layoutSidebars.find((sidebar) => sidebar.id === action.payload);

      if (layoutSidebar) {
        layoutSidebar.isCollapsed = true;
      }
    },
    expandLayoutSidebar: (state, action: PayloadAction<string>) => {
      const layoutSidebar = state.layoutSidebars.find((sidebar) => sidebar.id === action.payload);

      if (layoutSidebar) {
        layoutSidebar.isCollapsed = false;
      }
    },
    setLayoutSidebarType: (state, action: PayloadAction<LayoutSidebarTypeEnum>) => {
      state.layoutSidebarType = action.payload;
    },
    addSidebar: (state, action: PayloadAction<GlobalStateLayoutSidebarConfigType>) => {
      const index = state.layoutSidebars.findIndex((sidebar) => sidebar.id === action.payload.id);

      if (index !== -1) {
        state.layoutSidebars.splice(index, 1);
      }

      state.layoutSidebars.push(action.payload);
    },
  },
});

const { actions, reducer: commonReducer } = commonSlice;

export const {
  setConfigs,
  setLanguage,
  toggleLayoutSidebar,
  collapseLayoutSidebar,
  expandLayoutSidebar,
  setLayoutSidebarType,
  addSidebar,
} = actions;

export default commonReducer;
