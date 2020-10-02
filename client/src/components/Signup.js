import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import isEmpty from 'validator/lib/isEmpty';
import {showErrorMsg, showSucessMsg} from './helpers/helper';
import {showLoading} from './helpers/loading';
import './Signup.css'
import { signup } from '../api/auth';
import { isAuthenticated } from './helpers/auth';

const Signup = ()=>{
    let history = useHistory();
    useEffect(()=>{
        if(isAuthenticated() && isAuthenticated().role===0){
            history.push('/user/dashboard');
        }else if (isAuthenticated() && isAuthenticated().role==1){
            history.push('/admin/dashboard');
        }
    });
    const [formData, setFormData] = useState({
        username : "kthapa",
        email : "kthapa@gmail.com",
        password : "kthapa",
        password2 : "kthapa",
        sucessMsg: false,
        errorMsg : false,
        loading: false,
    });
    const {username, email, password, password2, sucessMsg, errorMsg, loading} = formData;

    const handelChange = (event)=>{
       setFormData({
        ...formData,
        [event.target.name]:event.target.value,
        errorMsg: false
       });
      // console.log(formData);
    };

    const handelSubmit = (event)=>{
        event.preventDefault();
        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
            setFormData({
                ...formData, errorMsg: 'The fields cannot be Empty'
            })
           
        }else if (!isEmail(email)){
            setFormData({
                ...formData,errorMsg: 'Invalid Email'
            })
        }else if (!equals(password, password2)){
            setFormData({
                ...formData,errorMsg: 'Passwords do not match!'
            })
        }else{
           const {username, email, password} = formData;
           const data = {username, email, password};
           setFormData({
               ...formData,
               loading: true
           });
           signup(data)
                .then(response=>{
                    console.log(response);
                    setFormData({
                        username:'',
                        email:'',
                        password:'',
                        password2: '',
                        loading:false,
                        sucessMsg: response.data.sucessMessage
                    })
                })
                .catch(err=>{
                    console.log(err.response.data.errorMessage);
                    setFormData({
                        ...formData, loading: false, errorMsg: err.response.data.errorMessage
                    });
                })
        }
    };
    /******************************************
    *VIEWS
    *******************************************/
    const showSignupForm = ()=>(
        <form className='signup-form' onSubmit={handelSubmit} noValidate>
            {/* username */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
                <input
                    name='username'
                    value={username}
                    className='form-control'
                    placeholder='Username'
                    type='text'
                    onChange={handelChange}
                />
            </div>
            {/* email */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-envelope'></i>
                    </span>
                </div>
                <input
                    name='email'
                    value={email}
                    className='form-control'
                    placeholder='Email address'
                    type='email'
                    onChange={handelChange}
                />
            </div>
            {/* password */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    name='password'
                    value={password}
                    className='form-control'
                    placeholder='Create password'
                    type='password'
                    onChange={handelChange}
                />
            </div>
            {/* password2 */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    name='password2'
                    value={password2}
                    className='form-control'
                    placeholder='Confirm password'
                    type='password'
                    onChange={handelChange}
                />
            </div>
            {/* Signup Button*/}
            <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Create Account
                </button>
            </div>
            {/* already have account */}
            <p className='text-center text-white'>
                Have an account? <Link to='/Signin'>Log In</Link>
            </p>
        </form>
    );
/******************************************
 **RENDERER
*******************************************/
    return(
        <div className='signup-container'>
            <div className='row px-2 vh-100'>
                <div className='col-md-5 mx-auto align-self-center'>
                    {sucessMsg && showSucessMsg(sucessMsg)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {loading && <div className="text-center py-5">{showLoading()}</div>}
                    {showSignupForm()}
                </div>
            </div>
        </div>
       
    );
};

export default Signup;