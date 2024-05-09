export const imageUpload = async (image: any) => {
  console.log(image, "imageeeeeeeeee");

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", 'dj20wozt');
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dbzl80gon/image/upload`,
      {
        method: "post",
        body: formData,
      }
    );
    const urlData = await res.json();
    if (urlData.format === "jpg" || urlData.format === "png" || urlData.format === 'jpeg') {
      return urlData.url;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
