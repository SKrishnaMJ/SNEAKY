import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import { doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { auth, db } from '../../FirebaseConfigs/firebaseConfig'
import './Specificproductpage.css'
import ProductSlider from './ProductSlider'


const Specificproductpage = () => {
    const {type , id } = useParams()
    const [product, setProduct] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let newpath = 'products-BASKETBALLSHOES';

    function GetCurrentUser() {
        const [user, setUser] = useState("");
        const usersCollectionRef = collection(db, "users");
    
        useEffect(() => {
          auth.onAuthStateChanged((userlogged) => {
            if (userlogged) {
              const getUsers = async () => {
                const q = query(
                  collection(db, "users"),
                  where("uid", "==", userlogged.uid)
                );
                console.log(q);
                const data = await getDocs(q);
                setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
              };
              getUsers();
            } else {
              setUser(null);
            }
          });
        }, []);
        return user;
      }
      const loggeduser = GetCurrentUser();

    function GetCurrentProduct() {

        useEffect(() => {
            const getProduct = async () => {
            
                const path = `products-${type}`;
                console.log(`products-${type}`)

                if (path.match('products-BASKETBALLSHOES')) {
                    newpath = 'products-BASKETBALLSHOES';
                }
                if (path.match('products-VintageShoes')) {
                    newpath = 'products-VINTAGESHOES';
                }
                if (path.match('products-RunningShoes')) {
                    newpath = 'products-RUNNINGSHOES';
                }
                if (path.match('products-LIFESTYLESHOES')) {
                    newpath= 'products-LIFESTYLESHOES';
                }

                const docRef = doc(db, newpath,id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            };
            getProduct();
        }, [])
        return product


    }
    GetCurrentProduct();

    let overalltax = 10/100;
    let overcommission = 10/100;
    let extratax = 10/100;
  
    let mrp = parseInt(product.price);
    mrp = mrp + overalltax*mrp + overcommission*mrp + extratax*mrp
  
    const saleprice = Math.ceil(mrp - extratax*mrp);
    const finalprice = Math.ceil(mrp - saleprice);
    
    const addtocart = () => {
        if(loggeduser){
            addDoc(collection(db,`cart-${loggeduser[0].uid}`), {
                product,quantity:1
            }).then(() => {
                setSuccessMsg('Product added to Cart');
            }).catch((error) => { setErrorMsg(error.message) });

        }
        else{
            setErrorMsg('You need to login frist to buy Shoes :) ')
        }

    }

  return (

    <div>
        <Navbar/>
        { product? <div className='myprod-container'>
            <div className='prod-img-cont'>
                <img src={product.productimage} />
            </div> 
            <div className='prod-data'>
                <p className='prod-head'>{product.producttitle}</p>
                <p className='prod-head'>{product.keyspecs}</p>

                <div className='specific-price-container'>
                    <p className='mrp'>MRP:<p className='rate'>${mrp}</p></p>
                    <p className='saleprice'>Discount Price :<p className='rate'>${saleprice}</p></p>
                    <p className='yousave'>You Save:<p className='rate'>${finalprice}</p></p>
                </div>

                <p className='prod-details-head'>Details:</p>
                <p className='prod-description'>{product.description}</p>

                <div className='row-cont'>
                   <div className='warranty-replacement'>
                   <div className='cod'>
                        <div className='img-circle'>
                            
                        </div>
                        <p>Cash on delivery</p>
                    </div>
                    <div className='warranty'>
                        <div className='img-cricle'>
                        
                        </div>
                        <p>{product.warranty} Year Warranty</p>
                    </div>
                    <div className='replacement'>
                        <div className='img-cricle'>
                       
                        </div>
                        <p>10 Days Replacement</p>
                    </div>
                   </div>
                   <div className='buy-cart'>
                        <button className='btn'>Buy Now</button>
                        <button className='btn' onClick={addtocart}>Add to Cart</button>
                   </div>
                </div>
                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                </>}
                {errorMsg && <>
                    <div className='error-msg'>{errorMsg}</div>
                </>}
            

            </div>
        </div> : <div>Loading...</div>
    }
    <p className='prod-details-head2'>Similar items</p>
    <ProductSlider type={type}></ProductSlider>
        </div>
  )
}

export default Specificproductpage