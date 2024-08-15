import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from "react-icons/fa6";

import { SocialDataType } from "@interfaces/Common";

import MotionPictureSocialItem from "./SocialItem";

interface MotionPictureSocialProps {
  externalIds: SocialDataType;
  homepage: string;
}

const MotionPictureSocial = ({ externalIds, homepage }: MotionPictureSocialProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-4">
      {externalIds.facebook_id && (
        <MotionPictureSocialItem
          icon={<FaFacebook size={28} />}
          content={t("visitPage", { page: t("facebook") })}
          link={`https://www.facebook.com/${externalIds.facebook_id}`}
        />
      )}
      {externalIds.instagram_id && (
        <MotionPictureSocialItem
          icon={<FaInstagram size={28} />}
          content={t("visitPage", { page: t("instagram") })}
          link={`https://www.instagram.com/${externalIds.instagram_id}`}
        />
      )}
      {externalIds.twitter_id && (
        <MotionPictureSocialItem
          icon={<FaTwitter size={28} />}
          content={t("visitPage", { page: t("twitter") })}
          link={`https://www.twitter.com/${externalIds.twitter_id}`}
        />
      )}
      {homepage && (
        <MotionPictureSocialItem
          icon={<FaLink size={28} />}
          content={t("visitPage", { page: t("homepage") })}
          link={homepage}
          className="border-l-2 border-slate-400 pl-4"
        />
      )}
    </div>
  );
};

export default memo(MotionPictureSocial);
