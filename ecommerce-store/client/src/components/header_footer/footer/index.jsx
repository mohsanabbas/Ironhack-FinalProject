import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
const Footer = ({data}) => {
  const getTheDate = () => {
    return new Date().getFullYear();
  };
  return (
    data.siteData ?
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">SUITING</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>{data.siteData[0].address}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>{data.siteData[0].phone}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>Working hours</div>
                  <div>{data.siteData[0].hours}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>{data.siteData[0].email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Our Guide to Suits</h2>
            <div>
              <div>
                Get all the latest information on sales and offers.You
                can't miss out.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        Developed by Mohsan Abbas &copy; Copyright {getTheDate()}
      </div>
    </footer>
     :null
  );
};
export default Footer;
