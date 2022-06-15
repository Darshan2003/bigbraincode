import React from 'react';
import './FaceRecognition.css';


const FaceRecognition=({imgUrl,boxLocation})=>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>

                <img id='inputImage' alt='' src={imgUrl} width='500px' height='auto' />
                <div className='bounding-box' style={{top:boxLocation.top, right:boxLocation.right, bottom:boxLocation.bottom, left:boxLocation.left}}></div>
            </div>

        </div>
    );

   
}
export default FaceRecognition;