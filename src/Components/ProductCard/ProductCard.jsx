import React from "react";
import "./productcard.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = (props) => {
  const handleProductClick = () => {
    window.location.href = `/product/${props.product.productId}`;
  };
  const handleArchiveClick = () => {
    const token = localStorage.getItem("admin-token");
    if (token != null) {
      toast.promise(
      axios
        .delete(
          `${process.env.REACT_APP_API}/api/Product/archiveproduct?id=${props.product.productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          throw err ; 
        }),{ 
          loading: 'Archiving...', success: 'Product Archived', error: 'Error Archiving' }); 
    }
  };

  return (
    <div>
    <div className="product-card" onClick={handleProductClick}>
      <img src={props.product.imageUrl} alt={props.product.name} />
      <h4>{props.product.name} </h4>
      
      <Toaster />
    </div>
  {props.admin && (
        <button className="prod-del" onClick={handleArchiveClick}>
          Archive
        </button>
      )}
    </div>
  );
};

export default ProductCard;
