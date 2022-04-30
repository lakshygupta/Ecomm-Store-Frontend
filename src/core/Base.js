//here you can inject all the items which ou want to use everywhere 
import React from 'react';
import Menu from './Menu';
import Footer from "./Footer"


const Base = ({
    title="My Title",
    description="My Description",
    className="text-white p-4",
    children
}) => {
    return (
        <>
            <Menu/> 
            
                {/* <div className="jumbotron text-black text-center pb-0">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div> */}
                
            <div className="container-fluid pt-5">
                <div className={className}>{children}</div>
            </div>
            <Footer />
            
        </>
    )
}

export default Base;