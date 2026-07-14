import { useState } from "react";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (

    <div
      className="
      flex
      flex-col
      lg:flex-row
      gap-5
      "
    >

      {/* Thumbnail */}

      <div
        className="
        order-2
        lg:order-1

        flex
        lg:flex-col

        gap-3

        overflow-x-auto
        lg:overflow-y-auto

        scrollbar-hide
        "
      >

        {images.map((image, index) => (

          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`
              w-20
              h-20
              rounded-xl
              border-2
              overflow-hidden
              transition

              ${
                selectedImage === image
                  ? "border-[#355E3B]"
                  : "border-gray-200"
              }
            `}
          >

            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />

          </button>

        ))}

      </div>

{/* Main Image */}

<motion.div

  layout

  className="
    order-1
    lg:order-2
    bg-white
    rounded-3xl
    overflow-hidden
    border
    w-fit
    h-fit
  "

>
<img
  src={selectedImage}
  alt=""
  className="w-full h-auto object-contain block"
/>

      </motion.div>

    </div>

  );

};

export default ProductGallery;