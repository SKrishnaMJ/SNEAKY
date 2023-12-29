import React from 'react'
import { Link } from 'react-router-dom';
import './Sliderproductcard.css'

const Sliderproductcard = (product) => {
    let overalltax = 10/100;
  let overcommission = 10/100;
  let extratax = 10/100;

  let mrp = parseInt(product.product.price);
  mrp = mrp + overalltax*mrp + overcommission*mrp + extratax*mrp

  const saleprice = Math.ceil(mrp - extratax*mrp);

  const finalprice = Math.ceil(mrp - saleprice);

  return (

    <div className='mini-prodcut-container'>
        <div className='mini-img-container'>
            <img src={product.product.productimage}/>
        </div>
        <div className='mini-product-details'>
            <p className='mini-producttile'>{product.product.producttitle}</p>
        
        <div className='mini- price-container'>
          <p className='mrp'>Orginial Price: <p className='rate'>${mrp}</p> </p>
          <p className='saleprice'>Discount Price: <p className='rate'>${saleprice}</p> </p>
          <p className='yousave'> You Save: <p className='rate'> ${finalprice}</p> </p>
        </div>
        <a href ={`/products/${product.product.producttype}/${product.product.id}`}>
        <button className='showmore-btn'>Show more &gt;</button>
        </a>
        </div>


    </div>
  )
}

export default Sliderproductcard