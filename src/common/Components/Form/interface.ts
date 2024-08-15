import { ChangeEvent, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { Control } from "react-hook-form";
import { Props } from "react-select";

import { DatePickerTypeEnum } from "@components/DatePicker";

export interface UncontrolledInputSkeletonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  name?: string;
  size?: InputSizeType;
  label?: string;
  labelPostfix?: JSX.Element | string;
  error?: string;
  inlineError?: boolean;
  isRequired?: boolean;
  isShowLabelWhenFocusing?: boolean;
  isAvailableValue?: boolean;
  isDatePicker?: boolean;
  tooltip?: ReactNode;
  classNameInput?: string;
}

export interface UncontrolledInputProps extends UncontrolledInputSkeletonProps {}

export type FormControlType = Control<any>;

export interface UncontrolledInputQuantityProps extends Omit<UncontrolledInputSkeletonProps, "onChange"> {
  onChange?: (event: ChangeEvent<HTMLInputElement> | number) => void;
}

export interface UncontrolledInputDatePickerProps
  extends Omit<UncontrolledInputSkeletonProps, "onChange" | "value" | "type" | "name"> {
  name: string;
  value?: string | string[];
  type?: DatePickerTypeEnum;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (rangeDate: Date | Date[] | null) => void;
}

export interface InputProps extends UncontrolledInputProps {
  name: string;
  control?: FormControlType;
}

export type InputSizeType = "xs" | "sm" | "normal" | "xl";

export interface InputOTPProps extends UncontrolledInputOTPProps {
  name: string;
  quantity: number;
  control?: FormControlType;
}

export interface UncontrolledInputOTPProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  quantity: number;
  size?: InputSizeType;
  error?: string;
  inlineError?: boolean;
  onChange?: (inputOTP: string) => void;
  onComplete?: (inputOTP: string) => void;
}

export interface UncontrolledStarItemProps {
  index: number;
  star: number;
  isLoading?: boolean;
  disabled?: boolean;
  starClassName?: string;
  onChange?: (value: number) => void;
}

export interface UncontrolledStarProps {
  value: number;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  starClassName?: string;
  onChange?: (value: number) => void;
}

export interface InputDatePickerProps extends UncontrolledInputDatePickerProps {
  name: string;
  control?: FormControlType;
}

export interface InputQuantityProps extends UncontrolledInputQuantityProps {
  name: string;
  control?: FormControlType;
}

export interface StarProps extends UncontrolledStarProps {
  name: string;
  control?: FormControlType;
}

export interface UncontrolledSelectProps extends Props {
  error?: string;
  classNameError?: string;
  className?: string;
  classNameSelect?: string;
  name: string;
  isRequired?: boolean;
  onExternalChange?: (newValue: unknown) => void;
  onFormatValueSelect?: (value: unknown) => string[];
}

export interface SelectProps extends UncontrolledSelectProps {
  control?: FormControlType;
}

export interface UncontrolledTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: InputSizeType;
  label?: string;
  labelPostfix?: JSX.Element | string;
  error?: string;
  inlineError?: boolean;
  isShowLabelWhenFocusing?: boolean;
  isRequired?: boolean;
  inputClassName?: string;
}

export interface TextareaProps extends UncontrolledTextareaProps {
  name: string;
  control?: FormControlType;
}

export interface UncontrolledToggleProps {
  className?: string;
  isOn?: boolean;
  isSelfControlled?: boolean;
  size?: InputSizeType;
  label?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (value: boolean) => void;
}

export interface ToggleProps extends UncontrolledToggleProps {
  control?: FormControlType;
  name?: string;
  isSelfControlled?: boolean;
}

export interface UncontrolledCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameContainer?: string;
  checkboxClassName?: string;
  indeterminate?: boolean;
  label?: ReactNode;
  name: string;
  error?: string;
  type?: string;
}

export interface CheckboxProps extends UncontrolledCheckboxProps {
  control?: FormControlType;
}
