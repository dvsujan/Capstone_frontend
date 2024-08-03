import React, { useState, useEffect } from "react";
import "./product.css";
import ProductOption from "../../Components/ProductOption/ProductOption";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { parseJwt } from "../../global/Global";

const Product = () => {
  const [userStore, setUserStore] = useState(null);
  const productId = window.location.pathname.split("/")[2];
  if (!productId) {
    window.location.href = "/menu";
  }
  const [product, setProduct] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    toast.promise(
      axios
        .get(`${process.env.REACT_APP_API}/api/Product?id=${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => { 
          toast.error("Error fetching product"); 
          console.error("Error fetching product:", error);
        }),
      {
        loading: "Loading product...",
        success: "Product loaded!",
        error: "Error loading product",
      }
    );
    axios
      .get(`${process.env.REACT_APP_API}/api/Product/Options?id=${productId}`)
      .then((response) => {
        setOptions(response.data.categories[0].options);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product");
      });

    if (localStorage.getItem("storeData") != null) {
      setUserStore(JSON.parse(localStorage.getItem("storeData")));
    }
  }, []);

  const handlechange = (key, index) => {
    setSelectedOptions({ ...selectedOptions, [index]: key });
  };
  const addToCart = () => {
    if (!userStore) {
      toast.error("Please select a store");
      return;
    }
    const selected = Object.values(selectedOptions);
    const filteredSelected = selected.filter((option) => option !== "");
    const filteredSelectedInt = filteredSelected.map((option) =>
      parseInt(option)
    );

    const data = {
      productId: product.productId,
      options: filteredSelectedInt,
      quantity: quantity,
      userId: parseInt(parseJwt(localStorage.getItem("token")).UserId),
      storeId: userStore.storeId,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(process.env.REACT_APP_API+"/api/Cart/Add", data, config)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Item Added to Cart");
          setTimeout(() => {
            window.location.href = "/cart";
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error("Error adding to cart");
      });
  };

  return (
    <div className="product-page">
      <section className="hero">
        <div className="product-left">
          <img src={product.imageUrl} alt="product-img" />
        </div>
        <div className="product-right">
          <h2>{product.name}</h2> <h4>{product.calories} calories</h4>
        </div>
      </section>
      {options.length > 0 && (
        <div className="product-options">
          <h1>Options</h1>
          <div className="option-container">
            {options.map((option, index) => (
              <ProductOption
                key={index}
                options={option}
                onSelectChange={handlechange}
                optionKey={index}
              />
            ))}
          </div>
        </div>
      )}
      <div className="product-bottom-bar">
        <div className="store-data">
          {userStore ? (
            <a href="/store">{userStore.address}</a>
          ) : (
            <a href="/store">Select a store</a>
          )}
        </div>
        <div className="product-borrom-right">
          <div>
            <div>
              Quantity:
              <button
                className="quant-btn"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button
                className="quant-btn"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <button className="add-cart-btn" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Product;
