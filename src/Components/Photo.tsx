import React from "react";

type Props = {
  photo: any;
};
const Photo = ({ photo }: Props) => {
  return <img src={photo.urls.full} alt={photo.alt_description ? photo.alt_description : ""} />;
};

export default Photo;
