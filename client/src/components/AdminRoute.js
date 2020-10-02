import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../components/helpers/auth.js'

const AdminRoute = ({component: Component ,...rest}) =>{
    return (
        <Route 
            {...rest}
            render = {(props) => 
                isAuthenticated() && isAuthenticated().role === 1 ? (
                    <Component {...props} />
                ):(
                    <Redirect to='/Signin' />
                )
            }
        />
    )
}

export default AdminRoute;