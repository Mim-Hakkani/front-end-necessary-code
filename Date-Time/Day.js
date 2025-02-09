/*
Day.js এর গুরুত্বপূর্ণ ফাংশন ও ব্যবহার
Day.js খুবই হালকা ও দ্রুতগতির date/time লাইব্রেরি, যা Moment.js এর বিকল্প হিসেবে ব্যবহৃত হয়। নিচে সর্বাধিক ব্যবহৃত ফাংশনগুলোর তালিকা ও উদাহরণ দেওয়া হলো—

🔹 ১. বর্তমান তারিখ ও সময় পাওয়া
js
Copy
Edit
import dayjs from "dayjs";

console.log(dayjs().format()); 
// বর্তমান তারিখ ও সময় (ISO ফরম্যাট) -> "2025-02-09T14:30:00+06:00"
🔹 ২. নির্দিষ্ট তারিখ সেট করা
js
Copy
Edit
console.log(dayjs("2023-06-15").format("YYYY-MM-DD"));
// 2023-06-15
js
Copy
Edit
console.log(dayjs("2025-02-09 10:30", "YYYY-MM-DD HH:mm").format());  
// 2025-02-09T10:30:00+06:00
🔹 ৩. তারিখ থেকে নির্দিষ্ট অংশ বের করা
js
Copy
Edit
console.log(dayjs().year());      // 2025
console.log(dayjs().month());     // 1 (ফেব্রুয়ারির ইনডেক্স ০ থেকে শুরু হয়)
console.log(dayjs().date());      // 9 (দিন)
console.log(dayjs().day());       // 0 (রবিবার)
console.log(dayjs().hour());      // 14 (ঘণ্টা)
console.log(dayjs().minute());    // 30 (মিনিট)
console.log(dayjs().second());    // 0 (সেকেন্ড)
🔹 ৪. তারিখ পরিবর্তন (যোগ বা বিয়োগ করা)
js
Copy
Edit
console.log(dayjs().add(1, "year").format("YYYY-MM-DD"));
// এক বছর যোগ -> 2026-02-09

console.log(dayjs().subtract(7, "days").format("YYYY-MM-DD"));
// সাত দিন কমিয়ে -> 2025-02-02

console.log(dayjs().add(3, "months").format("YYYY-MM-DD"));
// তিন মাস যোগ -> 2025-05-09
🔹 ৫. সময় পার্থক্য বের করা
js
Copy
Edit
const start = dayjs("2025-01-01");
const end = dayjs("2025-02-09");

console.log(end.diff(start, "days")); 
// 39 দিন পার্থক্য

console.log(end.diff(start, "weeks")); 
// 5 সপ্তাহ পার্থক্য
🔹 ৬. সময় তুলনা করা (Before/After/Same)
js
Copy
Edit
const date1 = dayjs("2025-01-01");
const date2 = dayjs("2025-02-09");

console.log(date1.isBefore(date2));  // true (আগে)
console.log(date2.isAfter(date1));   // true (পরে)
console.log(date1.isSame("2025-01-01"));  // true (একই)
🔹 ৭. টাইমস্ট্যাম্প তৈরি করা
js
Copy
Edit
console.log(dayjs().unix()); 
// 1739129475 (সেকেন্ড ইউনিক্স টাইম)

console.log(dayjs().valueOf()); 
// 1739129475000 (মিলিসেকেন্ড ইউনিক্স টাইম)
🔹 ৮. নির্দিষ্ট ফরম্যাটে তারিখ বের করা
js
Copy
Edit
console.log(dayjs().format("dddd, MMMM D, YYYY h:mm A"));
// Sunday, February 9, 2025 2:30 PM
🔹 ৯. টাইমজোন পরিবর্তন করা
(এর জন্য dayjs/plugin/utc ও dayjs/plugin/timezone লাগবে)

js
Copy
Edit
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

console.log(dayjs().tz("Asia/Dhaka").format());
// 2025-02-09T14:30:00+06:00
🔹 🔟 সপ্তাহের শুরু ও শেষ বের করা
(এর জন্য dayjs/plugin/isoWeek লাগবে)

js
Copy
Edit
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

console.log(dayjs().startOf("isoWeek").format("YYYY-MM-DD"));
// চলতি সপ্তাহের শুরু -> 2025-02-03

console.log(dayjs().endOf("isoWeek").format("YYYY-MM-DD"));
// চলতি সপ্তাহের শেষ -> 2025-02-09
🔹 ১১. সময়কে Relative (Ago/In) আকারে দেখানো
(এর জন্য dayjs/plugin/relativeTime লাগবে)

js
Copy
Edit
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

console.log(dayjs().to(dayjs("2025-02-15")));
// in 6 days (আগামী ৬ দিনের মধ্যে)

console.log(dayjs("2025-02-01").fromNow());
// 8 days ago (৮ দিন আগে)
🔹 ১২. সময়কে Localized (বাংলা বা অন্য ভাষায়) দেখানো
(এর জন্য dayjs/plugin/localeData লাগবে)

js
Copy
Edit
import "dayjs/locale/bn";

console.log(dayjs().locale("bn").format("dddd, MMMM D, YYYY"));
// রবিবার, ফেব্রুয়ারি ৯, ২০২৫




১২. Day.js vs Moment.js তুলনা
Feature	Day.js	Moment.js
Size	✅ ছোট (2KB)	❌ বড় (200KB)
Performance	✅ দ্রুত	❌ ধীর
Immutable	✅ হ্যাঁ	❌ না
API Compatibility	✅ হ্যাঁ	✅ হ্যাঁ
Plugin Support	✅ হ্যাঁ	✅ হ্যাঁ
🎯 📌 সংক্ষেপে:
কাজ	কোড
বর্তমান তারিখ	dayjs().format()
নির্দিষ্ট তারিখ	dayjs("2025-02-09")
ফরম্যাট পরিবর্তন	dayjs().format("YYYY-MM-DD")
সময় যোগ করা	dayjs().add(7, "day")
সময় কমানো	dayjs().subtract(1, "year")
দুটি তারিখের পার্থক্য	date1.diff(date2, "day")
বর্তমান মাসের নাম	dayjs().format("MMMM")
সময় তুলনা	isBefore() / isAfter()
*/