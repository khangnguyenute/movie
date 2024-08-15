import {
  MouseEvent as ReactMouseEvent,
  cloneElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import DropdownMenu from "./DropdownMenu";
import { DropdownProps } from "./interface";

const Dropdown = ({
  children,
  isForceRender,
  isHideOnClick,
  isShowDropdownMenu: isShowDropdownMenuProps,
  isRenderOnParent = false,
  menu,
  menuClassName,
  position,
  onToggle,
  calculatePosition,
}: DropdownProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);

  const handleOpenDropdownMenu = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsShowDropdownMenu((prev) => !prev);
  }, []);

  const handleCloseDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(false);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    const target = event.target as HTMLElement;
    const parentElement = parentRef.current;

    if (!parentElement || !parentElement.contains(target)) {
      setIsShowDropdownMenu(false);
    }
  }, []);

  useEffect(() => {
    onToggle?.(isShowDropdownMenu);
  }, [isShowDropdownMenu, onToggle]);

  return (
    <>
      {cloneElement(children, { ...children.props, onClick: handleOpenDropdownMenu, ref: parentRef })}
      {(isForceRender || isShowDropdownMenuProps || isShowDropdownMenu) && (
        <DropdownMenu
          className={menuClassName}
          isHideOnClick={isHideOnClick}
          isShow={isShowDropdownMenuProps ?? isShowDropdownMenu ?? false}
          isForceRender={isForceRender}
          isRenderOnParent={isRenderOnParent}
          menu={menu}
          position={position}
          parentRef={parentRef}
          onHide={handleCloseDropdownMenu}
          onClickOutside={handleClickOutside}
          calculatePosition={calculatePosition}
        />
      )}
    </>
  );
};

export default memo(Dropdown);
