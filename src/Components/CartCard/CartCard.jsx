import React, { useEffect, useState } from 'react'
import './cartcard.css'

const CartCard = (props) => {  
    const [cartItem , setCartItem] = useState({
    "productId": 4,
    "name": "Featured Blonde Roast",
    "description": "Featured Blonde Roast",
    "calories": 5,
    "cost": 625,
    "imageUrl": "https://globalassets.starbucks.com/digitalassets/products/bev/Veranda_Blend_Hot.jpg",
    "selectedOptions": [
      {
        "optionId": 20,
        "optionName": "Espesso (2)",
        "optionCost": 10
      }
    ],
    "quantity": 5
  }); 

  useEffect(() => {
    setCartItem(props.item);
  }, [props.item]);

  const handleProductRemove=()=> {
    props.onRemove(cartItem);
  }
  return (
    <div> 
        <div className="cart-card">
            <div className='cart-card-img'>
                <img src={cartItem.imageUrl} alt="" />
            </div>
            <div className="cart-card-info">
                <div className="card-row">
                    <h3>{cartItem.name}</h3>
                    <p className='cart-price'>₹{cartItem.cost}</p>
                </div>
                <p><strong>Quantity: </strong>{cartItem.quantity}</p>
                <ul>
                    {cartItem.selectedOptions.map((option, index) => (
                        <li key={index}>{option.optionName} - <strong>+₹{option.optionCost}</strong></li>
                    ))}
                </ul>

                <button onClick={handleProductRemove} >Remove</button>
            </div>
        </div>

    </div>
  )
}

export default CartCard