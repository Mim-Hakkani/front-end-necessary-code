 /*
  package name : html to image 
  work : any html code output  to capture it as html image 
 */ 

import { useRef } from "react";
import { toJpeg } from "html-to-image";

function MyModal({ open, handleClose, currentUser }) {
  const qrCodeRef = useRef(null);

  const handleDownload = () => {
    if (qrCodeRef.current === null) return;

    toJpeg(qrCodeRef.current, { quality: 0.95 }) // Set image quality if desired
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "QRCode.jpg";
        link.click();
      })
      .catch((error) => {
        console.error("Could not generate QR code image", error);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* Your Modal content here */}

        <Button onClick={handleDownload}>Download QR Code</Button>

        {/* Hidden QR Code Section for Download */}
        <Box
          ref={qrCodeRef}
          sx={{
            width: "200px",
            height: "320px",
            border: "1px solid #e9e9e9",
            backgroundColor: "#fff",
            position: "absolute",
            top: "-1000px", // Position it off-screen
            left: "-1000px", // Position it off-screen
            opacity: 0, // Ensure it's not visible
          }}
        >
          <Box sx={{ ml: "30px" }}>
            <QRCode
              value={`http://www.ehsanmarketing.com/website/${currentUser?.username}`}
              size={120}
              fgColor="#45B9E0"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />

            <Typography variant="body1" sx={{ fontSize: "14px" }}>
              Name: {currentUser?.firstName} {currentUser?.firstName}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "14px" }}>
              Cin: {currentUser?.username}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "14px" }}>
              Phone:
              {currentUser?.consumers?.country?.name === "Bangladesh" &&
                "0"}
              {currentUser?.consumers?.phone}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              mt: 3,
            }}
          >
            <img src="/company.png" alt="company-image" height="30px" />
            <Typography variant="body2">Ehsan Marketing</Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

