import React, { useState } from "react";

const ImageProperties = ({ imgUrl, setFilter ,
  applyRotationAndFilter

}) => {



  const properties = [
    { name: "Original", style: "original" },
    { name: "Cool", style: "cool" },
    { name: "Warm", style: "warm" },
    { name: "Happy", style: "happy" },
    { name: "Cinematic", style: "cinematic" },
    { name: "Black and White", style: "blackAndWhite" },
  ];

  const [selectedFilter, setSelectedFilter] = useState("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginBottom: "30px",
          marginTop: "20px",
        }}
      >
        {properties.map((property, index) => (
          <div
            key={index}
            style={{
              width: "80px",
              cursor: "pointer",
              // paddingLeft:'10px'
            }}
            onClick={() => {
        
              applyRotationAndFilter(property?.name);
              // setFilter(property.name);
              setSelectedFilter(property?.name);
              // applyRotationAndFilter();
            }}
          >
            <img
              // src={URL.createObjectURL(imgUrl) || "/images/ruby.jpg"}
              src={imgUrl || "/images/ruby.jpg"}
              alt={property.name}
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                margin: "0 auto",
                display: "block",
                border:
                  selectedFilter === property.name
                    ? "2px solid #494949"
                    : "2px solid #fff",
              }}
              className={property?.style}
            />
            <p
              style={{
                textAlign: "center",
                color: selectedFilter === property.name ? "#2b2b2b" : "#8C8D9B",
                marginTop: "4px",
                fontSize: selectedFilter === property.name ? "14px" : "14px",
              }}
            >
              {property.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageProperties;
