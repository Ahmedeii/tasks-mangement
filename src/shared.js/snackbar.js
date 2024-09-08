import React from 'react';
import { Helmet } from 'react-helmet-async';

const Snackbar = ({right}) => {
  return (
    
    <div>
      <Helmet>
        <style>
          {`
          
      .show-message{
        color: #333;
        background-color: white;
        border-radius: 3px;
        position: fixed;
        top: 90px;
        font-size: 16px;
        padding: 5px 5px;
        font-weight: normal;
        transition: 1s;
        
      }
      .fa-regular{
        /* color: rgb(134, 218, 134); */
        color: aqua;
        margin-left: 5px;
      }
    
          
          `}
        </style>
      </Helmet>
      <p className="show-message" style={{right: right ? "-100vw":"20px"}}>task add successfully<i className="fa-regular fa-circle-check"></i></p>
              
    </div>
  );
}

export default Snackbar;
