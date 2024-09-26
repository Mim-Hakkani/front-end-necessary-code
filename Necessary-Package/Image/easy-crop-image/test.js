
import { useState } from "react";
import TestMim from "../components/TestMim";

const initData = [
  {
    id: 1,
    imageUrl: "images/root-flower.jpg",
    croppedImageUrl: null,
  },
  {
    id: 2,
    imageUrl: "images/staff.png",
    croppedImageUrl: null,
  },
  {
    id: 3,
    imageUrl: "images/seo.png",
    croppedImageUrl: null,
  },
  {
    id: 4,
    imageUrl: "images/order.png",
    croppedImageUrl: null,
  },
];

function test() {
  const [cars, setCars] = useState(initData);
  const [selectedCar, setSelectedCar] = useState(null);

  const onCancel = () => {
    setSelectedCar(null);
  };

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newCarsList = [...cars];
    const carIndex = cars.findIndex((x) => x.id === id);
    const car = cars[carIndex];
    const newCar = { ...car, croppedImageUrl, crop, zoom, aspect };
    newCarsList[carIndex] = newCar;
    setCars(newCarsList);
    setSelectedCar(null);
  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
  };


  console.log("cropped Image Url::",cars);

  return (
    <div>
      {selectedCar ? (
        <TestMim
          id={selectedCar?.id}
          imageUrl={selectedCar?.imageUrl}
          cropInit={selectedCar?.crop}
          zoomInit={selectedCar?.zoom}
          aspectInit={selectedCar?.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
        />
      ) : null}


      {cars.map((car) => (
        <div className="imageCard" key={car.id}>
          <img
            src={car.croppedImageUrl ? car.croppedImageUrl : car.imageUrl}
            alt=""
            onClick={() => {
              console.log(car);
              setSelectedCar(car);
            }}

            // style={{height:"150px"}}
          />
        </div>
      ))}

      
    </div>
  );
}

export default test;
