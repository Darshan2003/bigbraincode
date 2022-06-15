import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm =({onInputChange,onButtonClick})=>{
    return(
        <div>
            <p className='f3 white'>
                {'This Big Brain will detect faces in your picture. Give it a try!'}
            </p>
            <div className='center'>
                <div className=' form center pa4 br3 shadow-5'>

                    <input className='f4 pa2 w-70 center  bg-lightest-blue' type="text" onChange={onInputChange} />
                    <button 
                    className='w-30 grow f4  ph3 pv2 dib white bg-light-purple br2'
                    onClick={onButtonClick}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
       
    );
}
export default ImageLinkForm;