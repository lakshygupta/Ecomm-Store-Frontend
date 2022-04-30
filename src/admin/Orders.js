import React, {useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getAllOrders, getAllUsers } from './helper/adminapicall';
import dateFormat from 'dateformat';


const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchedOrders, setSearchedOrders] = useState(orders);
    const [search, setSearch] = useState('');
    const [drop, setDrop] = useState({value: 'dateOld'});

    const {user,token} = isAuthenticated();

    const preload = () => {
      getAllOrders(user._id,token).then(data => {
        if(data.error){
            console.log(data.error);
        }
        else{
            setOrders(data);
            setSearchedOrders(data);
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

    const handleChange = (e) => {
      setDrop({value: e.target.value})
      var byDate = orders.slice(0);
      byDate.sort(function(a,b){
        if(drop.value === "dateNew"){
          return Date.parse(a.createdAt) - Date.parse(b.createdAt)
        }else if(drop.value === "dateOld"){
          return Date.parse(b.createdAt) - Date.parse(a.createdAt)
        }
      });
        setOrders(byDate);
    }


    useEffect(() => {
        preload();  
    }, [])

    React.useEffect(()=>{
      if(search.length === 0){
        setOrders(searchedOrders);
      } else {
        const finalSearched = []
        searchedOrders.forEach((singleOrder, index) => {
          for(var i=0;i<singleOrder.products.length;i++){
              if(singleOrder.products[i].name.toLowerCase().includes(search.toLowerCase())){
                finalSearched.push(singleOrder);
                return;
              }
              if(singleOrder.status.toLowerCase().includes(search.toLowerCase())){
                finalSearched.push(singleOrder);
                return;
              }
              if(singleOrder._id.toLowerCase().includes(search.toLowerCase())){
                finalSearched.push(singleOrder);
                return;
              }
              // const myid = users.find(({_id})=> _id === singleOrder.user )
              // console.log(search)
              // console.log(users.find(({name})=> name.includes(search)));
              // if(users.find(({_id})=> _id === singleOrder.user )?._id.includes(search)){
              //   finalSearched.push(singleOrder);
              //   return;
              // }
              // if(singleOrder._id.includes(users.find(({name})=> name.includes(search))?._id)){
              //   finalSearched.push(singleOrder);
              //   return;
              //   console.log(search);
              // }
            }
        })
        setOrders(finalSearched);
      }
    }, [search])
  

    return (
        <Base title="Welcome admin" description="Manage products here">
        <Link className="btn btn-success" to={`/admin/dashboard`}>
            <span className="">← Admin Home</span>
        </Link>
      
        <p className='text-dark d-flex justify-content-center align-items-center' style={{fontSize:"30px"}}>All Orders</p>
        <p className='text-dark d-flex justify-content-center align-items-center' style={{fontSize:"20px"}}>( View Placed Orders or Change the Order Status to update your customers )</p>

  
      <div className="row bg-light border border-success">
        <div className="col-12">

        <div className='row text-center justify-content-end pt-3'>
            <div className='col-2'>
              <input id="searchBox" type="text" placeholder="Search Items or Order Id...." value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
              <div className='col-3'>
            <select id = "dropdown" value={`${drop.value}`} onChange={(e)=>handleChange(e)}>
                <option value="na" disabled>Sort By Order Date</option>
                <option value="dateOld">Sort Oldest to Newest</option>
                <option value="dateNew">Sort Newest to Oldest</option>
            </select>
            </div>
            
            </div>
            
        <div className='row text-center pt-3 mt-3'>
            <div className="col-2">
              <p className='text-center text-dark'>{'Order Id'}</p>
            </div>
            <div className="col-4">
              <p className='text-left text-dark'>{'Items'}</p>
            </div>
            <div className="col-2">
              <p className='text-left text-dark'>{'Customer Name'}</p>
            </div>
            <div className="col-1">
              <p className='text-left text-dark'>{'Order Date'}</p>
            </div> 
            <div className="col-1">
              <p className='text-left text-dark'>{'Order Status'}</p>
            </div> 
            <div className="col-1">
              <p className='text-center text-dark'>{'View Order'}</p>
            </div>
            </div>
            <hr />

            {orders.map((order,index)=> {
             return( <><div key={index} className="row mb-2">
               <div className="col-2">
                <h6 className="text-left text-dark">{'#'}{order._id}</h6>
              </div>
              <div className="col-4">
                <label className="text-left text-dark" style={{fontWeight:'bold',fontSize:"18px"}}>{order.products[0].name}<span style={{fontWeight:'normal',fontSize:"16px"}}>{order.products.length > 1 ? ` +${order.products.length-1} more item` : ''}</span></label>
              </div>
              <div className="col-2">
                <h6 className="text-left text-dark">{users.find(({_id})=> _id === order.user )?.name ? users.find(({_id})=> _id === order.user )?.name : "ADMIN"}</h6>
              </div>
              <div className="col-1">
                <h6 className="text-left text-dark">{dateFormat(order.createdAt,"dd/mm/yyyy")}</h6>
              </div>
              <div className="col-1">
                <h6 className="text-left text-dark">{order.status}</h6>
              </div>
              <div className="col-1 text-center">
                <Link
                  className="btn btn-primary"
                  style={{borderRadius:"5px"}}
                  to={`/admin/order/view/${order._id}`}
                >
                  <span className="">View</span>
                </Link>
              </div>
            </div>
            <hr/>
            </>);
          })}

        </div>
      </div>
    </Base>
    )
}
export default Orders;