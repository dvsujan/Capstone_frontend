import React, { useEffect, useState } from "react";
import "./cart.css";
import CartCard from "../../Components/CartCard/CartCard";
import axios from "axios";
import { parseJwt } from "../../global/Global";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]); 
  const [price , setPrice] = useState(0); 
  const [discout , setDiscount] = useState(0); 
  const [subTotal , setSubTotal] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("storeData") != null) {
      const storeData = JSON.parse(localStorage.getItem("storeData"));
      setSelectedStore(storeData);
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const token = localStorage.getItem("token");
    const userId = parseInt(parseJwt(token).UserId);
    toast.promise(
    axios
      .get(`${process.env.REACT_APP_API}/api/Cart?userId=${userId}`, { headers })
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Loading Cart");
      })
      ,{
        loading: 'Loading Cart',
        success: 'Cart Loaded',
        error: 'Error Loading Cart',
      }
    );
  }, []); 
   useEffect(() => {
    let totalPrice = 0;
    let totalDiscount = 0; 
    let totalOptionPrice = 0 ;  
    let subTotal = 0 ; 
    cart.forEach((item) => { 
        subTotal += item.cost * item.quantity;
        if(item.quantity >= 2){
            totalPrice += item.cost *item.quantity * .9;
            totalDiscount += (item.cost *item.quantity) *.1;
        } 
        else {
            totalPrice += item.cost *item.quantity;
        } 
        item.selectedOptions.forEach((option) => {
            totalOptionPrice += option.optionCost*item.quantity;
        })
    });
    setPrice(totalPrice+totalOptionPrice);
    setDiscount(totalDiscount); 
    setSubTotal(subTotal+totalOptionPrice);
  }, [cart]);

  const handleRemove = (cartItem) => {
    const productId = cartItem.productId;
    const token = localStorage.getItem("token");
    const userId = parseInt(parseJwt(token).UserId);
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .delete(
        `${process.env.REACT_APP_API}/api/Cart?userId=${userId}&productId=${productId}`,
        { headers }
      )
      .then((response) => {
        axios
          .get(`${process.env.REACT_APP_API}/api/Cart?userId=${userId}`, { headers })
          .then((response) => {
            toast.success("Item Removed");
            setCart(response.data);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error Loading Cart");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Removing Item");
      });
  };

  const handleCheckout = () => {
    if (selectedStore == null) {
      toast.error("Please Select Store");
    } else {
      const token = localStorage.getItem("token");
      const userId = parseInt(parseJwt(token).UserId);
      const headers = { Authorization: `Bearer ${token}` };
      const data = {
        userId: userId,
        storeId: selectedStore.storeId,
      };
      axios
        .post(process.env.REACT_APP_API+"/api/Cart/checkout", data, { headers })
        .then((response) => {
          toast.success("Order Placed");
          window.location.href = "/orders";
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error Placing Order");
        });
    }
  };
  return (
    <div className="cart-screen">
      <div className="cart-left">
        <div>
          <h1>Review Order</h1>
          <h4>Ready in Around 4-7 min</h4>
          <div
            className="store-add"
            onClick={() => {
              window.location.href = `/store?history=${window.location.pathname}`;
            }}
          >
            {selectedStore ? <>{selectedStore.address}</> : <>Select Store</>}
          </div>
          <p>PickUp Method</p>
          <div>
            <p>Instore</p>
            <p>DriveThru</p>
          </div>
        </div>
      </div>
      {cart.length > 0 ?
      (
      <div className="cart-right">
        {cart?.map((item) => {
          return <CartCard item={item} onRemove={handleRemove} />;
        })}
        <div className="cart-total">
          <p><strong>Subtotal</strong> .................................................. <strong>₹{subTotal}</strong> </p>
          <p><strong>Discount</strong> .................................................. <strong>₹{discout}</strong></p>
          <p><strong>Total</strong> ..................................................... <strong>₹{price}</strong></p>
        </div>
      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
      </div>
      ):(<div className="cart-right">
        <h1>Cart is Empty</h1>
        <button className="checkout-btn" onClick={() => {window.location.href = "/orders";}}>View Orders</button>
      </div>)}
      <Toaster />
    </div>
  );
};

export default Cart;