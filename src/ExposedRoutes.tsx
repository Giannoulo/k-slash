import React from "react";
import {Routes, Route} from "react-router-dom";

// Components
import Favorites from "./Components/Favorites";
import InfiniteScroller from "./Components/InfiniteScroller";

const ExposedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InfiniteScroller />} />
      <Route path="/photo/:id" element={<InfiniteScroller />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
};

export default ExposedRoutes;
