import React from 'react'
import { API } from '../../backend';

const ImageHelper = ({product}) => {
    const imageURL = product ? `${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/2756845/pexels-photo-2756845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return (
        <div className="rounded border border-secondary p-2">
        <img
          src={imageURL}
          alt="photo"
          style={{ maxHeight: "50%", maxWidth: "50%" }}
          className="mb-3 rounded"
        />
      </div>
    )
}
export default ImageHelper;