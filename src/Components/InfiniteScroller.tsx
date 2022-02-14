import React, { useEffect } from "react";
import Photo from "./Photo";

type Props = {
  photos: any[];
};
const InfiniteScroller = ({ photos }: Props): JSX.Element => {
  useEffect(() => {
    console.log(photos);
  }, [photos]);

  return (
    <div className="infinite-scroller">
      {photos.map((photo) => (
        <Photo photo={photo} key={photo.id} />
      ))}
    </div>
  );
};

export default InfiniteScroller;
