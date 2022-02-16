import React from "react";
import InfiniteScroller from "./Components/InfiniteScroller";
import Sidemenu from "./Components/Sidemenu";
import PhotoModal from "./Components/PhotoModal";
import { useSelector } from "react-redux";
import { photoSelector } from "./Redux/Slices/photoSlice";

function App() {
  const { selectedPhoto } = useSelector(photoSelector);
  return (
    <div className="App">
      {selectedPhoto && <PhotoModal />}
      <Sidemenu />
      <InfiniteScroller />
    </div>
  );
}

export default App;
