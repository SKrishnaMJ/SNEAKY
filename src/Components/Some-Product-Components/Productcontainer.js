import React from 'react'
import './Productcontainer.css'
import { Link } from 'react-router-dom';

const Productcontainer = (product) => {

  let overalltax = 10/100;
  let overcommission = 10/100;
  let extratax = 10/100;

  let mrp = parseInt(product.product.price);
  mrp = mrp + overalltax*mrp + overcommission*mrp + extratax*mrp

  const saleprice = Math.ceil(mrp - extratax*mrp);

  const finalprice = Math.ceil(mrp - saleprice);


  return (
    <div className='product-container'>
      <img src={product.product.productimage}/>
      <div className='product-details'>
        <a href={`/product/${product.product.producttype}/${product.product.id}`}>
        <button className='producttile'>{product.product.producttitle}</button>
        </a>
        <div className='price-container'>
          <p className='mrp'>Orginial Price: <p className='rate'>${mrp}</p> </p>
          <p className='saleprice'>Discount Price: <p className='rate'>${saleprice}</p> </p>
          <p className='yousave'> You Save: <p className='rate'> ${finalprice}</p> </p>
        </div>
        <a href={`/product/${product.product.producttype}/${product.product.id}`}>
        <button className='showmore-btn'>Shoe Details &gt;</button>
        </a>
      </div>
    </div>
  )
}

export default Productcontainer