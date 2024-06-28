export const VideoUpload = async (video: any) => {

  const formData = new FormData();
  formData.append("file", video);
  formData.append("upload_preset", "dj20wozt");
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dbzl80gon/video/upload`,
      {
        method: "post",
        body: formData,
      }
    );
    const urlData = await res.json();

    return urlData.url;
  } catch (err) {
    console.error(err);
  }
};
