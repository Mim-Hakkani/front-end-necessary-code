/* Hide scrollbar for Chrome, Safari and Opera */
.example::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}



 /******************************** scroll bar height and color  ****************************
 
 
    "&::-webkit-scrollbar": {
      height: "25px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
