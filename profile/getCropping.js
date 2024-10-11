// canvasUtils.js
export default async function getCroppedImg(imageSrc, pixelCrop) {

    console.log("Pixel crop values:", pixelCrop);
    const image = await createImage(imageSrc);
    console.log("Loaded image:", image);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
   

    return  new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            console.log("Blob created:", file);
            if (file) {
                resolve(URL.createObjectURL(file));
            } else {
                reject(new Error("Canvas is empty"));
            }
        }, 'image/jpeg');
  })
  
  function createImage(url) {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        resolve(image);
      };
    });
  }
}