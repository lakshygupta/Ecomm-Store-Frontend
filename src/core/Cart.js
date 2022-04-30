import React, {useState, useEffect} from 'react';
import "../styles.css";
import { API } from '../backend';
import Base from './Base';
import CartCard from './CartCard';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';

export default function Cart() {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = () => {
        return(
            <div className="pt-5 text-dark">
                {products.length === 0 ? <h2>No Product in your Cart</h2> : <h2>Your Products</h2>}
                <div className="d-flex justify-content-center flex-column align-items-center">
                    {products.map((product,index) => (
                        <CartCard 
                        key={index} 
                        product={product}
                        removeFromCart={true}
                        addToCart={false}    
                        setReload={setReload}
                        reload={reload}
                        />
                    ))}
                </div>
            </div>
        );
    }
   
    const loadCheckout = () => {
        return(
            <div>
                <h2>This section is for checkout</h2>
            </div>
        );
    }

    return (
        <Base title="Your Cart" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">
                    <StripeCheckout
                        products = {products}
                        setReload = {setReload}
                    />
                </div>
            </div>
        </Base>
    )
}
