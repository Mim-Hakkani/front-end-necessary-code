 <Box>
      {/* 2. Variant ব্যবহার
                MUI-এর Typography কম্পোনেন্টের variant প্রপার্টির মাধ্যমে বিভিন্ন ধরনের টেক্সট স্টাইল ব্যবহার করা যায়।

                Variant	Usage
                h1	সবচেয়ে বড় হেডিং (32px বা তার বেশি)
                h2	দ্বিতীয় বড় হেডিং (24px - 30px)
                h3	মাঝারি হেডিং
                h4	অপেক্ষাকৃত ছোট হেডিং
                h5	আরও ছোট হেডিং
                h6	সবচেয়ে ছোট হেডিং
                subtitle1	সাবটাইটেল (সাধারণত 16px)
                subtitle2	ছোট সাবটাইটেল (14px)
                body1	সাধারণ টেক্সট (প্যারাগ্রাফ, 16px)
                body2	ছোট সাধারণ টেক্সট (14px)
                button	বাটনের জন্য উপযোগী টেক্সট
                caption	ছবির নিচে ক্যাপশন (ছোট টেক্সট)
                overline	ছোট ওভারলাইন টেক্সট (আন্ডারলাইন করা) */}

      <Typography variant="body1">body1</Typography>
      <Typography variant="body2">body2</Typography>
      <Typography variant="caption">Caption</Typography>
      <Typography variant="h1">Header h1</Typography>
      <Typography variant="h2">Header h2</Typography>
      <Typography variant="h3">Header h3</Typography>
      <Typography variant="h4">Header h4</Typography>
      <Typography variant="h5">Header h5</Typography>
      <Typography variant="h6">Header h6</Typography>
      <Typography variant="subtitle1">subtitle 1</Typography>
      <Typography variant="subtitle2">subtitle 2</Typography>
      <Typography variant="button">button</Typography>
      <Typography variant="overline">overline</Typography>

      {/* Custom Styling (sx prop ও inline CSS)  */}

      <Typography variant="h4" sx={{ color: "blue", fontWeight: "bold" }}>
        Customized Typography
      </Typography>

      {/* অথবা style ব্যবহার করতে পারেন:  */}

      <Typography variant="h4" style={{ color: "red", fontWeight: "bold" }}>
        Customized Typography
      </Typography>

      {/* align props ব্যবহার করতে পারেন:  

'center'
| 'inherit'
| 'justify'
| 'left'
| 'right'

*/}

      <Typography
        variant="h5"
        style={{ color: "red", fontWeight: "bold" }}
        align="right"
      >
        Customized Typography
      </Typography>

      {/* when typography used as a children 

সাধারণ টেক্সট: সরাসরি লেখা দেওয়া যায়।  <Typography>mim </Typography>

HTML Elements: strong, em, span ইত্যাদি ব্যবহার করা যায়। 
<Typography>
  <strong>Hakkni</strong>
  <br/>
  <span>mim</span> 
</Typography>

JS Variables: স্টেট বা ভ্যারিয়েবল পাঠানো যায়।
<Typgraphy>{mim}</Typgraphy>
Custom Components: আলাদা কম্পোনেন্ট পাঠানো যায়।
<Typopgraphy> <Haani /> </Typopgraphy>
Multiple Elements: Fragment (<> </>) ব্যবহার করা যায়।
<Typography>
    <> 
    <p>Mim</p>
    <p> sdsd</p>
    </>
</Typography>

*/}

      {/* color : 
'primary'
| 'secondary'
| 'success'
| 'error'
| 'info'
| 'warning'
| 'textPrimary'
| 'textSecondary'
| 'textDisabled'
| string
*/}
      <Typography color="primary">primary</Typography>
      <Typography color="secondary">secondary</Typography>
      <Typography color="success">success</Typography>
      <Typography color="error">error</Typography>
      <Typography color="info">info</Typography>
      <Typography color="warning">warning</Typography>
      <Typography color="textPrimary">textPrimary</Typography>
      <Typography color="textSecondary">textSecondary</Typography>
      <Typography color="textDisabled">textDisabled</Typography>

      <Typography color="#ccc">ccc hex color </Typography>

      <Typography>
        component প্রপস ব্যবহার করলে Typography কম্পোনেন্টকে যেকোনো HTML
        এলিমেন্ট বা React কম্পোনেন্টের মতো আচরণ করানো যায়।
      </Typography>

      <Typography variant="h4" component="h6">
        component ব্যবহার করে Typography কে যেকোনো HTML ট্যাগ বা কাস্টম
        কম্পোনেন্ট বানানো যায়। <br />
        ✅ variant শুধু স্টাইল পরিবর্তন করে, কিন্তু component HTML স্ট্রাকচার
        পরিবর্তন করে। <br />
        ✅ SEO এবং অ্যাক্সেসিবিলিটির জন্য component সঠিকভাবে ব্যবহার করা উচিত।{" "}
        <br />
      </Typography>

      <div>
        <Typography color="#2b2b2b">
          MUI-এর Typography কম্পোনেন্টের gutterBottom একটি বুলিয়ান (Boolean)
          প্রপস, যা টেক্সটের নিচে কিছু margin-bottom (স্পেস) যোগ করে। এটি
          সাধারণত একটি ব্লক এলিমেন্টের পরবর্তী কনটেন্ট থেকে কিছু দূরত্ব রাখতে
          ব্যবহার করা হয়।
        </Typography>
        <Typography variant="h4" gutterBottom>
          This is a Heading with gutterBottom
        </Typography>
        <Typography variant="body1">
          This paragraph appears below with some spacing.
        </Typography>
      </div>

      <Typography variant="body1">
        {" "}
        MUI-এর Typography কম্পোনেন্টের noWrap একটি Boolean প্রপস, যা লম্বা
        টেক্সটকে এক লাইনে রাখতে বাধ্য করে এবং লাইন ব্রেক বা ওয়ার্ড র‍্যাপিং
        বন্ধ করে। যদি টেক্সট কন্টেইনারের চেয়ে বড় হয়, তাহলে এটি overflow হয়ে
        কাট হয়ে যাবে বা ellipsis (...) ব্যবহার করে সংক্ষেপিত হবে (যদি উপযুক্ত
        CSS ব্যবহার করা হয়)।
      </Typography>

      <div style={{ width: "200px", border: "1px solid black" }}>
        <Typography variant="h6" noWrap>
          This is a long text that will not wrap to the next line.
        </Typography>
      </div>


 <Typography variant="h6" mt={2}> 1. sx হিসাবে object ব্যবহার করা
