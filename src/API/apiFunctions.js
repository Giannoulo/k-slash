import unsplashInstance from "./axiosConfig";

export const getPhotos = async () => {
  try {
    const response = await unsplashInstance.get("/photos");
    return response.data;
  } catch (error) {
    alert(error);
  }
};
