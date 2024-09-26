const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // to avoid cross-origin issues
      image.src = url;
    });
  
  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }
  
  /**
   * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
   * @param {string} imageSrc - Image File URL
   * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
   * @param {number} rotation - optional rotation parameter
   * @param {string} backgroundColor - "transparent" or "white" (defaults to transparent)
   */
  export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0, backgroundColor = 'transparent') {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  
    // Set canvas dimensions for rotation without clipping
    canvas.width = safeArea;
    canvas.height = safeArea;
  
    // If background color is white, fill the canvas with white
    if (backgroundColor === 'white') {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  
    // Translate canvas context and rotate
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);
  
    // Draw the rotated image
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);
  
    // Set canvas to final crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    // If background color is white, fill the canvas with white again (final cropped area)
    if (backgroundColor === 'white') {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  
    // Draw the cropped image
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );
  
    // Return the image as a File instead of a Blob or URL
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          // Convert Blob to File
          const file = new File([blob], "cropped-image.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(file);
        }
      }, "image/jpeg");
    });
  }
  