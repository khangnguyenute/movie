import { HTMLAttributes } from "react";

import { ComponentStatusType } from "@components/interface";

export interface ModalProps extends ModalContentProps {
  isOpen: boolean;
  isFormModal?: boolean;
  containerClassName?: string;
}

export interface ModalContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  isShowLine?: boolean;
  isShowHeader?: boolean;
  isShowFooter?: boolean;
  isAllowSubmit?: boolean;
  isLoading?: boolean;
  headerClassName?: string;
  contentContainerClassName?: string;
  title?: string | JSX.Element;
  isShowCancelButton?: boolean;
  isShowConfirmButton?: boolean;
  onClose: VoidFunction;
  onConfirm?: VoidFunction;
}

export interface ConfirmationModalProps extends Omit<ModalProps, "title">, ConfirmationModalTitleProps {
  message: string | JSX.Element;
  status?: ComponentStatusType;
  cancelButtonText?: string;
  confirmButtonText?: string;
  warningMessage?: string;
  isSubmitting?: boolean;
  isShowCancelButton?: boolean;
  isShowConfirmButton?: boolean;
  onConfirm?: () => void | Promise<void> | Promise<unknown>;
}

export interface ConfirmationModalTitleProps {
  title: string;
  status?: ComponentStatusType;
}

export interface ConfirmationModalWarningProps {
  message?: string | null;
  status: ComponentStatusType;
}
