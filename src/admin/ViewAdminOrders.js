import React, {useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import {getOrdersById,getAllUsers,updateOrderStatus} from './helper/adminapicall';
import ImageHelperOrder from "../core/helper/ImageHelperOrder";
import dateFormat from 'dateformat';
import { ProgressBar } from 'react-bootstrap';

const ViewAdminOrders = ({ match }) => {

    const [orders, setOrders] = useState([]);
    const {user,token} = isAuthenticated();
    const [users, setUsers] = useState([]);
    const [now, setNow] = useState(0);
    const [variant, setVariant] = useState("success");
    const [len,setLen] = useState(0);
    const [drop, setDrop] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const preload = (orderId) => {
        getOrdersById(orderId)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setOrders(data);
                setLen(data.products.length)
                setDrop(data.status);
                if(data.status === "Recieved"){
                    setNow(25);
                    setVariant("success");
                }else if(data.status === 'Processing'){
                    setNow(50);
                    setVariant("warning");
                }else if(data.status === 'Shipped'){
                    setNow(75);
                    setVariant("danger");
                }else if(data.status === 'Delivered'){
                    setNow(100);
                    setVariant("primary");
                }
            }
        })
        getAllUsers(user._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setUsers(data);
            }
        })
    };
    useEffect(() => {
        preload(match.params.orderId);
      }, []);

      const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
    
        //backend request fired
        updateOrderStatus(match.params.orderId, user._id, token, drop) //ye {name} is the category ka naam aur adminapicall me humne use stringify kia hai to normally ni bhej skte
          .then((data) => {
            if (data.error) {
              setError(true);
            } else {
              setError("");
              setSuccess("true");
            }
          })
          .catch((err) => console.log(err));
      };

      const handleChange = (e) => {
        setError("");
        setDrop(e.target.value);
        if(e.target.value === "Recieved"){
            setNow(25);
            setVariant("success");
        }else if(e.target.value === 'Processing'){
            setNow(50);
            setVariant("warning");
        }else if(e.target.value === 'Shipped'){
            setNow(75);
            setVariant("danger");
        }else if(e.target.value === 'Delivered'){
            setNow(100);
            setVariant("primary");
        }
      }


      const successMessage = () => {
        if (success) {
          return <h6 className="text-success">Order Status updated successfully 🎉</h6>;
        }
      };
    
      const warningMessage = () => {
        if (error) {
          return (
            <h6 className="text-success">Try Again! Failed to update Order Status 😵</h6>
          );
        }
      };


    return (
        
        <Base
        title="Completed Orders"
        >
        <p className='text-dark d-flex justify-content-center align-items-center' style={{fontSize:"30px"}}>View Order</p>
        <div className='row bg-light border border-success'>
        
        <div className='col-12'>
        <div className='row mt-3'>
        <div className='col-12'>
        <div className='border rounded border-success m-4'>
        <h4 className='col-12 d-flex align-items-center justify-content-center text-dark pt-3 mb-3'>Order information</h4>

            <div className='row'>
            <div className='col-6'>
            <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Order Id : <strong><span className="text-info" style={{fontSize:"20px"}}>{'#'}{orders._id}</span></strong>
            </label>
        </div>
        <div className='col-6'>
        <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Order Date : <strong><span className="text-secondary" style={{fontSize:"20px"}}>{dateFormat(orders.createdAt,"mmmm dS, yyyy")}</span></strong>
            </label>
        </div>
            </div>

        <div className='row'>
            <div className='col-6'>
            <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Stripe Payment Transaction Id : <strong><span className="text-info" style={{fontSize:"20px"}}>{'#'}{orders.transaction_id}</span></strong>
            </label>
            </div>
        </div>
        </div>
        </div>
        
        </div>


        <div className='row mt-3'>
        <div className='col-12'>
        <div className='border rounded border-success m-4'>
        <h4 className='col-12 d-flex align-items-center justify-content-center text-dark pt-3 mb-3'>Customer information</h4>

        <div className='row mt-3'>
        <div className='col-6'>
            <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Customer Name : <strong><span className="text-primary" style={{fontSize:"20px"}}>{users.find(({_id})=> _id === orders.user )?.name}</span></strong>
            </label>
        </div>
        <div className='col-6'>
        <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Customer Email : <strong><span className="text-primary" style={{fontSize:"20px"}}>{users.find(({_id})=> _id === orders.user )?.email}</span></strong>
            </label>
        </div>
        </div>

        <div className='row'>
            <div className='col-6'>
            <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}>Customer Phone No : <strong><span className="text-primary" style={{fontSize:"20px"}}>{users.find(({_id})=> _id === orders.user )?.phoneno}</span></strong>
            </label>
            </div>
        </div>
        </div>
        </div>
        
        </div>
        </div>

        <div className='col-12'>

            <div className='row border rounded border-success m-4'>
        <h4 className='col-12 d-flex align-items-center justify-content-center text-dark pt-3 mb-3'>Payment information</h4>

                <div className='col-11'>
                <label className='text-left text-dark ml-5' style={{fontSize:"20px"}}><strong>Payment Method : </strong><span className="text-dark" style={{fontSize:"20px"}}>Online Credit/Debit Card</span>
                </label>
                </div>
                <div className='col-11'>
                <label className='text-left text-dark ml-5' style={{fontSize:"20px"}}><strong>Billing Address : </strong><span className="text-dark" style={{fontSize:"20px"}}>{users.find(({_id})=> _id === orders.user )?.address}</span>
                </label>
                </div>
            </div>
        </div>

        <div className='col-12'>

            <div className='row border rounded border-warning m-4'>
                <div className='col-11'>
                <label className='text-center text-dark ml-5' style={{fontSize:"20px"}}><strong>Shipping Address : </strong><span className="text-dark" style={{fontSize:"20px"}}>{users.find(({_id})=> _id === orders.user )?.address}</span>
                </label>
                </div>
            </div>
        </div>
        
        <div className='col-12 pt-3'>
        <div className='border rounded border-danger m-4'>

        <h4 className='col-12 d-flex align-items-center justify-content-center text-dark pt-3 mb-3'>Update Order Status</h4>
            <div className='m-4'>
            <div className='row'>
                <div className='col-12'>
                    <ProgressBar animated variant={variant} now={now} />
                </div>
            </div>
            </div>
            <div className='row'>
            <div className='col-3'>
                <p className='text-center text-light border bg-success rounded ml-4'>Recieved</p>
            </div>
            <div className='col-3'>
                <p className='text-center text-dark border bg-warning rounded ml-4'>Processing</p>
            </div>
            <div className='col-3'>
                <p className='text-center text-light border bg-danger rounded ml-4'>Shipped</p>
            </div>
            <div className='col-3'>
                <p className='text-center text-light border bg-primary rounded ml-4 mr-3'>Delivered</p>
            </div>
            {/* <p className='text-info m-auto' style={{fontSize:"15px"}}>Current Order Status: {`${orders.status}`}</p> */}
            </div>
            <hr style={{backgroundColor: '#FF0000'}} />
            <div className='row '>
                <div className='col-12 d-flex align-items-center justify-content-center'>
                    
                    <form >
                        <div className="form-group">
                            <span className="lead font-weight-normal text-dark">Set Order Status &nbsp; &nbsp; &nbsp;</span>
                            <select className="form-control my-3" id = "dropdown" value={`${drop}`} onChange={(e)=>handleChange(e)}>
                                <option value="Recieved">Recieved</option>
                                <option value="Processing" >Processing</option>
                                <option value="Shipped" >Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <div className='row pt-3 pl-3'>
                            <button onClick={onSubmit} className="btn btn-outline-danger rounded">
                            {" "}
                            Update Order Status
                            </button>
                            </div>
                        </div> 
                    </form>
                </div>
                <div className='col-12 d-flex align-items-center justify-content-center'>
                    {successMessage()}
                    {warningMessage()}
                    </div>
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
export default ViewAdminOrders;