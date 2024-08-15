import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import {
  MotionPictureCreditDetail,
  MotionPictureDetail,
  MotionPictureMediaDetail,
  MotionPictureReviewDetail,
} from "../Detail/MotionPicture";
import { MotionPictureManagement } from "../MotionPicture";

const MovieRoutes = () => {
  return (
    <Routes>
      <Route path="detail/:id" element={<MotionPictureDetail />} />
      <Route path="detail/:id/credit" element={<MotionPictureCreditDetail />} />
      <Route path="detail/:id/review" element={<MotionPictureReviewDetail />} />
      <Route path="detail/:id/:media" element={<MotionPictureMediaDetail />} />
      <Route path=":type" element={<MotionPictureManagement />} />
      <Route path="*" element={<MotionPictureManagement />} />
    </Routes>
  );
};

export default memo(MovieRoutes);
