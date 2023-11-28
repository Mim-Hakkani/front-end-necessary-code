<Typography
variant="body1"
sx={{
  color: "#303030",
  fontSize: "15px",
  lineHeight: "24px",
  fontWeight: "600",
  margin: "8px 0px 10px 0px",
  cursor: "pointer",
 
 // here is the code 

 
  // Approximate height for 2 lines of text (adjust as needed)
  maxHeight: "66px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2, // This is specific for webkit-based browsers like Safari
  WebkitBoxOrient: "vertical",
}}

>
{item?.node?.title}
</Typography>