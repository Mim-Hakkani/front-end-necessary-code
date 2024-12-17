import { Box, Button, Grid, Input, Typography } from "@mui/material";
import React, { useState } from "react";

const MybKash = () => {
  const [images, setImages] = useState([null]); // Initialize with one slot

  const handleChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      // Add a new slot only if this is the last one
      if (index === images.length - 1) {
        setImages([...newImages, null]);
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#ECEFF1",
          p: "16px 15px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "500",
            fontSize: "20px",
          }}
        >
          Car Sticker
        </Typography>

        <Box
          sx={{
            backgroundColor: "#45B9E0",
            width: "156px",
            borderRadius: "4px",
            textAlign: "center",
            color: "#fff",
            py: "7px",
            cursor: "pointer",
          }}
        >
          Submit
        </Box>
      </Box>

      <Grid container spacing={2.5}>
        {images.map((image, index) => (
          <Grid item md={4} lg={4} xl={4} key={index}>
            <Box
              sx={{
                mt: "20px",
                pt: "40px",
                pb: "40px",
                backgroundColor: "#EFEFEF",
              }}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  style={{
                    width: "150px",
                    height: "150px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  alt="category-icon"
                />
              ) : (
                <img
                  src="/images/addimage.png"
                  style={{
                    width: "150px",
                    height: "150px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  alt="category-icon"
                />
              )}

              <label htmlFor={`contained-button-file-${index}`}>
                <Input
                  accept="image/*"
                  id={`contained-button-file-${index}`}
                  type="file"
                  name="photo"
                  sx={{ display: "none" }}
                  onChange={(event) => handleChange(event, index)}
                />
                <Button
                  component="span"
                  sx={{
                    border: "1px solid #D4D7DA",
                    borderRadius: "2px",
                    background: "#fff",
                    color: "#2b2b2b",
                    fontSize: "13px",
                    textTransform: "capitalize",
                    width: "150px",
                    m: "0 auto",
                    textAlign: "center",
                    display: "block",
                    mt: "10px",

                    ":hover": {
                      background: "#FFF5E9",
                    },
                  }}
                >
                  {image ? "Change Sticker" : "Upload Sticker"}
                </Button>
              </label>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MybKash;

