<TextField
  placeholder="Mobile Number"
  fullWidth
  type="number"
  size="small"
  required
  value={formData[index]?.mobileNo || ""}
  onChange={(e) => handleInputChange(index, "mobileNo", e.target.value)}
  sx={{
    "& input::placeholder": {
      fontFamily: "Inter",
      fontSize: "13px",
      opacity: 1,
      color: "#9d9d9d",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none", // Remove the border
      },
    },

    input: {
      color: "#2b2b2b",
      fontSize: "13.5px",
      fontFamily: "Inter",
      height: "18px",
      paddingLeft: "10px!important",
      
      // remove hover increment and decrement icon 
      
      MozAppearance: "textfield",  // For Firefox to remove spinner
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  }}
/>
