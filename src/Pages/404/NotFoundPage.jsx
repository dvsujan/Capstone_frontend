import React from "react";
import "../../Assets/fourofour.json";
import "./notfound.css";
import Lottie from "lottie-react";
import NotFoundAnimation from "../../Assets/fourofour.json";

const NotFoundPage = () => {
  return (
    <div className="notfound-page">
      <Lottie
        animationData={NotFoundAnimation}
        loop={true}
        style={{ width: "50%", height: "50%" }}
      />
    </div>
  );
};

export default NotFoundPage;
