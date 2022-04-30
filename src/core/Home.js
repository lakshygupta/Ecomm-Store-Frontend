import React, {useState, useEffect} from 'react';
import "../styles.css";
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts, getCategories } from './helper/coreapicalls';
import {Carousel, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image 6.jpg';


export default function Home() {

    const [products, setProducts] = useState([]);
    const [resproducts, setResproducts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [radioValue, setRadioValue] = useState([]);
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const loadAllProduct = () => {
        getProducts()
        .then(data => {
            if(data.error){
                setError(data.error);
            }
            else{
                setProducts(data);
                setResproducts(data);
            }
        });
    };

    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setcategories(data);
            }
        })
    };
    
    useEffect(() => {
        loadAllProduct();
        preload();
    }, [])

    const handleChange = (e) => {
        setRadioValue(e);
        const results = []
        if(e.length == 0){
            setProducts(resproducts);
        }else{
            resproducts.forEach((singleProduct, index) => {
                if(e.includes(singleProduct.category._id)){
                    results.push(singleProduct);
                }
            });
            setProducts(results);
        }
        
    }

    return (
        <>
        <Carousel>
                    <Carousel.Item interval={1500}>
                        <img
                        className="d-block w-100"
                        src={image5}
                        alt="First slide"
                        height="650px"
                        />
                        <Carousel.Caption className="d-flex justify-content-center">
                        <h3 style={{color:"#FF6666", fontSize:"70px"}} className="bg-white">Sweatshirts</h3>
                        
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={1500}>
                        <img
                        className="d-block w-100"
                        src={image3}
                        alt="Second slide"
                        height="650px"
                        />
                        <Carousel.Caption className="d-flex justify-content-center">
                        <h3 style={{color:"#120E43", fontSize:"70px"}} className="bg-warning">Wireless Headphones</h3>
                        
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={1500}>
                        <img
                        className="d-block w-100"
                        src={image6}
                        alt="Third slide"
                        height="650px"
                        />
                        <Carousel.Caption className="d-flex justify-content-center">
                        <h3  style={{color:"#B4161B", fontSize:"70px"}} className="bg-info">T-Shirts</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
        <Base title="Welcome to Ecommerce Store" description="Purchase products here">
            <div className="row text-center d-flex justify-content-center">
                    <div className='col-12'>
                        <h1 style={{color:"black",marginBottom:"3%",fontFamily:"cursive",fontSize:"50px"}}>Lets Buy some Products</h1>
                    </div>
                
                    <div className='col-12 pb-4'>
                    <ToggleButtonGroup type="checkbox" id="checkbox" value={radioValue} onChange={handleChange}>
                        {categories.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`${radio._id}`}
                            variant={'outline-dark'}
                            value={radio._id}
                            name="checkbox"
                            type="checkbox"
                            checked={radioValue.value === radio._id}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    </div>
                <div className="row">
                    {products.map((product, index) => {
                        return(
                            <div key={index} className="col-md-4 mb-4">
                                <Card product = {product}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
        </>
    )
}
