import {API} from '../../backend';
//API means : http://localhost:8000/api/

export const signup = user => {
    return fetch(`${API}/signup`,{ //this is we are passing to a url
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
    })
    .then(response =>{ //if everything is a success than then
        return response.json();
    }) 
    .catch(err => console.log(err)); //if anything goes wrong than its a catch request
};

export const signin = user => {
    return fetch(`${API}/signin`,{ //this is we are passing to a url
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
    })
    .then(response =>{ //if everything is a success than then
        return response.json();
    }) 
    .catch(err => console.log(err)); //if anything goes wrong than its a catch request
};

export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){ //is window object is accessible to us
        localStorage.setItem("jwt",JSON.stringify(data)) // a token is set in the localstorage which is a jwt token
        next();
    }
}

export const signout = next => {
    if(typeof window !== "undefined"){ //is window object is accessible to us
        localStorage.removeItem("jwt") // removing the token once the user is signout from the localstorage
        next();

        return fetch(`${API}/signout` , {
            method: "GET"
        })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err));
    }
};

//validate the user if the user is signed in or not just checking the user that is he signed in or not

export const isAuthenticated = () =>{
    if(typeof window == "undefined"){ //is window object is accessible to us
        return false; //user is not authenticated
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt")) //user is currently logged in  after here than we chach from isAuthenticated from backend than only we hit the true
    }
    else{
        return false;
    }
};

