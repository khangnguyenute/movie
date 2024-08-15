import { memo } from "react";
import { useTranslation } from "react-i18next";

import useDocumentTitle from "@hooks/useDocumentTitle";

import Discover from "./Discover";
import Trending from "./Trending";

const Home = () => {
  const { t } = useTranslation();

  useDocumentTitle(t("home"));

  return (
    <div className="mx-auto my-8 w-full max-w-layout">
      <Trending />
      <Discover />
    </div>
  );
};

export default memo(Home);
