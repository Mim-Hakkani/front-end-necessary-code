<Modal
          open={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          // hideBackdrop
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "450px",
              borderRadius: "8px",
              background: "#FFF",
              boxShadow: 24,
              p: 3,
              overflow: "hidden",
              outline: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 512 512"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={() => setShowOtpModal(false)}
            >
              <path
                fill="none"
                stroke="#2b2b2b"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M368 368L144 144m224 0L144 368"
              />
            </svg>

            <Typography
              variant="body1"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "30px",
                cursor: "pointer",
                color: "#44B8DE",
                fontWeight: "500",
                fontFamily: "Inter",
                fontSize: "13px",
              }}
            >
              Try another way
            </Typography>

            <Grid container sx={{}}>
              <Grid
                item
                xs={12}
                sm={5}
                xl={5}
                sx={{
                  marginTop: "8%",
                  // border:'1px solid red'
                }}
              >
                <img
                  src="/images/pin-digit.png"
                  alt="forgot-pass"
                  height={256}
                  width={256}
                  
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6.5}
                xl={6.5}
                sx={
                  {
                    // border:'1px solid red'
                  }
                }
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: "400",
                    fontSize: "30px",
                    color: "#2b2b2b",
                    width: "60%",
                    lineHeight:'35px'
                  }}
                >
                  Enter 4-digit recovery code 
                </Typography>

                <Typography
                  sx={{
                    color: "#9DA3A6",
                    fontFamily: "Inter",
                    fontSize: "13px",
                    pt: "8px",
                    pb: "30px",
                    width: "90%",
                  }}
                >
                  The recovery code was sent to your {"***" +currentUser?.consumers?.phone.slice(-3)}&nbsp;number. Please enter the code:
                </Typography>

                <Box sx={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
    }}>
      {Array(6).fill('').map((_, index) => (
        <input
          key={index}
          maxLength={1}
          style={{
            borderRadius: '10px',
            border: '1px solid #CCD1EC',
            height: '50px',
            width: '50px',
            textAlign: 'center',
            outline: 0,
            fontSize: '20px',
            color: '#2b2b2b',
          }}
          ref={(el) => (inputsRef.current[index] = el)} // Store input reference
          onChange={(e) => handleInputChange(e, index)} // Handle input change
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace navigation
        />
      ))}
    </Box>
               
              </Grid>
            </Grid>
          </Box>
        </Modal>
