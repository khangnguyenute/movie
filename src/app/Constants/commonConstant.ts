export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_API_DEBOUNCE_TIME = 800;
export const DEFAULT_PAGE_LANGUAGE = "en";
export const DEFAULT_STAR = 10;

export const LINK_PATH = {
  IMAGE_HEIGHT_PATH: (path: string) => `https://image.tmdb.org/t/p/w220_and_h330_face/${path}`,
  IMAGE_WIDTH_PATH: (path: string) => `https://image.tmdb.org/t/p/w533_and_h300_bestv2/${path}`,
  IMAGE_ORIGINAL_PATH: (path: string) => `https://image.tmdb.org/t/p/original/${path}`,
  IMAGE_AVATAR_PATH: (path: string) => `https://image.tmdb.org/t/p/w66_and_h66_face/${path}`,
  NETWORK_PATH: (path: string) => `https://image.tmdb.org/t/p/h30/${path}`,
  FACEBOOK_PATH: (path: string) => `https://www.facebook.com/${path}`,
  INSTAGRAM_PATH: (path: string) => `https://www.instagram.com/${path}`,
  TWITTER_PATH: (path: string) => `https://www.instagram.com/${path}`,
};
