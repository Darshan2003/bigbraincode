import React from 'react';


const Navigation =({onRouteChange,currentRoute,isSignedIn})=>{
    if(isSignedIn)
    {

        return(
            
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p onClick={()=>onRouteChange('signout')}className='f3 link dim white pa3 pointer'>Sign Out</p>
        </nav>
        );
    }   
    else
    {
        if(currentRoute==='register')
        {

            return(
                <nav style={{display:'flex',justifyContent:'flex-end'}}>
                    <p onClick={()=>onRouteChange('signin')}className='f3 link dim white pa3 pointer'>Sign In</p> 
                </nav>
            ); 
        }
        return(
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>onRouteChange('register')}className='f3 link dim white pa3 pointer'>Register</p>
            </nav>
        ); 
    }
}
export default Navigation;