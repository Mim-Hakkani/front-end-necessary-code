/*

Box কী এবং কিভাবে কাজ করে।
sx প্রপ দিয়ে কাস্টমাইজ করা।
Flexbox এবং Grid ব্যবহার।
Box-এ রেসপন্সিভ ডিজাইন।
Hover Effect এবং boxShadow।

1. Box হলো একটি ডিফল্ট div টাইপের কন্টেইনার, যেটি Material UI-এর system API ব্যবহার করে CSS প্রপার্টি সেট করতে দেয়। এটি রেসপন্সিভ ডিজাইন তৈরি করতেও কাজে লাগে।

2.  all style in css is support 
<Box sx={{color:"red" }}>THis is the red div</Box>

3. Flexbox ব্যবহার।

 <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="lightblue">
      <Box bgcolor="white" p={3} borderRadius={2} boxShadow={3}>
        এটা Flexbox দিয়ে সেন্টার করা
      </Box>
    </Box>

4. Grid ব্যবহার।

     <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} p={3}>
      <Box bgcolor="primary.light" p={2} borderRadius={1}>Box 1</Box>
      <Box bgcolor="secondary.light" p={2} borderRadius={1}>Box 2</Box>
      <Box bgcolor="error.light" p={2} borderRadius={1}>Box 3</Box>
    </Box>

5.Box-এ রেসপন্সিভ ডিজাইন
     <Box
      sx={{
        width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
        bgcolor: "success.main",
        color: "white",
        p: 3,
        textAlign: "center",
      }}
    >
      এটি একটি রেসপন্সিভ বক্স
    </Box>

    ৬. Box-এ Custom CSS & Shadow

    <Box
      sx={{
        width: "300px",
        height: "200px",
        bgcolor: "warning.main",
        border: "2px solid black",
        borderRadius: "10px",
        boxShadow: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      স্টাইলড বক্স
    </Box>

    Material UI Box কম্পোনেন্ট দিয়ে আপনি:

sx প্রপ ব্যবহার করে সহজেই স্টাইল করতে পারেন।
Flexbox এবং Grid Layout তৈরি করতে পারেন।
Hover, Active, এবং Custom Animation যোগ করতে পারেন।
Custom Breakpoints দিয়ে Responsive Design করতে পারেন।


*/




<Box display="flex" jus>THis is the red div</Box>