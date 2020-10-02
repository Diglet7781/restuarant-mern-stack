import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { showErrorMsg } from './helpers/helper';
import { showLoading } from './helpers/loading';
import './Signin.css';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import {signin} from '../api/auth';
import {setAuthentication, isAuthenticated} from './helpers/auth';

const Signin = ()=>{
    let history = useHistory();
    useEffect(()=>{
        if(isAuthenticated() && isAuthenticated().role===0){
            history.push('/user/dashboard')
        }else if (isAuthenticated() && isAuthenticated().role===1){
            history.push('/admin/dashboard');
        }
    });
    const [formData, setFormData] = useState({
        email: 'kthapa@gmail.com',
        password: 'abc123',
        errorMsg: false,
        loading: false
    });
    const {email, password, errorMsg, loading} = formData;

    const handelChange = (event)=>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
            errorMsg: false
        });

    }

    const handelSubmit = (event)=>{
        event.preventDefault();
        if (isEmpty(email) || isEmpty(password)){
            setFormData({
                ...formData,
                errorMsg: 'ALL Fields must be filled'
            });
        } else if (!isEmail(email)){
            setFormData({
                ...formData,
                errorMsg: "Invalid Email"
            });
        } else {
            const {email, password} = formData;
            const data = {email, password};
            
            setFormData({...formData, loading: true});
            //sucess
            signin(data)
                .then(response=>{
                   setAuthentication(response.data.token, response.data.user);
                   
                   if (isAuthenticated() && isAuthenticated().role===1){
                       console.log("Redirect to Admin Dashboard");
                       history.push('/admin/dashboard')
                   }else{
                       console.log("Redirect to User Dashboard");
                       history.push('/user/dashboard');
                   }
                })
                .catch(err=>{
                    setFormData({
                        ...formData,
                        errorMsg: err.response.data.errorMessage
                    })
                });
        }
    }

    const showSigninForm = ()=>(
        <form className='signup-form' onSubmit={handelSubmit} noValidate>
            {/* email */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-envelope'></i>
                    </span>
                </div>
                <input
                    name='email'
                    value={email || ""}
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
                    value={password || ""}
                    className='form-control'
                    placeholder='Create password'
                    type='password'
                    onChange={handelChange}
                />
            </div>
            {/* Signup Button*/}
            <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Signin
                </button>
            </div>
            {/* already have account */}
            <p className='text-center text-white'>
               Don't have an account? <Link to='/Signup'>Create an account</Link>
            </p>
        </form>
    );

    return(
        <div className='signin-container'>
        <div className='row px-2 vh-100'>
            <div className='col-md-5 mx-auto align-self-center'>
                {errorMsg && showErrorMsg(errorMsg)}
                {loading && <div className="text-center py-5">{showLoading()}</div>}
                {showSigninForm()}
            </div>
        </div>
    </div>
    );
};

export default Signin;