// 9. Multi-line Typography & Line Clamp
// অনেক সময় আমরা চাই নির্দিষ্ট লাইনের বেশি টেক্সট না দেখাতে:

<Typography
  sx={{
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
  }}
>
  This is a long text that should be truncated after two lines...
</Typography>
