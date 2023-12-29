import React, { useState, useEffect } from 'react'
import './CartCard.css'
import {deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../FirebaseConfigs/firebaseConfig';


const CartCard = (itemdata) => {

    const[prodquantiy, setProdQuantity] = useState(itemdata.itemdata.quantity);

    let p = itemdata.itemdata.product.price
    let overalltax = 10/100;
    let overcommission = 10/100;
    let extratax = 10/100;
  
    let mrp = parseInt(p);
    mrp = mrp + overalltax*mrp + overcommission*mrp + extratax*mrp
  
    const saleprice = (Math.ceil(mrp - extratax*mrp))*prodquantiy;
    const finalprice = Math.ceil(mrp - saleprice);
    console.log(`${itemdata.userid}`)

   
    const increasequantity = async() => {
        setProdQuantity(prodquantiy + 1)
        

        const itemref= doc(db,`cart-${itemdata.userid}`,`${itemdata.itemdata.id}`)
        await updateDoc(itemref, {
            quantity: prodquantiy + 1 
        }).then(() => { console.log(`changed quantity`)})


    }
    const decreasequantity =  async() => {
        if(prodquantiy >= 1){
            setProdQuantity(prodquantiy -1)

            const itemref= doc(db,`cart-${itemdata.userid}`,`${itemdata.itemdata.id}`)
            await updateDoc(itemref, {
            quantity: prodquantiy + 1 
        }).then(() => { console.log(`changed quantity`)})


        }
    }
    
    const deletecartitem = async() => {
        await deleteDoc(doc(db, `cart-${itemdata.userid}`,`${itemdata.itemdata.id}`))
            .then( () => {
                console.log('doc deleted')

            })

    }

    return (

    <div className='cart-prod-container'>
        <div className='cart-prod-imgtitle'>
            <div className='prod-image'><img src={itemdata.itemdata.product.productimage} /></div>
            <div className='prod-title'>{itemdata.itemdata.product.productitle}</div>
        </div>
        <div className='prodquantity-div'>
            <button onClick={increasequantity}>+</button>
            <p>{prodquantiy}</p>
            <button onClick={decreasequantity}>-</button>
        </div>
        <div className='prodprice'>${saleprice}</div>
        <button className='deletebtn' onClick={deletecartitem}>Delete Item</button>
    </div>
  )
}

export default CartCard