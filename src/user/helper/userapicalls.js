import { API } from "../../backend";

export const getUser = (userId,token) => {
    return fetch(`${API}/user/${userId}`,{
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
}

export const updateProfile = (userId, token, profile) => {
    return fetch(`${API}/user/update/${userId}`, {
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: profile
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>console.log(err));
};

export const getOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`, {
        method:"GET",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err=>console.log(err));
};


export const getOrdersById = OrderId => {
    return fetch(`${API}/order/${OrderId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
};