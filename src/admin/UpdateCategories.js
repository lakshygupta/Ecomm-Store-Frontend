import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategories = ({ match }) => {
  // defining states
  const [name, setName] = useState({
      names:"",
      formData:""
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // grabing the user and token from the isAuth so as to use token in furthur
  const { user, token } = isAuthenticated();
  const {names,formData} = name;

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      // console.log(data);
      if (data.error) {
        setError({ error: data.error });
      } else {
        setName({ names: data.name ,formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => {
    return (
        <Link className="btn btn-small btn-dark rounded mb-3" to="/admin/dashboard">
          ← Admin Home
        </Link>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value); //jo bhi value form me hogi voh isme aa jygi
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, {name}) //ye {name} is the category ka naam aur adminapicall me humne use stringify kia hai to normally ni bhej skte
      .then((data) => {
          console.log(data);
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess("true");
          setName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <h4 className="text-success">Try Again! Failed to update category</h4>
      );
    }
  };
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead font-weight-normal">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={names}
          autoFocus
          required
          placeholder="eg. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-success">
          {" "}
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update Category here"
      description="Update Category for new tshirts"
      className="container bg-secondary p-4 mt-5 mb-5"
    >
      {goBack()}
      <div className="row bg-white rounded py-3 ml-5 mr-5">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          
        </div>
      </div>
    </Base>
  );
};
export default UpdateCategories;
