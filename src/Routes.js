import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategories from './admin/UpdateCategories';
import UserProfile from './user/Profile';
import MyOrders from './user/MyOrders'
import Cart from './core/Cart';
import ViewOrders from './user/ViewOrders';
import Orders from './admin/Orders';
import ViewAdminOrders from './admin/ViewAdminOrders';
import InteractiveDashboard from './admin/InteractiveDashboard';



function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} /> {/* since we have written props in private route thats why we can write the props here */}
                <PrivateRoute path="/user/profile" exact component={UserProfile} /> {/* since we have written props in private route thats why we can write the props here */}
                <PrivateRoute path="/user/myorders" exact component={MyOrders} /> {/* since we have written props in private route thats why we can write the props here */}
                <PrivateRoute path="/user/myorders/view/:orderId" exact component={ViewOrders} /> {/* since we have written props in private route thats why we can write the props here */}
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} /> {/* since we have written props in private route thats why we can write the props here */}
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                <AdminRoute path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategories} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/order/view/:orderId" exact component={ViewAdminOrders} /> {/* since we have written props in private route thats why we can write the props here */}
                <AdminRoute path="/admin/interactive/analysis" exact component={InteractiveDashboard} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;