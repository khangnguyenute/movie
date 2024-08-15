import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiAlertTriangle } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { ConfirmationModalWarningProps } from "./interface";

const ConfirmationModalWarning = ({ message, status }: ConfirmationModalWarningProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={twMerge(
        "mt-6 w-full rounded-md border-l-8 border-orange-300 bg-orange-100 p-4",
        status === "danger" && "border-primary-300 bg-primary-300",
      )}
    >
      <div className="flex">
        <div className="tetx-lg mr-4 flex-shrink-0">
          <FiAlertTriangle
            size={24}
            className={twMerge("text-orange-500", status === "danger" && "text-primary-500")}
          />
        </div>
        <div>
          {status === "danger" && <div className="text-primary-500 font-bold">{t("error")}</div>}
          {status !== "danger" && <div className="font-bold text-orange-500">{t("warning")}</div>}
          <div
            className={twMerge(
              "mb-0.5 mt-1.5 w-full text-sm font-medium text-orange-500",
              status === "danger" && "text-primary-500",
            )}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmationModalWarning);
