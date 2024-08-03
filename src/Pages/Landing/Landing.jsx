import React from "react";
import "./landing.css";
import Sec1img from "../../Assets/bgimg.png";
import BFimg from "../../Assets/bfimg.png";
import PhoneImg from "../../Assets/paymobile.png"

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="sec1">
        <div className="sec1-left">
          <h1>OH HELLO AGAIN</h1>
          <p>
            Cozy is a flavor and that flavor is Hot Cofee . Snuggle up with the
            perfect treat.
          </p>
          <button><a href="/menu">Visit Menu</a></button>
        </div>
        <div className="sec1-right">
          <img src={Sec1img} alt="" />
        </div>
      </div>
      <div className="sec2">
        <div className="sec1-left">
          <h1>All you, all right</h1>
          <p>
            Cage-free egg options for any time of day. Start today with one of
            our breakfast choices.
          </p>
        </div>
        <div className="sec1-right">
          <img src={BFimg} alt="" />
        </div>
      </div>
      <div className="sec3">
         <div className="sec1-left">
          <h1>Order Ahead & Enjoy ASAP</h1>
          <p>
            use mobile order and pay the planetbucks app for iPhone or Android and jump the line every time at participating stores. Just ahead the pickup area and off you go
          </p>
        </div>
        <div className="sec1-right">
          <img src={PhoneImg} alt="" />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
