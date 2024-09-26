/*  package name : react profile package
    source : yt
    work : filter , flip , crop , colors ,save , reset 
    docx : https://github.com/mdjfs/react-profile

*/


import React, { useState } from 'react';
import ReactProfile, { openEditor } from "react-profile";
import "react-profile/themes/default";

const ImageFilter = () => {

   const [imagelist ,setImageList] = useState(null)
  const change = async(e)=>{
    const image = await openEditor({
      src:e.target.files[0]
    });
    console.log(image);
    setImageList(image.editedImage?.getDataURL)

  }


  return (
    <div style={{marginTop:'150px'}}>
       Image Filter 
       {/* <ReactProfile src="/images/woman.png" modules={["filter", "crop"]} /> */}

       <input type='file' accept='image/jpeg;image/png'
        onChange={change}
        />

        <img src={imagelist} />
    </div>
  );
};

export default TestMim;
