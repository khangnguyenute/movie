import { ReactNode, cloneElement, memo } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiTwitter, FiYoutube } from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IconBaseProps } from "react-icons/lib";
import { RiSoundcloudLine, RiTelegramLine } from "react-icons/ri";

export interface SocialIconsProps extends IconBaseProps {
  hostname: string;
  children?: ReactNode;
}

const SocialIcons = ({ hostname, children, ...props }: SocialIconsProps) => {
  const icons = {
    facebook: <FiFacebook />,
    youtube: <FiYoutube />,
    gmail: <FiMail />,
    twitter: <FiTwitter />,
    instagram: <FiInstagram />,
    soundcloud: <RiSoundcloudLine />,
    linkedin: <FiLinkedin />,
    whatsapp: <AiOutlineWhatsApp />,
    telegram: <RiTelegramLine />,
    default: <HiOutlineGlobeAlt />,
  };

  return cloneElement(icons[hostname as keyof typeof icons] || icons.default, { ...props }, children);
};

export default memo(SocialIcons);
