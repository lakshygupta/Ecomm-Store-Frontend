import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';
import {Navbar, Container, Nav} from 'react-bootstrap';

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#120E43"}
    }
    else{
        return {color: "#00000"}
    }
}

const Menu = ({history}) => {
    // return (
    //     <div>
    //         <ul className="nav nav-tabs bg-dark">
    //             <li className="nav-item">
    //                 <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
    //             </li>
    //             <li className="nav-item">
    //                 <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
    //             </li>
    //             {/* conditional rendering for user and admin dashboard */}
    //             {isAuthenticated() && isAuthenticated().user.role === 0 && (
    //             <li className="nav-item">
    //                 <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">U.Dashboard</Link>
    //             </li>)}
    //             {isAuthenticated() && isAuthenticated().user.role === 1 && (
    //             <li className="nav-item">
    //                 <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin.Dashboard</Link>
    //             </li>
    //             )}
    //             {!isAuthenticated() && (
    //                 <Fragment>
    //                 <li className="nav-item">
    //                     <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">SignUp</Link>
    //                 </li>
    //                 <li className="nav-item">
    //                     <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">SignIn</Link>
    //                 </li>
    //                 </Fragment>
    //             )}
    //             {isAuthenticated() && (
    //                 <li className="nav-item">
    //                     <span className="nav-link text-warning" onClick={() => {
    //                         signout(() => { history.push("/") })
    //                     }}>Signout</span>

    //                  {/* phle esa tha (niche vala) */}
    //                 {/* <Link style={currentTab(history,"/signout")} className="nav-link" to="/signout">SignOut</Link> */}
    //             </li>
    //             )}
    //         </ul>
    //     </div>
    // )

    return (
        <>
            <Navbar collapseOnSelect fixed="top" scrolling expand="sm" variant="light" id="navbar-custom">
                {/* <Container> */}
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Brand style={{fontFamily:"Lucida Handwriting", fontSize:"24px"}} href="/">Ecomm Store</Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">    
                        <Nav>
                            <span style={{fontSize:"18px", fontWeight:"bold"}}>
                            <Nav.Link href="/" style={currentTab(history,"/")} className="pr-3">Home</Nav.Link></span>
                            <span style={{fontSize:"18px", fontWeight:"bold"}}>
                            <Nav.Link href="/cart" style={currentTab(history,"/cart")} className="pr-3">Cart</Nav.Link></span>
                            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                <span style={{fontSize:"18px", fontWeight:"bold"}}><Nav.Link className="pr-3" style={currentTab(history,"/user/dashboard")} href="/user/dashboard">Profile</Nav.Link></span>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                <span style={{fontSize:"18px", fontWeight:"bold"}}><Nav.Link className="pr-3" style={currentTab(history,"/admin/dashboard")} href="/admin/dashboard">Admin Dashboard</Nav.Link></span>
                            )}
                            {!isAuthenticated() && (
                                <Fragment>
                                    <span style={{fontSize:"18px", fontWeight:"bold"}}><Nav.Link className="pr-3" style={currentTab(history,"/signup")}  href="/signup">SignUp</Nav.Link></span>
                                    <span style={{fontSize:"18px", fontWeight:"bold"}}><Nav.Link className="pr-3" style={currentTab(history,"/signin")}  href="/signin">SignIn</Nav.Link></span>
                                </Fragment>
                            )}
                            {isAuthenticated() && (
                                <Nav.Link>
                                    <span style={{fontSize:"18px", fontWeight:"bold"}} className="pr-3 text-info" onClick={() => {
                                        signout(() => { history.push("/") })
                                 }}>Signout</span>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>
        </>
    )
}

export default withRouter(Menu);
