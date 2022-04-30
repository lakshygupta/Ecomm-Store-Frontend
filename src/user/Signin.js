import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, isAuthenticated, authenticate } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false, //if user is successfully signed in than we need to redirect him  to some place
  });

  const { email, password, error, loading, didRedirect } = values; //destructuring

  //holding the jwt value
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    //ye name , email, password apne aap dkh ke chnage kar dega 3no ke lie seprate function likhne ki jarurat nahi hai
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const performRedirect = () => {
      if(didRedirect){
          if(user &&  user.role === 1){
              return <Redirect to="/admin/dashboard" />;
          }
          else{
              return <Redirect to="/" />;
          }
      }
      if(isAuthenticated()){
          return <Redirect to="/" />;
      }
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error:false, loading:true})
    signin({email,password})
    .then(data => {
        if(data.error){
            setValues({...values, error:data.error, loading:false})
        }
        else{
            authenticate(data,() => {
                setValues({
                    ...values,
                    didRedirect:true,
                })
            })
        }
    })
    .catch(err => console.log(err));
  };

  const loadingMessage = () => {
    return (
      loading && (
          <div className="alert alert-info pt-5">
              <h2>Loading... Have Patience !</h2>
          </div>
      )
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

  const SigninForm = () => {
    return (
      <div className="row pt-5 mb-5">
        <div className="col-md-6 offset-sm-3 text-left border border-dark rounded" id="border-3">
          <h1 className="mt-3 d-flex justify-content-center" style={{color:"black"}}>Login</h1>
          <hr/>
          <form>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input onChange={handleChange("email")} value={email} placeholder="someone@example.com" className="form-control" type="text" />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input onChange={handleChange("password")} value={password} placeholder="***" className="form-control" type="password" />
            </div>
            <button type="button" onClick={onSubmit} className="btn btn-primary rounded btn-block mb-3">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin page" description="A page for user to signin !">
      {loadingMessage()}
      {errorMessage()}
      {SigninForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
