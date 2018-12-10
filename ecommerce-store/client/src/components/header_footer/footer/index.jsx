import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCompass } from '@fortawesome/fontawesome-free/faCompass';
// import { faPhone } from '@fortawesome/fontawesome-free/faPhone';
// import { faClock } from '@fortawesome/fontawesome-free/faClock';
// import {faEnvelope } from '@fortawesome/fontawesome-free/faEnvelope';
const Footer = () => {
  const getTheDate =()=>{
      
    return new Date().getFullYear(); 

  }
  return (
    <footer className='bck_b_dark'>
      <div className='container'>
        <div className='logo'>Suiting</div>
        <div className='wrapper'>
          <h2>Contact Information</h2>
          <div className='business_nfo'>
            <div className='tag'>
              <div className='nfo'>
                <div>Address</div>
                <div>Paulista 1337</div>
              </div>
            </div>
            <div className='tag'>
              <div className='nfo'>
                <div>Phone</div>
                <div>11-2225265</div>
              </div>
            </div>
            <div className='tag'>
              <div className='nfo'>
                <div>Working Hours</div>
                <div>Mon-Sun/ 9am-8am</div>
              </div>
            </div>
            <div className='tag'>
              <div className='nfo'>
                <div>Email</div>
                <div>info@suiting.com</div>
              </div>
            </div>
          </div>
          <div className='left'>
            <h3>Let's be a clasic man </h3>
            <div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quo est 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright'>
        Developed by Mohsan Abbas &copy; Copyright {getTheDate()}
      </div>
    </footer>
  );
};
export default Footer;
