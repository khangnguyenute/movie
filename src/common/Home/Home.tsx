import { useTranslation } from "react-i18next";

import useDocumentTitle from "@hooks/useDocumentTitle";

interface HomeProps {
  title: string;
}

const Home = ({ title }: HomeProps) => {
  const { t } = useTranslation();

  useDocumentTitle(title);

  return <div className="flex h-fit-layout w-full items-center justify-center">{t("title")}</div>;
};

export default Home;
