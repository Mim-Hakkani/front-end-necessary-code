import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import ImageProperties from "./test-mim/ImageProperties";
import { Box, Typography } from "@mui/material";
import getCroppedImg from "../../../../utility/CropImage";

const ImageEditor = ({ 
  imagePreview ,
  setImagePreview,
  setCroppedAreaPixels,
  setRotation,
  rotation,
  croppedAreaPixels,
  setFilterImageFile
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
 
  const [filteredImage, setFilteredImage] = useState(null);
  const [filter, setFilter] = useState("original");
  const [activeCropImage, setActiveCropImage] = useState(true);
 
  const handleActiveCropImage = (status) => {
    setActiveCropImage(status);
  };

  const onCropChange = (crop) => {
    setCrop(crop);


  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };


  useEffect(() => {
    handleImageUpload(imagePreview);
  }, [imagePreview]);

  
  const handleImageUpload = (file) => {
    // Ensure the file is a valid Blob or File object
    if (file instanceof Blob || file instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // Store the original image
        setFilteredImage(reader.result); // Initially set the filtered image to the original
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      console.error("Invalid file or Blob passed to handleImageUpload");
    }
  };

  // console.log("imagePreview:", imagePreview);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);


  }, []);

 





  const applyRotationAndFilter = (filterName) => {

   
    if (filterName.toLowerCase() === "original") {
      // If "Original" is selected, show the original image
      setFilteredImage(imageSrc);
      return;
    }


    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = filteredImage || imageSrc;

    img.onload = async() => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

  

      // Apply the selected filter
      switch (filterName.toLowerCase()) {
        case "cool":
          applyCoolFilter(data);
          break;
        case "warm":
          applyWarmFilter(data);
          break;
        case "happy":
          applyHappyFilter(data);
          break;
        case "cinematic":
          applyCinematicFilter(data);
          break;
        case "black and white":
          applyBlackAndWhiteFilter(data);
          break;
        default:
          // No filter (original image will be shown)
          break;
      }

      // Put the filtered data back on the canvas
      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas to an image URL
      const finalImage = canvas.toDataURL("image/jpeg");
      setFilteredImage(finalImage);

     


      const convertFileFromBase64 =  base64ToFile(finalImage, "convert-file-toBase");

     
   

      // filter with rotated,filter, zoom 

      const imageLink =  URL.createObjectURL(convertFileFromBase64);
      const croppedImageUrl = await getCroppedImg(imageLink, croppedAreaPixels,rotation);

      // filter image file 
      
      setFilterImageFile(croppedImageUrl)
      
    };
  };


  const applyCoolFilter = (data) => {

  
    for (let i = 0; i < data.length; i += 4) {
      // Approximate cool filter by increasing blue and decreasing red slightly
      data[i] = data[i] - 50; // Reduce red
      data[i + 1] = data[i + 1]; // Keep green unchanged
      data[i + 2] = data[i + 2] + 50; // Increase blue
    }
  };

  const applyWarmFilter = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      // Increase red and green for a warm tone
      data[i] += 40; // Red
      data[i + 1] += 20; // Green
    }
  };

  const applyHappyFilter = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      // Increase brightness and saturation
      data[i] = Math.min(data[i] + 50, 255); // Red
      data[i + 1] = Math.min(data[i + 1] + 50, 255); // Green
      data[i + 2] = Math.min(data[i + 2] + 50, 255); // Blue
    }
  };

  const applyCinematicFilter = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      // Add contrast and a slight sepia tone
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg + 20; // Red
      data[i + 1] = avg + 10; // Green
      data[i + 2] = avg - 20; // Blue
    }
  };

  const applyBlackAndWhiteFilter = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // Red
      data[i + 1] = avg; // Green
      data[i + 2] = avg; // Blue
    }
  };



  function base64ToFile(base64String, fileName) {
    try {
      // Ensure base64String is valid
      if (!base64String || !base64String.includes(',')) {
        throw new Error('Invalid base64 string');
      }
  
      // Remove the Base64 prefix (data:image/jpeg;base64,)
      const base64Data = base64String.split(',')[1];
  
      // Use Buffer to handle decoding in Node.js (Next.js) environments
      let byteArray;
      if (typeof window === 'undefined') {
        // Server-side decoding using Buffer
        byteArray = Buffer.from(base64Data, 'base64');
      } else {
        // Client-side decoding using atob()
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        byteArray = new Uint8Array(byteNumbers);
      }
  
      // Get MIME type from the Base64 string
      const mimeType = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
  
      // Create a Blob with the binary data and the MIME type
      const blob = new Blob([byteArray], { type: mimeType });
  
      // Create a File object from the Blob
      return new File([blob], fileName, { type: mimeType });
    } catch (error) {
      console.error('Error converting base64 to file:', error.message);
      return null;
    }
  }
  




  return (
    <div>
      <div>
        <div style={{ position: "relative", height: "170px" }}>
          <Cropper
            image={filteredImage || imageSrc}
            
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={ 1/1}
            cropSize={ {width: 150, height: 150} }
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* crop or filter header   */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            mt: "15px",
            ml: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "68px",
              borderBottom: activeCropImage
                ? "2px solid #109DCC"
                : "2px solid #fff",
            }}
            onClick={() => handleActiveCropImage(true)}
          >
            {/* crop svg  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" fill="none" />
              <path
                fill={activeCropImage ? "#109DCC" : "#8C8D9B"}
                d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2z"
              />
            </svg>

            <Typography
              variant="body1"
              sx={{
                ml: "3px",
                mr: "15px",
                fontWeight: activeCropImage ? "500" : "400",
                color: activeCropImage ? "#109DCC" : "#8C8D9B",
                cursor:'pointer'
              }}
            >
              Crop
            </Typography>
          </Box>

          {/* filter  */}
          <Box
            sx={{
              display: "flex",
              borderBottom: !activeCropImage
                ? "2px solid #109DCC"
                : "2px solid #fff",
            }}
            onClick={() => handleActiveCropImage(false)}
          >
            {/* filter svg  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" fill="none" />
              <path
                fill={!activeCropImage ? "#109DCC" : "#8C8D9B"}
                d="M18 8A6 6 0 1 1 6 8a6 6 0 0 1 12 0"
              />
              <path
                fill={!activeCropImage ? "#109DCC" : "#8C8D9B"}
                d="M5.033 10.783a6 6 0 1 0 8.92 4.46a7.503 7.503 0 0 1-8.92-4.46m10.354 3.911q.112.636.113 1.306c0 2.09-.855 3.982-2.235 5.342a6 6 0 0 0 5.702-10.558a7.53 7.53 0 0 1-3.58 3.91"
              />
            </svg>

            <Typography
              variant="body1"
              sx={{
                ml: "3px",
                fontWeight: !activeCropImage ? "500" : "400",
                color: !activeCropImage ? "#109DCC" : "#8C8D9B",
                cursor:'pointer'
              }}
            >
              Filter
            </Typography>
          </Box>
        </Box>

      

        {activeCropImage && (
          <Box
            sx={{
              px: "25px",
              mt: "40px",
            }}
          >
            <label
              style={{
                marginTop: "10px",

                color: "#8C8D9B",
                display: "block",
                marginLeft: "-2px",
              }}
            >
              Zoom:
            </label>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, zoom) => setZoom(zoom)}
            />
            <label
              style={{
                marginTop: "2px",

                marginLeft: "-2px",
                color: "#8C8D9B",
                display: "block",
              }}
            >
              Rotation:
            </label>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              onChange={(e, rotation) => setRotation(rotation)}
              sx={{
                mb: "5px",
              }}
            />
          </Box>
        )}
      </div>


      {/* see variant images  */}

      {!activeCropImage && (
        <ImageProperties 
        setFilter={setFilter} 
        imgUrl={imageSrc}
        applyRotationAndFilter={applyRotationAndFilter}
      
        
        />
      )}

    </div>
  );
};

export default ImageEditor;
