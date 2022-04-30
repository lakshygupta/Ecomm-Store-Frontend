import React, {useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import {getOrdersById} from './helper/userapicalls';
import ImageHelperOrder from "../core/helper/ImageHelperOrder";
import dateFormat from 'dateformat';
import { ProgressBar } from 'react-bootstrap';

const ViewOrders = ({ match }) => {

    const [orders, setOrders] = useState([]);
    const {user,token} = isAuthenticated();
    const [now, setNow] = useState(0);
    const [len,setLen] = useState(0);


    const preload = (orderId) => {
        getOrdersById(orderId)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setOrders(data);
                setLen(data.products.length)
                if(data.status === "Recieved"){
                    setNow(25);
                }else if(data.status === 'Processing'){
                    setNow(50)
                }else if(data.status === 'Shipped'){
                    setNow(75)
                }else if(data.status === 'Delivered'){
                    setNow(100)
                }
            }
        })
    };
    useEffect(() => {
        preload(match.params.orderId);
      }, []);
    
      function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
      
    return (
        
        <Base
        title="Completed Orders"
        >
        <p className='text-dark d-flex justify-content-center align-items-center' style={{fontSize:"30px"}}>Your Order</p>
        <div className='row bg-light border border-success'>
        
        <div className='col-12'>
        <div className='row mt-3'>
        <div className='col-6'>
            <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Order Id : <strong><span className="text-info" style={{fontSize:"20px"}}>{'#'}{orders._id}</span></strong>
            </label>
        </div>
        <div className='col-6'>
            <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Order Status Updated At : <strong><span className="text-secondary" style={{fontSize:"20px"}}>{dateFormat(orders.updatedAt,"mmmm dS, yyyy, h:mm TT")}</span></strong>
            </label>
        </div>
        </div>

        <div className='row mt-3'>
        <div className='col-6'>
        <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Order Date : <strong><span className="text-secondary" style={{fontSize:"20px"}}>{dateFormat(orders.createdAt,"mmmm dS, yyyy")}</span></strong>
            </label>
        </div>
        <div className='col-6'>
        <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Track shipment : <strong><span className="text-primary" style={{fontSize:"20px"}}>{'#Ecomm_'}{makeid(10)}</span></strong>
            </label>
        </div>
        </div>


        <br/>
        <br/>
        <div className='row'>
            <div className='col-12'>
                <ProgressBar animated variant="success" now={now} label={`${orders.status}`} />
            </div>
        </div>
        <div className='row'>
        <div className='col-3'>
            <p className='text-center text-dark'>Recieved</p>
        </div>
        <div className='col-3'>
            <p className='text-center text-dark'>Processing</p>
        </div>
        <div className='col-3'>
            <p className='text-center text-dark'>Shipped</p>
        </div>
        <div className='col-3'>
            <p className='text-center text-dark'>Delivered</p>
        </div>
        </div>
        </div>
        <br/>
            <br/>
        <h4 className='col-12 d-flex align-items-center justify-content-center text-dark pt-3 mb-3'>Shipment Details</h4>
            <br/>

        <div className='col-12 mt-3'>
            <div className='row text-center d-flex justify-content-center'>
            {orders.products?.map((product,index)=> {  
                return(<div className='col-md-4 mb-2'>
                    <div key={index} className="card text-dark bg-light border border-info mb-2" style={{minHeight:"100%"}}>
                    <div className="card-header font-weight-bold" style={{fontSize:"18px"}}>{product.name}</div>
                    <div className="card-body d-flex flex-column" >
                    <ImageHelperOrder product={product}/>
                    <h3 className="btn mt-auto btn-info rounded btn-md user-select-none" >₹ {product.price}</h3>
                    </div>
                    </div>
                </div>);

            })}
            </div>
        </div> 
        
        

        <div className='col-12'>
        <h4 className='col-12 d-flex align-items-center justify-content-center text-dark pt-3 mb-3'>Payment information</h4>

            <div className='row border rounded border-success m-4'>
                <div className='col-11'>
                <label className='text-left text-dark ml-5' style={{fontSize:"20px"}}><strong>Payment Method : </strong><span className="text-dark" style={{fontSize:"20px"}}>Online Credit/Debit Card</span>
                </label>
                </div>
                <div className='col-11'>
                <label className='text-left text-dark ml-5' style={{fontSize:"20px"}}><strong>Billing Address : </strong><span className="text-dark" style={{fontSize:"20px"}}>{user.address}</span>
                </label>
                </div>
            </div>
        </div>

        <div className='col-12'>
        <h4 className='col-12 d-flex align-items-center justify-content-center text-dark pt-3 mb-3'>Shipping Address</h4>

            <div className='row border rounded border-success m-4'>
                <div className='col-11'>
                <label className='text-left text-dark ml-5' style={{fontSize:"20px"}}><span className="text-dark" style={{fontSize:"20px"}}>{user.address}</span>
                </label>
                </div>
            </div>
        </div>

        <div className='col-12'>
            <div className='row mb-3 mt-3'>
                <div className='col-12'>
                {/* <hr  style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .1,
                    borderColor : '#000000'
                }}/> */}
                <label className='text-dark d-flex align-items-center justify-content-center ml-5' style={{fontSize:"25px"}}> <strong>Total Amount Paid :</strong> <strong><span className="text-success" style={{fontSize:"30px"}}> &nbsp; ₹ {orders.amount}</span></strong><span style={{fontSize:"19px"}}>&nbsp;&nbsp;{len>1 ? `(${len} items)`: `(${len} item)`}</span>
                </label>
                <hr  style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .1,
                    borderColor : '#000000'
                }}/>
                </div>
            </div>
        
        </div>

        </div>
        </Base>

    )
}
export default ViewOrders;