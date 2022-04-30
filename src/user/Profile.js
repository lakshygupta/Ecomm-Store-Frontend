import React, { useState, useEffect } from 'react'
import Base from '../core/Base';
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import "../styles.css";
import { getUser, updateProfile} from './helper/userapicalls';

const Profile = () => {

    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name:"",
        address:"",
        phoneno:"",
        pincode:"",
        error:"",
        formData: ""
    });

    const [success, setSuccess] = useState(false);

    const{name,address,phoneno,pincode,error,formData} = values;
    // const Id = user._id;
    const preload = (Id) =>{
        getUser(Id,token)
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error});
            }
            else{
                setValues({
                    ...values,
                    name: data.name,
                    address:data.address,
                    phoneno: data.phoneno,
                    pincode: data.pincode,
                    formData: new FormData(),
                });
                // console.log(categories);
            }
        });
    };

    useEffect(() => {
        preload(user._id);
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "" , loading: true})
        updateProfile(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error})
            }
            else{
                setValues({
                    ...values,
                    name:data.name,
                    address:data.address,
                    phoneno:data.phoneno,
                    pincode:data.pincode,
                    loading:false,
                })
                setSuccess("true");
            }
        })
        .catch()
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values, [name]:value});
    };

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Profile updated successfully</h4>;
          }
    }

    const errorMessage = () => (
        <div className="alert alert-warning mt-3" style={{display: error ? "": "none"}}>
            <h4>Try Again! Falied to Update your Profile</h4>
        </div>
    )

    const goBack = () => {
        return (
          <div className="mt-5">
            <Link className="btn btn-small btn-success mb-3" to="/admin/dashboard">
              Back
            </Link>
          </div>
        );
      };

    const UpdateProfileForm = () => (
        <form class="col-12">
          <div className="form-row">
            <label className="col-sm-2 col-form-label">Name</label>
            <input
              onChange={handleChange("name")}
              className="form-control col-sm-10"
              placeholder="Name"
              name="photo"
              value={name}
            />

            <label className="col-sm-2 col-form-label mt-3">Mobile No</label>
            <input
              onChange={handleChange("phoneno")}
              className="form-control col-sm-10 mt-3"
              placeholder="Mobile Number"
              name="photo"
              value={phoneno}
            />

            <label className="col-sm-2 col-form-label mt-3">Address</label>
            <input
              onChange={handleChange("address")}
              className="form-control col-sm-10 mt-3"
              placeholder="Address"
              name="photo"
              value={address}
            />

            <label className="col-sm-2 col-form-label mt-3">Pincode</label>
            <input
              onChange={handleChange("pincode")}
              className="form-control col-sm-10 mt-3"
              placeholder="Pincode"
              name="photo"
              value={pincode}
            />

            <button onClick={onSubmit} className="btn btn-outline-info mt-3" style={{marginLeft:"45%"}}>
              {" "}
              Save
            </button>
          </div>
        </form>
      );

    return (
        <Base 
        title="Update Profile"
        className="container bg-success p-4 mt-5 mb-5"
        >
        <p className='text-white d-flex justify-content-center align-items-center' style={{fontSize:"20px"}}>Update Your Info</p>
        <div className="row bg-white rounded py-3 ml-5 mr-5">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {UpdateProfileForm()}
          {goBack()}
        </div>
      </div>
        
        </Base>
    )
}

export default Profile;