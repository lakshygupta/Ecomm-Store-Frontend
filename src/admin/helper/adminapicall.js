import { API } from "../../backend";

//CATEGORY:::::::::::::::::::::::::::::::::::::::::::::::::::::
// add new category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>console.log(err));
};

//get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};


//get a category
export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};

//delete a category
export const deleteCategory = (categoryId ,userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>console.log(err));
};

//update a category
export const updateCategory = (categoryId ,userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>console.log(err));
};


//PRODUCTS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//add new products calls
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method:"POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>console.log(err));
};

//get all products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};


//delete a product
export const deleteProduct = (productId ,userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>console.log(err));
};



//get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};

//update a product
export const updateProduct = (productId ,userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>console.log(err));
};

//ORDERS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//get all orders admin
export const getAllOrders = (userId,token) => {
    return fetch(`${API}order/all/admin/${userId}`, {
        method:"GET",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};

//get order by id
export const getOrdersById = OrderId => {
    return fetch(`${API}/order/${OrderId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};


export const updateOrderStatus = (orderId ,userId, token, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({"status":status})
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>console.log(err));
};

//USERS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//get all users admin
export const getAllUsers = (userId,token) => {
    return fetch(`${API}user/all/${userId}`, {
        method:"GET",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};