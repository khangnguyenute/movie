import { GENRE_PATH } from "@constants/routeConstant";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaListUl, FaPlay } from "react-icons/fa6";
import { PiTagSimpleFill } from "react-icons/pi";
import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";

import { ButtonTooltip } from "@components/Button";
import { BackdropImage, PosterImage } from "@components/Image";
import { Modal } from "@components/Modal";
import { ProgressBar } from "@components/Progress";
import { Title } from "@components/Title";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { GenreDataType, MovieDataType, TVShowDataType } from "@interfaces/Common";
import { formatNameToPath, getNameMotionPicture, getReleasedDateMotionPicture } from "@utils/Helpers";

interface MotionPictureOverviewProps {
  motionPicture: MovieDataType | TVShowDataType;
  mediaType: MotionPictureCategoryEnum;
}

const MotionPictureOverview = ({ motionPicture, mediaType }: MotionPictureOverviewProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const name = useMemo(() => getNameMotionPicture(motionPicture), [motionPicture]);

  const releasedDate = useMemo(() => getReleasedDateMotionPicture(motionPicture), [motionPicture]);

  const handleToggle = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const handleClickGenre = useCallback(
    (genre: GenreDataType) => {
      navigate(GENRE_PATH.MOTION_PICTURE(genre.id, formatNameToPath(genre.name), mediaType));
    },
    [mediaType, navigate],
  );

  return (
    <div className="relative py-12 text-white">
      <BackdropImage
        alt={name}
        src={motionPicture.backdrop_path}
        className="absolute inset-0 h-full w-full"
      />

      <div className="absolute inset-0 h-full w-full bg-black/70" />

      <div className="relative mx-auto w-full max-w-layout">
        <div className="grid grid-cols-4 gap-10">
          <PosterImage
            alt={name}
            src={motionPicture.poster_path}
            className="col-span-1 aspect-2/3 w-full rounded-lg"
          />

          <div className="col-span-3 my-auto flex flex-col space-y-6">
            <div>
              <Link
                to={motionPicture.homepage}
                target="_blank"
                className="text-4xl font-bold hover:text-slate-300"
              >
                {name}
                <span> ({dayjs(releasedDate).format("YYYY")})</span>
              </Link>

              <div className="mt-2 flex items-center">
                {motionPicture &&
                  motionPicture.genres.length >= 1 &&
                  motionPicture.genres.map((genre) => (
                    <div
                      key={motionPicture.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        handleClickGenre(genre);
                      }}
                      className="group italic last:mr-4 hover:text-slate-300"
                    >
                      {genre.name}
                      <span className="mr-1 group-last:hidden">,</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex items-center space-x-10">
              <div className="flex items-center">
                <ProgressBar
                  percentage={Number((motionPicture.vote_average * 10).toFixed(0))}
                  className="h-16 w-16"
                />
                <span className="font-semibold">
                  User <br />
                  Score
                </span>
              </div>

              <div className="flex items-center space-x-6">
                <ButtonTooltip label={<FaListUl />} content={t("addToList")} />
                <ButtonTooltip label={<FaHeart />} content={t("markAsFavorite")} />
                <ButtonTooltip
                  label={<PiTagSimpleFill className="rotate-90" />}
                  content={t("addToWatchList")}
                />

                {!isEmpty(motionPicture.videos.results) && (
                  <>
                    <div role="button" tabIndex={0} className="hover:text-slate-300" onClick={handleToggle}>
                      <FaPlay className="mr-2 inline-block font-semibold" />
                      {t("playTrailer")}
                    </div>
                    <Modal
                      isOpen={isOpenModal}
                      onClose={handleToggle}
                      title={t("playTrailer")}
                      isShowFooter={false}
                      isShowLine={false}
                      containerClassName="bg-black sm:w-270"
                      headerClassName="px-4 py-2 sm:px-6 sm:py-4 text-white"
                      contentContainerClassName="p-0 sm:p-0 rounded-b-lg overflow-hidden"
                    >
                      <div className="aspect-video w-full">
                        <ReactPlayer
                          playing
                          url={motionPicture.videos.results.map(
                            (video) => `https://www.youtube.com/watch?v=${video.key}`,
                          )}
                          width="100%"
                          height="100%"
                          controls
                        />
                      </div>
                    </Modal>
                  </>
                )}
              </div>
            </div>
            <Title title={t("overview")} subtitle={motionPicture.overview} titleClassname="mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MotionPictureOverview);