এই পদ্ধতিটি সবচেয়ে বেশি ব্যবহৃত হয়, যেখানে sx একটি স্টাইল অবজেক্ট নেয়।
</Typography>
<Typography sx={{ color: "blue", fontSize: "20px", fontWeight: "bold" }}>
  Styled with object
</Typography>

{/* sx হিসাবে function ব্যবহার করা  */}

<Typography
  sx={(theme) => ({
    color: theme.palette.error.main,
    fontSize: theme.spacing(3),
  })}
>
  Styled with function
</Typography>


{/* sx হিসাবে boolean (true/false) ব্যবহার করা  */}

<Typography sx={[true && { color: "green" }, false && { fontSize: "30px" }]}>
  Styled with boolean condition
</Typography>


<Typography>sx হিসাবে Array func, object, bool ব্যবহার করা
</Typography>

<Typography
  sx={[
    { color: "red" }, // প্রথমে এটি প্রয়োগ হবে
    (theme) => ({ fontSize: theme.spacing(4) }), // এরপর এটি
    true && { fontWeight: "bold" }, // এটি কার্যকর হবে কারণ `true`
  ]}
>
  Styled with array
</Typography>
<Typography variant="body1">Css : 
    .MuiTypography-root , 
    .MuiTypography-variantName
    
    </Typography>







    </Box>
