export const ImageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    
    formData.append("file", item);
    formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);
    formData.append("public_id", item.name);

    const res = await fetch(process.env.CLOUDINARY_API, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return imgArr;
};
