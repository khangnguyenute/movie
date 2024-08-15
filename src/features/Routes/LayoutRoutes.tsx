import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "@common/Layout";

import { Collection } from "../Collection";
import { PersonDetail } from "../Detail/Person";
import { Home } from "../Home";
import { GenreManagement, KeywordManagement } from "../MotionPicture";
import { PersonManagement } from "../Person";
import { Search } from "../Search";
import MotionPictureRoutes from "./MotionPictureRoutes";

const LayoutRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="person" element={<PersonManagement />} />
        <Route path="person/:id" element={<PersonDetail />} />
        <Route path="genre/:genreId/:category" element={<GenreManagement />} />
        <Route path="keyword/:keywordId/:category" element={<KeywordManagement />} />
        <Route path="search/:category" element={<Search />} />
        <Route path="collection/:id" element={<Collection />} />
        <Route path=":category/*" element={<MotionPictureRoutes />} />
      </Routes>
    </Layout>
  );
};

export default memo(LayoutRoutes);
