import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";
import { ModalContentProps } from "./interface";

const ModalContent = ({
  isShowLine = true,
  isShowHeader = true,
  isShowFooter = true,
  isAllowSubmit = true,
  isLoading = false,
  title,
  children,
  headerClassName,
  contentContainerClassName = "grid grid-cols-1 gap-6",
  isShowCancelButton = true,
  isShowConfirmButton = true,
  onClose,
  onConfirm,
}: ModalContentProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-full">
        {isShowHeader && (
          <div className={twMerge("rounded-t-lg px-6 pt-4 sm:px-10 sm:pt-7", headerClassName)}>
            <div className="flex items-center justify-between">
              <div className="h-fit w-fit text-lg font-semibold">{title}</div>
              <div className="hover:text-slate-300" role="button" tabIndex={0} onClick={onClose}>
                <IoClose size={20} />
              </div>
            </div>
            {isShowLine && <div className="mt-2 h-1 w-16 rounded-md bg-gray-100" />}
          </div>
        )}
        <div
          className={twMerge(
            "grid w-full grid-cols-1 gap-4 px-6 py-5 sm:gap-6 sm:px-10 sm:py-8",
            contentContainerClassName,
          )}
        >
          {children}
        </div>
      </div>
      {isShowFooter && (
        <div className="flex items-center justify-end space-x-6 rounded-b-lg bg-gray-50 px-10 py-6">
          {isShowCancelButton && (
            <Button
              className="rounded-md border-2 border-gray-200 px-6 shadow-none ring-0"
              color="light"
              disabled={isLoading}
              onClick={onClose}
            >
              {t("close")}
            </Button>
          )}
          {isShowConfirmButton && (
            <Button
              type="submit"
              className="border-primary-700 flex-1 rounded-md border-2 px-12 shadow-none ring-0 disabled:border-gray-300"
              disabled={isLoading || !isAllowSubmit}
              isLoading={isLoading}
              onClick={onConfirm}
            >
              {t("confirm")}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default memo(ModalContent);
