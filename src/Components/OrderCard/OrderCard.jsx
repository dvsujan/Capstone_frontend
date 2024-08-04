import React, { useState, useEffect } from "react"; 
import Lottie from "lottie-react";
import "./ordercard.css";
import LoadingAnimation from "../../Assets/loading.json";
import DoneAnimation from "../../Assets/tickanimation.json";
import PreparingAnimation from "../../Assets/Preparing.json";
import DeclineAnimation from "../../Assets/Decline.json";

const AccordionItem = ({ product, isOpen, onClick }) => (
  <div className="accordion-item">
    <div className="accordion-header" onClick={onClick}>
      {product.name}
    </div>
    {isOpen && (
      <div className="accordion-content">
        <p>Quantity: {product.quantity}</p>
{product.selectedOptions.length > 0 &&
        <h4>Selected Options:</h4>
}
        <ul>
          {product.selectedOptions.length > 0 &&
            product.selectedOptions.map((option) => (
              <li key={option.optionId}>{option.optionName}</li>
            ))}
        </ul>
      </div>
    )}
  </div>
);

const Accordion = ({ products }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  
  return (
    <div className="accordion">
      {products.map((product, index) => (
        <AccordionItem
          key={product.productId}
          product={product}
          isOpen={index === openIndex}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

const OrderCard = (props) => {
    const [status , setStatus] = useState(props.order.status);  

    useEffect (()=>{
        setStatus(props.order.status);
    },[props.order.status])

    const handleAccept = () => {
        props.onAccept(props.order.orderId);
    }
    const  handleReject = () => {
        props.onReject(props.order.orderId);
    }
    const handleReady = () => {
        props.onReady(props.order.orderId);
    }

  return (
    <div className="order-card">
      <div className="order-details">
        <p>
          <strong>Customer Name: </strong>
          {props.order.username}
        </p>
        <p>
          <strong>Order Status : </strong>
          {props.order.status}
        </p>
        <p>
          <strong>Order Price : </strong>
          {props.order.orderAmount}
        </p>
        <Accordion products={props.order.orderItems} />
        {props.accept&&<button className="accept-btn card-btn" onClick={handleAccept} >Accept</button>}
        {props.reject&&<button className="reject-btn card-btn" onClick={handleReject}>Reject</button>}
        {props.ready&&<button className="ready-btn card-btn" onClick={handleReady}>Ready</button>}
      </div>
      {!props.store&&
      <div className="order-status"> 
        {status==="Pending"&&<Lottie animationData={LoadingAnimation} loop={true} style={{width:'150px', height:'150px'}} />}
        {status==="Accepted"&&<Lottie animationData={PreparingAnimation} loop={true} style={{width:'150px', height:'150px'}} />}
        {status==="Ready"&&<Lottie animationData={DoneAnimation} loop={false}style={{width:'150px', height:'150px'}} />} 
        {status==="Declined"&&<Lottie animationData={DeclineAnimation} loop={false}style={{width:'150px', height:'150px'}} />} 
      </div>
        }
    </div>
  );
};

export default OrderCard;
