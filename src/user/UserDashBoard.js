import React from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom';


const UserDashBoard = () => {
    const {user : {name, email, role}} = isAuthenticated();
    const userLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white ">Profile Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/user/profile" className="nav-link text-success text-center">Add/Edit Info</Link>
                    </li>
                     <li className="list-group-item">
                        <Link to="/user/myorders" className="nav-link text-success text-center">My Orders</Link>
                    </li>  
                    {/*<li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success text-center">Create Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success text-center">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success text-center">Manage Orders</Link>
                    </li>   */}
                </ul>
            </div>
        );
    }

    const userRightSide = () => {
        return(
            <div className="card mb-4">
                <h4 className="card-header">Your Info</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">Welcome User</span>
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span> {name} 
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span> {email} 
                    </li>
                    
                </ul>
            </div>
        );
    }

    return (
        <Base title="UserDashBoard page" className="container bg-success p-4 mt-5 mb-5">
            <div className="row">
                <div className="col-3">{userLeftSide()}</div>
                <div className="col-9">{userRightSide()}</div>
            </div>
        </Base>
    )
}

export default UserDashBoard;