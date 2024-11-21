<TextField
        placeholder="৳0"
        variant="outlined"
        sx={{
          width: "300px",
          "& .MuiInputBase-input": {
            textAlign: "center", // Center-align the text inside the input
          },
          "& .MuiInputBase-input": {
            textAlign: "center", // Center-align the text
          },
          "& .MuiInput-underline:before, & .MuiInput-underline:after": {
            borderBottom: "none", // Remove bottom border for 'standard'
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", // Remove border for 'outlined'
            },
          },
          "& .MuiInputBase-root": {
            outline: "none", // Remove outline on focus
          },
          "& input::placeholder": {
            fontFamily: "Inter",
            fontSize: "26px!important",
          
          },

        }}
      />
