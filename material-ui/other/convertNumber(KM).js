// if number show 4500 then 4.5K 
// if number show 450000 then 4.5M

function formatNumber(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      return number.toString();
    }
  }


  // component code uisng material ui 
  
    <Typography variant="h6" sx={{fontSize:'18px'}}>
        {/* api  */}
            {formatNumber(shopData?.shopSlug.followerCount)}
            {/* {formatNumber(4500)}  show 4.5K */}
    </Typography>
