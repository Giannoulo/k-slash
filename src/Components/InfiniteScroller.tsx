import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {photoSelector, getPhotos, getPhotoDetails} from "../Redux/Slices/photoSlice";
import Photo from "./Photo";
import {useParams} from "react-router-dom";

const InfiniteScroller = (): JSX.Element => {
  const {photoArray} = useSelector(photoSelector);
  const dispatch = useDispatch();
  const [photosJSX, setPhotosJSX] = useState<JSX.Element[] | null>(null);
  const targetDivRef = useRef<HTMLDivElement | null>(null);
  const [intersections, setIntersections] = useState<number>(1);

  // If there is an id param, get photo details and open modal
  const {id} = useParams();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getPhotoDetails(id));
    }
  }, [id, dispatch]);

  /*
  Get the updated JSX photo array based on the photo array 
  and how many times he has reached the bottom of the page
  */
  // TODO Add types
  useEffect(() => {
    console.log(photoArray);
    setPhotosJSX(photoArray.map((photo: any) => <Photo photo={photo} key={photo.id} />));
  }, [photoArray]);

  // Get more photos on new intersections
  useEffect(() => {
    dispatch(getPhotos(intersections));
  }, [intersections, dispatch]);

  // Add an intersection observer to target-div on mount
  useEffect(() => {
    if (targetDivRef.current) {
      const target: HTMLDivElement = targetDivRef.current; // Keep the ref in the useffect block so proper cleanup can be performed
      const options = {
        root: null,
        threshold: 0,
      };
      const handleIntersect = (entries: any) => {
        if (entries[0].isIntersecting) {
          setIntersections((prevIntersections) => prevIntersections + 1);
        }
      };
      const observer: IntersectionObserver = new IntersectionObserver(handleIntersect, options);
      observer.observe(target);
      // Remove observer on unmount
      return () => {
        observer.unobserve(target);
      };
    }
  }, []);

  return (
    <div className="image-gallery">
      {photosJSX}
      <div className="target-div" ref={targetDivRef} key="target-div"></div>
    </div>
  );
};

export default InfiniteScroller;
