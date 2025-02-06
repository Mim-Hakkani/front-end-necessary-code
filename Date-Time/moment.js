/* npm install moment

 👉 বর্তমান সময় দেখানো  moment().format();
 👉 নির্দিষ্ট ফরম্যাটে সময় দেখানো  moment().format("DD MM YYYY"); 
console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
 2025-02-06 12:34:56


👉 তারিখ পার্সিং (Parsing Dates) 

console.log(moment("2025-02-06").format("MMMM Do YYYY")); 
 February 6th 2025


👉 তারিখ যোগ ও বিয়োগ (Add & Subtract Dates)

   <Typography>{moment().add(7, "days").format("YYYY-MM-DD")}</Typography>
   <Typography>{moment().add(7, "month").format("YYYY-MM-DD")}</Typography>
   <Typography>{moment().add(2, "year").format("YYYY-MM-DD")}</Typography>

👉 সময় বিয়োগ করা
  <Typography>{moment().subtract(2, "year").format("YYYY-MM-DD")}</Typography>


 👉  সময়ের মধ্যে পার্থক্য নির্ণয় (Date Difference)

 const date1 = moment("2025-01-01");
 const date2 = moment("2025-02-06");

console.log(date2.diff(date1, "days")); 
// 36 (মোট ৩৬ দিন পার্থক্য)

console.log(date2.diff(date1, "weeks"));
// 5 (প্রায় ৫ সপ্তাহ পার্থক্য)

console.log(date2.diff(date1, "months"));
// 5 (প্রায় ৫ সপ্তাহ পার্থক্য)

   <Typography>Date Difference : {date2.diff(date1, "days")}</Typography>
   <Typography>Month Difference : {date2.diff(date1, "months")}</Typography>



  👉  Relative Time (Ago/From Now)

    console.log(moment("2025-02-01").fromNow());  5 days ago

👉 সময়ের মধ্যে তুলনা (Comparing Dates)
    const now = moment();
const futureDate = moment().add(5, "days");

console.log(now.isBefore(futureDate)); // true
console.log(now.isAfter(futureDate)); // false
console.log(now.isSame(moment())); // true


👉 টাইমজোন হ্যান্ডলিং (Moment-Timezone)
      npm install moment-timezone

        console.log(moment().tz("America/New_York").format());
        // 2025-02-06T06:34:56-05:00 (নিউ ইয়র্কের সময় অনুযায়ী)

👉 Unix Timestamp থেকে তারিখ বের করা

console.log(moment.unix(1707200000).format("YYYY-MM-DD HH:mm:ss"));
// 2025-02-06 12:00:00


*/

