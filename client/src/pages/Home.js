import React from 'react';

import './Home.scss';

import "../images/test.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';

import { slide } from 'react-slideshow-image';

import { useEffect, useState } from 'react';


import im1 from '../images/im1.jpeg';
import im2 from '../images/im2.jpeg';



const Home = () => {
  let sliderArr = [<img src={im1} />,<img src={im2}/>];

  const [x,setX] = useState(0);

  const goLeft = () => {

    x === 0 ? setX(-100*(sliderArr.length-1)) : setX(x+100);

  };

  const goRight = () => {

    console.log(x);

    x === -100*(sliderArr.length-1) ? setX(0) : setX(x-100);

  };
    return (

        <div className ="slider">

      {

       sliderArr.map((item , index) => {
         return (
           <div key={index} className = "slide" style = {{transform : `translateX(${x}%)`}}>
             {item}
           </div>
         );
       })}

      <button id="goLeft" onClick={goLeft}> .</button>
      <button id ="goRight" onClick={goRight}> .. </button>

      
        
    </div>
       
    );
};



export default Home;

