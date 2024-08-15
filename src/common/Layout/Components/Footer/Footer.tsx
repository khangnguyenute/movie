import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Logo } from "@components/Logo";

import paypalImage from "../../../../assets/images/footer/paypal.png";
import shape01Image from "../../../../assets/images/footer/shape_01.png";
import FooterLink from "./FooterLink";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative z-40 mx-auto max-w-layout overflow-hidden border-t-2 border-gray-100 bg-white"
      id="footer"
    >
      <div className="absolute left-0 top-4 z-0 h-full w-full">
        <div className="absolute flex h-full w-full">
          <img src={shape01Image} alt="KMovie" className="h-full w-full object-contain object-center" />
        </div>
      </div>
      <div className="relative z-10 grid gap-x-10 py-4 sm:grid-cols-2 sm:py-6 md:grid-cols-3 md:py-10">
        <div className="">
          <div className="mt-1.5">
            <Logo imageClassName="h-14" />
          </div>
          <div className="mt-6 max-w-xs font-semibold">KMovie</div>
          <div className="mt-6 sm:mt-8">
            <img src={paypalImage} alt="Paypal" />
          </div>
        </div>
        <FooterLink className="relative z-10 mt-6 grid-cols-1 xs:hidden xs:grid-cols-2 sm:mt-0 md:col-span-2 md:grid md:grid-cols-3" />
      </div>
      <div className="py-4 text-center md:text-right">&copy; KMovie 2023. {t("reserved")}</div>
    </div>
  );
};

export default memo(Footer);
