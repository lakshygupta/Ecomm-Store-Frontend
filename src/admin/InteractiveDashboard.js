import React, {useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getAllOrders, getAllUsers,getProducts } from './helper/adminapicall';
import dateFormat from 'dateformat';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const InteractiveDashboard = () => { 

    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchedOrders, setSearchedOrders] = useState([]);
    const [updatedOrders, setUpdatedOrders] = useState([]);
    const [todayOrders, setTodayOrders] = useState([]);
    const [todayRevenue, setTodayRevenue] = useState(0);
    const [thisMonthRevenue, setThisMonthRevenue] = useState(0);
    const [pastMonthRevenue, setPastMonthRevenue] = useState(0);
    const [thisYearRevenue, setThisYearRevenue] = useState(0);
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
            var byDate = data.slice(0);
            var updatedOrderss = [];
            byDate.sort(function(a,b){
                return Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
            });
            for(var i=0;i<3;i++){
                updatedOrderss.push(byDate[i]);
            }
            setUpdatedOrders(updatedOrderss);
            var today = new Date();
            var todayOrd = [];
            var todayRev = 0;
            var thisMonthRev = 0;
            var thisYearRev = 0;
            var pastMonthRev = 0;
            var today2 = new Date()
            var pp = new Date(today2);
            // pp = pp.toISOString();
            // console.log(pp.toDateString())
            pp.setMonth(pp.getMonth()-1);
            var pastMon = pp.toLocaleString('default', { month: 'long' });
            data.map((o,i)=>{
                var date = new Date(o.createdAt);
                var date2 = new Date(o.createdAt);
                date2.setMonth(date2.getMonth()-1);
                var past = date2.toLocaleString('default', { month: 'long' });
                if(date.toDateString() == today.toDateString()){
                    todayRev += o.amount;
                    todayOrd.push(o);
                }
                if(date.getMonth().toLocaleString('default', { month: 'long' }) == today.getMonth().toLocaleString('default', { month: 'long' })){
                    thisMonthRev += o.amount;
                }else if(past == pastMon){
                    pastMonthRev += o.amount;
                }
                if(date.getFullYear() == today.getFullYear()){
                    thisYearRev += o.amount;
                }
                // console.log(past +" " + pastMon)
                
            })
            setTodayRevenue(todayRev);
            setTodayOrders(todayOrd);
            setThisMonthRevenue(thisMonthRev);
            setThisYearRevenue(thisYearRev);
            setPastMonthRevenue(pastMonthRev);
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
      getProducts().then(data => {
        if(data.error){
            console.log(data.error);
        }
        else{
            setProducts(data);
        }
    })

    };

    useEffect(() => {
        preload();  
    }, [])

    const contentStyle = {
        maxWidth: "600px",
        width: "90%"
      };
      
    const popupdis = () => {
        if(todayOrders.length == 0){
            return(
                <span className='text-dark d-flex justify-content-center align-items-center' style={{fontSize:"18px"}}>No Orders Today 🙁</span>
            )
        }
        var pop = todayOrders.map((order,index)=>{
            return(
                <>
                     <span className='d-flex justify-content-center align-items-center'>
                     <div class="event-list" key={index}>
                                <div class="event-timeline-dot mini-stat-icon rounded-circle text-dark align-self-center"><i class="iconify m-2" data-icon="bx:right-arrow-circle" style={{fontSize:"18px"}}></i></div>
                                    <div class="d-flex">
                                        <div class="flex-shrink-0 me-3 text-dark mt-2">
                                            <h6 class="font-size-10"> {dateFormat(order.updatedAt,"dS, mmmm")} <i class="iconify text-primary align-middle ms-2" data-icon="bx:right-arrow-alt"></i></h6>
                                        </div>
                                        <div class="flex-grow-1" className='text-secondary mt-2'><div>&nbsp;&nbsp;#{order._id} &nbsp;&nbsp;<i class="iconify text-primary align-middle ms-2" style={{fontSize:"19px"}} data-icon="bx:right-arrow-alt"></i>&nbsp;&nbsp;₹{order.amount.toLocaleString('en-IN')}</div></div>
                                        {/* <i class="iconify text-primary align-middle mt-3 ml-2 mr-2" style={{fontSize:"19px"}} data-icon="bx:right-arrow-alt"></i> */}
                                        <div class="flex-grow-1 " className='badge badge-pill badge-light pt-1 mt-2 ml-3'>
                                        <Link
                                            to={`/admin/order/view/${order._id}`}
                                            >
                                            <span className="text-secondary">View Details</span>
                                        </Link>
                                        </div>
                                    </div>
                                </div>
                                </span>
                </>
            )
        })
        return pop;
    }

    const closeModal = () => setOpen(false);

    return (
        <span style={{fontFamily:"Poppins , sans-serif"}}>
        <Base>
            
        <p className='text-dark d-flex justify-content-left align-items-left pt-3' style={{fontSize:"19px",fontWeight:"700"}}>Welcome, {user.name}</p>
        <div className='card'>
            <div class="card-body">
                <div class="mb-4 h4 card-title text-dark">Ecomm Store Earning</div>
                <div class="row">
                    <div class="col-sm-4">
                        <p class="text-muted">This month</p>
                        <h3 className='text-dark'>₹{thisMonthRevenue.toLocaleString('en-IN')}</h3>
                        {/* <p class="text-muted">
                            <span class="text-success me-2"> 12% <i class="mdi mdi-arrow-up"></i> </span> From previous period
                        </p>
                        <div class="mt-4">
                            <a class="btn btn-primary btn-sm" href="/">View More <i class="mdi mdi-arrow-right ms-1"></i></a>
                        </div> */}
                    </div>
                    <div class="col-sm-4">
                        <p class="text-muted">Past month</p>
                        <h3 className='text-dark'>₹{pastMonthRevenue.toLocaleString('en-IN')}</h3>
                        {/* <p class="text-muted">
                            <span class="text-success me-2"><i class="mdi mdi-arrow-up"></i> </span>All Taxes Paid
                        </p>
                        <div class="mt-4">
                            <a class="btn btn-primary btn-sm" href="/">View More <i class="mdi mdi-arrow-right ms-1"></i></a>
                        </div> */}
                    </div>
                    <div class="col-sm-4">
                        <p class="text-muted">This year</p>
                        <h3 className='text-dark'>₹{thisYearRevenue.toLocaleString('en-IN')}</h3>
                        {/* <p class="text-muted">
                            <span class="text-success me-2"> 19% <i class="mdi mdi-arrow-up"></i> </span> From previous year
                        </p>
                        <div class="mt-4">
                            <a class="btn btn-primary btn-sm" href="/">View More <i class="mdi mdi-arrow-right ms-1"></i></a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-md-4'>
                <div className='mini-stats-wid card'>
                    <div className='card-body'>
                        <div className='d-flex'>
                            <div className='flex-grow-1'>
                                <p className='text-muted fw-medium'>Total Orders</p>
                                <h4 className='mb-0 text-dark'>{orders.length}</h4>
                            </div>
                            <div className='mini-stat-icon rounded-circle bg-primary align-self-center'>
                                <span className='avatar-title'>
                                    <i class="iconify bx bx-copy-alt m-2" data-icon="bx:copy-alt" style={{fontSize:"40px"}}></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-4'>
                <div className='mini-stats-wid card'>
                    <div className='card-body'>
                        <div className='d-flex'>
                            <div className='flex-grow-1'>
                                <p className='text-muted fw-medium'>Today Orders</p>
                                <h4 className='mb-0 text-dark'>{todayOrders.length}</h4>
                            </div>
                            <div className='mini-stat-icon rounded-circle bg-primary align-self-center'>
                                <span className='avatar-title'>
                                <a onClick={() => setOpen(o => !o)}><i class="iconify bx bx-copy-alt m-2" data-icon="bx:calendar-check" style={{fontSize:"40px"}}></i></a>
                                    <Popup
                                        open={open}
                                        closeOnDocumentClick 
                                        onClose={closeModal}
                                    >
                                        <span>
                                                {popupdis()}
                                        </span>
                                    </Popup>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-4'>
                <div className='mini-stats-wid card'>
                    <div className='card-body'>
                        <div className='d-flex'>
                            <div className='flex-grow-1'>
                                <p className='text-muted fw-medium'>Today Revenue</p>
                                <h4 className='mb-0 text-dark'>₹{todayRevenue.toLocaleString('en-IN')}</h4>
                            </div>
                            <div className='mini-stat-icon rounded-circle bg-primary align-self-center'>
                                <span className='avatar-title'>
                                    <i class="iconify bx bx-copy-alt m-2" data-icon="bx:archive-in" style={{fontSize:"40px"}}></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='card mt-3'>
                <div className='card-body'>
                <div class="mb-5 h5 card-title text-dark">Order Status Changed Recently</div>
                    <ul class="verti-timeline list-unstyled">
                        {updatedOrders.map((order,index)=>{
                            return(<>
                                <li class="event-list" key={index}>
                                <div class="event-timeline-dot mini-stat-icon rounded-circle text-dark align-self-center"><i class="iconify m-2" data-icon="bx:right-arrow-circle" style={{fontSize:"18px"}}></i></div>
                                    <div class="d-flex">
                                        <div class="flex-shrink-0 me-3 text-dark">
                                            <h5 class="font-size-14"> {dateFormat(order.updatedAt,"dS, mmmm")} <i class="iconify text-primary align-middle ms-2" data-icon="bx:right-arrow-alt"></i></h5>
                                        </div>
                                        <div class="flex-grow-1" className='text-secondary'><div>&nbsp;&nbsp;# {order._id} &nbsp;&nbsp;<i class="iconify text-primary align-middle ms-2" style={{fontSize:"19px"}} data-icon="bx:right-arrow-alt"></i>&nbsp;&nbsp;{order.status}</div></div>
                                        <i class="iconify text-primary align-middle mt-1 ml-2 mr-2" style={{fontSize:"19px"}} data-icon="bx:right-arrow-alt"></i>
                                        <div class="flex-grow-1 " className='badge badge-pill badge-light pt-2'>
                                        <Link
                                            to={`/admin/order/view/${order._id}`}
                                            >
                                            <span className="text-secondary">View Details</span>
                                        </Link>
                                        </div>
                                    </div>
                                </li>
                            </>)
                        })}
                    </ul>
                </div>
            </div>
        </Base>
        </span>
    );

}

export default InteractiveDashboard;
