import React from 'react'
import { API } from '../../backend';

const ImageHelperOrder = ({product}) => {
    const imageURL = product ? `${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/2756845/pexels-photo-2756845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return (
        <>
        <img
          src={imageURL}
          alt="photo"
          style={{ maxHeight: "50%", maxWidth: "50%" }}
          className="mb-3 rounded m-auto"
        />
        </>
    )
}
export default ImageHelperOrder;