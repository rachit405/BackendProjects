import { useEffect, useState } from 'react';
import React from 'react'
import './recipes-page.css'


function Order({data,loading}) {
    return (  
        <> {
            loading? <div>
                loading
            </div> : <div className='container' style={{marginTop:'20px'}}>
            <div className='row d-flex' style={{justifyContent: 'center'}}>

                {
                    data?.showRecipies?.map((data,index) => (

                        <div className='card col col-md-6 menu' key={index}>
                            
                            <div className='pizzacard d-flex'style={{marginTop:'15px'}} >
                            <div className='name-price d-flex'> 
                                <div className='pizza-name m-2'><b>{data.name}</b></div>

                                <div className='pizza-price m-2'><b>Prep Time :  {data.cookTimeMinutes}</b></div>
                            </div>



                            <div className='info'>
                                <p>{data.difficulty}</p>
                                <p> <b>Ingredients: </b>{data.ingredients}</p>
                                
                            </div>



                            <div className='image-add d-flex'>
                                <div className='pizza-image'><img src={data.image} alt='pizza photos'></img> </div>
                                
                            </div>
                    </div>                    
                </div>
                    ))
                }  
            </div>
        </div>
        }
        </>
        
     );
}

export default Order;