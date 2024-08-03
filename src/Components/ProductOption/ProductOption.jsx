import React, { useState, useEffect } from "react";
import "./productoption.css";

const ProductOption = ({ options, onSelectChange ,optionKey}) => {
  const [option, setOption] = useState({
    optionId: 2,
    optionName: "Flavours",
    unitOfMeasure: "Pump",
    additionalCost: 10,
    optionValues: [
      {
        value: "Brown Sugar Syrup",
        additionalCost: 5,
        optionId: 6,
      },
      {
        value: "Caramel Syrup",
        additionalCost: 5,
        optionId: 7,
      },
      {
        value: "HazelNut Syrup",
        additionalCost: 10,
        optionId: 8,
      },
      {
        value: "Mocha Sauce",
        additionalCost: 10,
        optionId: 9,
      },
      {
        value: "Dark Caramel Sauce",
        additionalCost: 20,
        optionId: 10,
      },
      {
        value: "chocolate malt powerder",
        additionalCost: 10,
        optionId: 11,
      },
    ],
  });

  useEffect(() => {
    setOption(options);
  }, [options]);  
  const handleChange = (event) => {
    onSelectChange(event.target.value,  optionKey);
  };

  return (
    <div className="product-option">
      <h1>
        {option.optionName} ({option.unitOfMeasure})
      </h1> 
      <hr></hr>
      <select className="option-select" onChange={handleChange}>
      <option value="">None</option> 
        {option.optionValues.map((optionValue, index) => (
          <option key={index} value={optionValue.optionId}> 
            {optionValue.value} 
          </option>
        ))}
      </select> 
    </div>
  );
};

export default ProductOption;
