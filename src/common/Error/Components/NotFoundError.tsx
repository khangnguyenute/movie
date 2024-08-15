import { MY_PATH } from "@constants/routeConstant";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@components/Button";

const NotFoundError: FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const backToHome = useCallback(() => {
    navigate(MY_PATH.HOME);
  }, [navigate]);

  return (
    <div className="relative flex h-fit-layout w-full flex-col items-center justify-center">
      <div className="flex flex-col items-start justify-center space-y-4">
        <div className="text-5xl font-semibold">404</div>
        <div className="text-xl font-semibold">{t("title")}</div>
        <div className="pb-3">{t("message")}</div>
        <Button className="rounded-full shadow-none" size="sm" onClick={backToHome}>
          {t("backToHome")}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundError;
