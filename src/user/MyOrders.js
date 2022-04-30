import React, {useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import {getOrders} from './helper/userapicalls';
import dateFormat from 'dateformat';


const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [searchedOrders, setSearchedOrders] = useState(orders);
    const [search, setSearch] = useState('');
    const [drop, setDrop] = useState({value: 'dateOld'});
    const {user,token} = isAuthenticated();

    const preload = () => {
        getOrders(user._id,token,user).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                // data.sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
                // var byDate = data.slice(0);
                // byDate.sort(function(a,b){
                //   return Date.parse(b.createdAt) - Date.parse(a.createdAt)
                // });
                setOrders(data);
                setSearchedOrders(data);
                // console.log(data.sort((a,b) => {console.log(Date.parse(a.createdAt))}));
            }
        })
    };

    useEffect(() => {
        preload();  
    }, [])

    
    function useForceUpdate(){
      // if(drop.value==="date"){
        var byDate = orders.slice(0);
                byDate.sort(function(a,b){
                  return Date.parse(a.createdAt) - Date.parse(b.createdAt)
                });
                console.log(byDate)
        setOrders(byDate);
      // }
    }
    
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

    // const handleSearch = (e) => {
    //   setSearch(e.target.value);
    //   var searchData = orders.slice(0);
    //   var finalData = []
    //   searchData.filter((a)=>{
    //     for(var i=0;i<a.products.length;i++){
    //       if(a.products[i].name.toLowerCase().includes(search.toLowerCase())){
    //         // console.log("hi");
    //         finalData.push(a);
    //         return a;
    //       }
    //     }
    //     if(a.status.toLowerCase().includes(search.toLowerCase())){
    //       // console.log("hi2");
    //       finalData.push(a);
    //       return a;
    //     }
    //   })
    //   console.log(finalData);
    //   setOrders(finalData);
    // }

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
            }
        })
        setOrders(finalSearched);
      }
    }, [search])
    // const handleSearch = (e) => {
    //   setSearch(e.target.value);
    //   if(search.length === 0){
    //     setOrders(orders);
    //   } else {
    //     const finalSearched = []
    //     orders.forEach((singleOrder, index) => {
    //       Object.values(singleOrder).every((onlyValues, valIndex) => {
    //         if(onlyValues.toLowerCase().includes(search.toLowerCase())){
    //           finalSearched.push(singleOrder)
    //           return;
    //         }
    //       })
    //     })
    //     setOrders(finalSearched);
    //   }
      
    // }
    return (
        <Base
        title="Completed Orders"
        >
        <p className='text-dark d-flex justify-content-center align-items-center' style={{fontSize:"30px"}}>My Orders</p>
        <div className='row bg-light border border-success'>
        <div className='col-12'>
            <br />
            <div className='row text-center justify-content-end'>
            <div className='col-2'>
              {/* <input type="text" placeholder="search status or product..." onChange={(e)=>handleSearch(e)} /> */}
              <input id="searchBox" type="text" placeholder="Search Items or Order Status..." value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
              <div className='col-3'>
            <select id = "dropdown" value={`${drop.value}`} onChange={(e)=>handleChange(e)}>
                <option value="na" disabled>Sort By Order Date</option>
                <option value="dateOld">Sort Oldest to Newest</option>
                <option value="dateNew">Sort Newest to Oldest</option>
            </select>
            </div>
            
            </div>
            <br />

            <div className='row text-center'>
            <div className="col-1">
              <p className='text-left text-dark'>{'Order No'}</p>
            </div>
            <div className="col-4">
              <p className='text-left text-dark'>{'Items'}</p>
            </div>
            <div className="col-2">
              <p className='text-left text-dark'>{'Order Date'}</p>
            </div>
            <div className="col-2">
              <p className='text-left text-dark'>{'Order Status'}</p>
            </div> 
            <div className="col-3">
              <p className='text-center text-dark'>{'View Order Details'}</p>
            </div>
            </div>
            <hr />

            {/* {drop.value==="date" ? setOrders(orders.sort((a,b) => a.createdAt - b.createdAt)) : console.log("No Sort")} */}
            
        {orders.map((order,index)=> {
             return( <><div key={index} className="row mb-2 ">
               <div className="col-1">
                <h6 className="text-left text-dark">{'Order No. '}{index+1}</h6>
              </div>
              <div className="col-4">
                <label className="text-left text-dark" style={{fontWeight:'bold',fontSize:"18px"}}>{order.products[0].name}<span style={{fontWeight:'normal',fontSize:"16px"}}>{order.products.length > 1 ? ` +${order.products.length-1} more item` : ''}</span></label>
              </div>
              <div className="col-2">
                <h6 className="text-left text-dark">{dateFormat(order.createdAt,"dd/mm/yyyy")}</h6>
              </div>
              <div className="col-2">
                <h6 className="text-left text-dark">{order.status}</h6>
              </div>
              <div className="col-3 text-center">
                <Link
                  className="btn btn-primary"
                  style={{borderRadius:"5px"}}
                  to={`/user/myorders/view/${order._id}`}
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
export default MyOrders;