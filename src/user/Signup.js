import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({ //defining the state
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values; //destructure the things so as to use them as name, email not as values.name or values.email

  const handleChange = name => event => { //ye name , email, password apne aap dkh ke chnage kar dega 3no ke lie seprate function likhne ki jarurat nahi hai
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => { //banda jab form ke submit button pe click karega to kya hoga ye bata ra hai
    event.preventDefault(); //jo by default hota hau use rokk aur ye karle jo likha hai ye batyega function ko
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(err=>console.log(err));
  };

  const signUpForm = () => {
    return (
      <div className="row mb-3">
        <div className="col-md-6 offset-sm-3 text-left border border-dark rounded " id="border-3">
        <h1 className="mt-3 d-flex justify-content-center" style={{color:"black"}}>Create New Account</h1>
        <hr/>
          <form>
            <div className="form-group">
              <label className="text-dark">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button type="button" onClick={onSubmit} className="btn btn-primary rounded btn-block mb-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row pt-5">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row pt-5">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;



// import React,{useState} from 'react';
// import Base from '../core/Base';
// import {Link} from 'react-router-dom';
// import {signup} from '../auth/helper';

// const Signup = () => {

//     const [values, setValues] = useState({ //defining the state
//         name: "",
//         email: "",
//         password: "",
//         error: "",
//         success : false
//     });

//     const {name,email,password,error,success} = values; //destructure the things so as to use them as name, email not as values.name or values.email

//     const handleChange = name => event => { //ye name , email, password apne aap dkh ke chnage kar dega 3no ke lie seprate function likhne ki jarurat nahi hai
//         setValues({...values, error: false, [name]: event.target.value });
//     };

//     const onSubmit = event => { //banda jab form ke submit button pe click karega to kya hoga ye bata ra hai
//         event.preventDefault(); //jo by default hota hau use rokk aur ye karle jo likha hai ye batyega function ko
//         setValues({...values, error: false});
//         signup({name,email,password})
//         .then(data => {
//             if(data.error){
//                 setValues({...values, error: data.values, success: false});
//             }
//             else{
//                 setValues({
//                     ...values,
//                     name: "",
//                     email: "",
//                     password:"",
//                     error: "",
//                     success: true
//                 });
//             }
//         })
//         .catch(err=>console.log("error in signp",err));//console.log("Error in signup")
//     }


//     const SignupForm = () =>{
//         return(
//             <div className="row">
//                 <div className="col-md-6 offset-sm-3 text-left">
//                     <form>
//                         <div className="form-group">
//                             <label className="text-light">Name</label>
//                             <input className="form-control" onChange={handleChange("name")} type="text" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-light">Email</label>
//                             <input className="form-control" onChange={handleChange("email")} type="text" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-light">Password</label>
//                             <input className="form-control" onChange={handleChange("password")} type="password" />
//                         </div>
//                         <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
//                     </form>
//                 </div>
//             </div>
//         );
//     };
    
//     return (
//         <Base title="Signup page" description="A page for user to signup !">
//             {SignupForm()}
//                 <p className="text-white text-center">{JSON.stringify(values)}</p>
//         </Base>
//     )
// }

// export default Signup;



