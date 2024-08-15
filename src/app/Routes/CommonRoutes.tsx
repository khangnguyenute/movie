import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutRoutes from "src/features/Routes/LayoutRoutes";

import ErrorRoutes from "@common/Error/Routes/ErrorRoutes";

const CommonRoutes: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<LayoutRoutes />} />
      <Route path="error/*" element={<ErrorRoutes />} />
    </Routes>
  );
};

export default memo(CommonRoutes);
