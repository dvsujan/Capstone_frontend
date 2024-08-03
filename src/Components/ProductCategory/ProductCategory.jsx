import React from 'react'
import './productcategory.css'
import ProductCard from '../ProductCard/ProductCard'

const ProductCategory = (props) => { 
  return (
    <>
    {props.category.products.length > 0 &&
    (<div className='product-category'>
        <div className='product-category-header'>
            <h2>{props.category.name}</h2>
        </div>
        <div className='category-products'>
        {props.category.products.map((product) => (
            <ProductCard product={product} key={product.id} admin={props.admin}/>
        ))}
        </div>
    </div>)
    }</>
  )
}

export default ProductCategory