/* eslint-disable @typescript-eslint/no-unused-vars */
import { DEFAULT_API_DEBOUNCE_TIME } from "@constants/commonConstant";
import _, { isArray, isEmpty, isFunction } from "lodash";
import { FocusEvent, memo, useCallback, useMemo, useRef, useState } from "react";
import Select, { ActionMeta, MultiValue, StylesConfig } from "react-select";
import { twMerge } from "tailwind-merge";

import { UncontrolledSelectProps } from "../interface";
import DropdownIndicator from "./DropdownIndicator";

const UncontrolledSelect = ({
  error,
  placeholder,
  classNameError,
  classNameSelect,
  isDisabled = false,
  isRequired = false,
  isMulti,
  isLoading,
  value,
  options,
  className,
  onInputChange: onSearchInputChange,
  onChange: onChangeSelect,
  onExternalChange,
  onFormatValueSelect,
  onBlur,
  ...props
}: UncontrolledSelectProps) => {
  const [isFocusing, setIsFocusing] = useState(false);
  const borderColor = twMerge(isFocusing ? "border-blue-500 z-20" : "border-gray-100");

  const isValue = useMemo(() => (isArray(value) ? !isEmpty(value) : Boolean(value)), [value]);

  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOptions = useMemo(() => {
    if (!isValue) {
      return null;
    }

    if (isMulti) {
      return value;
    }

    return options?.find((option: unknown) => {
      if (option && typeof option === "object" && "value" in option) {
        return option.value === value;
      }

      return option === value;
    });
  }, [isMulti, isValue, options, value]);

  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      backgroundColor: isDisabled ? "border-gray-100" : "bg-white",
      border: "none",
      padding: "0px 0px 0px 2px",
      outline: "none",
      boxShadow: "none ",
      // transform: "translateX(10px)",
    }),
    multiValue: (provided) => ({
      ...provided,
      background: "#f3f4f6",
      borderRadius: "8px",
      padding: 0,
      margin: 2,
    }),
  };

  const handleChangeInputValue = _.debounce((inputValue: string, actionMeta) => {
    onSearchInputChange?.(inputValue, actionMeta);
  }, DEFAULT_API_DEBOUNCE_TIME);

  const handleChangeOnFocus = useCallback(() => {
    if (!isDisabled) setIsFocusing(true);
  }, [isDisabled]);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (!isDisabled) setIsFocusing(false);
      if (isFunction(onBlur)) onBlur(e);
    },
    [isDisabled, onBlur],
  );

  const handleChange = useCallback(
    (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
      onChangeSelect?.(newValue, actionMeta);
      if (actionMeta?.action === "select-option" && !isMulti) setIsFocusing(false);
      if (isFunction(onExternalChange)) onExternalChange(onFormatValueSelect?.(newValue));
    },
    [isMulti, onChangeSelect, onExternalChange, onFormatValueSelect],
  );

  const components = useMemo(() => ({ ...(isLoading && { DropdownIndicator }) }), [isLoading]);

  return (
    <div className={twMerge("group", className)}>
      <div
        ref={selectRef}
        className={twMerge(
          borderColor,
          "relative min-h-10 w-full rounded-lg border-2 pb-0.5 pt-1 group-focus-within:border-blue-500",
          isDisabled && "bg-gray-100",
          error && "border-red-500",
          classNameSelect,
        )}
      >
        <Select
          value={selectedOptions as MultiValue<unknown> | NonNullable<unknown>}
          options={options}
          menuIsOpen={isFocusing}
          styles={customStyles}
          onMenuOpen={handleChangeOnFocus}
          isDisabled={isDisabled}
          isMulti={isMulti}
          className="react-select"
          classNamePrefix="react-select"
          placeholder={placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          onInputChange={handleChangeInputValue}
          components={components}
          {...props}
        />
      </div>
      {error && <div className={twMerge("-mb-1.5 mt-1.5 text-sm text-red-500", classNameError)}>{error}</div>}
    </div>
  );
};
export default memo(UncontrolledSelect);
