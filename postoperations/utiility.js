// utility.js
export const getCroppedImg2 = async (imageSrc, pixelCrop) => {

    console.log('Drawing image with crop:', pixelCrop);

    // Validate pixelCrop values
    if (pixelCrop.width <= 0 || pixelCrop.height <= 0) {
        throw new Error("Invalid cropping dimensions");
    }

    const image = await createImage(imageSrc);
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

    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file));
            } else {
                reject(new Error("Canvas is empty"));
            }
        }, 'image/jpeg');
    });
};

function createImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            reject(new Error("Failed to load image"));
        };
    });
}
