import unsplashInstance from "./axiosConfig";

export const getPhotos = async (page) => {
  try {
    const response = await unsplashInstance.get(`/photos?per_page=30?page=${page}`);
    return response.data;
  } catch (error) {
    alert(error);
  }
};
