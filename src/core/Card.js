import React, {useState, useEffect} from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { AddItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({product,addToCart = true,removeFromCart = false, setReload = f => f , reload=undefined}) => {


    const [count, setCount] = useState(product.count);
    const [redirect, setRedirect] = useState(false);
    const cardTitle = product ? product.name : "A photo from pexels";
    const cardDescription = product ? product.description : "No Description";
    const cardPrice = product ? product.price : "$Not Defined";

    const AddToCart = () =>{
      toast.info('Product Added to Cart', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      AddItemToCart(product, () => setRedirect(true));
      return(
        <ToastContainer
              position="top-center"
              autoClose={4000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              />
      )
    }

    const removeFromCartToast = () => {
      toast.error('Product Removed from Cart', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return(
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
      )
    }

  const getARedirect = (redirect) => {
    if(redirect){
      return <Redirect to="/cart"/>
    }
  }

    const showAddToCart = (addToCart) => {
      
        return(
            addToCart && (
                <button
              onClick={AddToCart}
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
              Add to Cart
            </button>
            ) 
        )
    }

    const showRemoveFromCart = (removeFromCart) => (
        removeFromCart && (
            <button
              onClick={() => {
                removeItemFromCart(product._id);
                removeFromCartToast();
                setReload(!reload);
              }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
              Remove from cart
            </button>
        )
    );

  return (
    <div className="card text-dark bg-light border border-info " style={{minHeight:"100%"}}>
      <div className="card-header font-weight-bold" style={{fontSize:"20px"}}>{cardTitle}</div>
      <div className="card-body d-flex flex-column">
        {getARedirect(redirect)}
       <ImageHelper product={product} />
        <p className="lead font-weight-normal text-wrap" style={{fontSize:"18px"}}>
         {cardDescription}
        </p>
  <h3 className="btn mt-auto btn-info rounded btn-md px-4 user-select-none" >₹ {cardPrice}</h3>
        <div className="row">
          <div className="col-12">
            {showAddToCart(addToCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
