import React from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {

    const {user : {name, email, role}} = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white ">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success text-center">Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success text-center">Manage Categories</Link>
                    </li>  
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success text-center">Create Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success text-center">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success text-center">Manage Orders</Link>
                    </li>  
                </ul>
            </div>
        );
    }

    const adminRightSide = () => {
        return(
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">Admin Panel</span>
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span> {name} 
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span> {email} 
                    </li>
                    <li className="list-group-item">
                        <span><Link to="/admin/interactive/analysis" className="nav-link text-light text-left badge badge-primary badge-pill" style={{fontSize:"17px"}}>Interactive Dashboard</Link></span><span style={{fontSize:"14px"}}> ( Insights and Analysis of Customer's Purchase on <strong>Ecomm Store</strong> )</span>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <Base title="Welcome to Admin Panel"  description="Manage all your products here" className="container bg-secondary p-4 mt-5 mb-5">
            <div className="row">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>
        </Base>
    )
}

export default AdminDashBoard;