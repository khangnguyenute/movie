import { ReactElement, RefObject } from "react";

export interface BaseDropdownMenuProps {
  className?: string;
  isHideOnClick?: boolean;
  isShow?: boolean;
  menu: ReactElement;
  onHide: VoidFunction;
}

export interface DropdownMenuProps extends BaseDropdownMenuProps {
  isForceRender?: boolean;
  isRenderOnParent?: boolean;
  parentRef: RefObject<HTMLDivElement>;
  position?: "left" | "right" | "center";
  calculatePosition?: (parent: HTMLDivElement, menu: HTMLDivElement) => Partial<DOMRect> | undefined;
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
}

export interface DropdownProps
  extends Omit<DropdownMenuProps, "parentRef" | "className" | "isShow" | "onHide" | "onClickOutside"> {
  children: ReactElement;
  isShowDropdownMenu?: boolean;
  menuClassName?: string;
  onToggle?: (isShow: boolean) => void;
}
