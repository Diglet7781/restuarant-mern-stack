import React, {useEffect} from 'react';
import { isAuthenticated } from './helpers/auth';
import { useHistory } from 'react-router-dom';

const UserDashboard = ()=>{
    let history = useHistory();

    useEffect(()=>{
        if(!isAuthenticated){
            history.pushState('/home');
        }

    },[])

    return(
        <div>Inside UserDashboard</div>
    );
};

export default UserDashboard;