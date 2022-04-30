import React , {useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import {cartEmpty, loadCart} from  './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import {APIFront} from '../frontend';
import { createOrder } from './helper/orderHelper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import visacard from '../images/Visa_Card.png';

const StripeCheckout = ({products,setReload = f => f, reload = undefined}) => {

    const [data,setData] = useState({
        loading : false,
        success : false,
        error : "",
        address : ""
    })
    // const [link,setLink] = useState(`https://www.google.co.in/`);
    const tokenn = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
       let amount = 0;
       products.map(p => {
           amount = p.price + amount;
       });
       return amount;
    };


    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type" : "application/json"
        }
        return fetch(`${API}stripepayment`,{
            method : "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            //call  furthur methods
            const {status} = response;
               
            return response.json();
        })
        .then(data => {
            //create order after success of payment
            const orderData = {
                products : products,
                transaction_id : data.id,
                amount:data.amount
            }
            createOrder(userId,tokenn,orderData).then(data => {
                if(data.error){
                    console.log(data.error);
                    setData({error:data.error, loading:false})
                }
                else{
                    // setLink(`${APIFront}user/myorders/view/${data._id}`);
                    const link = `${APIFront}user/myorders/view/${data._id}`;
                    const CustomToastWithLink = () => (
                        <div>
                          <p>To view your order <a className='text-danger' href={`${link}`}>Click Here</a></p>
                        </div>
                    );
                    toast.info(CustomToastWithLink,{
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }
            ).then(
                () => {
                    cartEmpty(()=>{
                        // console.log("Your Order is successfull ! Cart is Empty")
                    });
                    

                    toast.success("💸 Payment Done ✔️", {
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    toast.info("🎉 Order Placed Successfully !! Your Cart is Now Empty.",{
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    
                    setReload(!reload);
                }
            )
            
            
            
        }).catch(error => console.log(error))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
                token = {makePayment}
                amount = {getFinalPrice() * 100} 
                currency="INR"
                image="https://img.icons8.com/ios/452/rupee.png" // the pop-in header image (default none)
                name = "Checkout & Pay"
                description="Secure payments"
                panelLabel="Pay"
                allowRememberMe
                shippingAddress
                billingAddress
                bitcoin
            >
                {products.length === 0 ? <button className="btn btn-danger disabled rounded" disabled>Pay Now</button> : <button className="btn btn-success rounded">Pay Now</button>}
                
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    };


    return (
        <div>
            <h3 className="text-dark pt-5 mb-5">Checkout - Amount to be paid ₹ {getFinalPrice()}</h3>
            {showStripeButton()}
            <ToastContainer position="top-right"
                autoClose={7000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            <br />
            {/* <div className='border rounded border-info'>
                <h6 className='text-center text-dark pt-3 pb-2'>For Payment use Card Details</h6>
                <hr/>
                <p className='text-danger'>Card No: 4242 4242 4242 4242 (Visa)</p>
                <p className='text-danger'>Date : 03/32 (or any future date)</p>
                <p className='text-danger'>CVC : 123</p>
            </div> */}
            <h6 className='text-center text-dark pt-3 pb-2'>For Payment Use This Card Details</h6>
            <img
                        className="d-block w-70 m-auto"
                        src={visacard}
                        alt="Visa Card"
                        height="400px"
                        />
        </div>

    )
}

export default StripeCheckout
