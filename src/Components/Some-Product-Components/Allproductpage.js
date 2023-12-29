import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import './Allproductpage.css'
import Productcontainer from "./Productcontainer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/firebaseConfig";

const Allproductpage = (props) => {
  const [products, setProducts] = useState([]);
  let path12 = 'products-BASKETBALLSHOES';

  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      const path = `products-${props.type}`;

      if (path.match('products-BASKETBALLSHOES')) {
        path12 = 'products-BASKETBALLSHOES';
      }
      if (path.match('products-VINTAGESHOES')) {
        path12 = 'products-VINTAGESHOES';
      }
      if (path.match('products-RUNNINGSHOES')) {
        path12 = 'products-RUNNINGSHOES';
      }
      if (path.match('products-LIFESTYLESHOES')) {
        path12 = 'products-LIFESTYLESHOES';
      }

      console.log(path);

      getDocs(collection(db, path12)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
          console.log(doc.id, " => ", doc.data());
        });
        setProducts(productsArray);
      }).catch((error) => {
        console.log(error.message + "123");
      });
    }
    getProducts();
  }, []);

  console.log(props.type);

  return (
    <div className="allproductpage">
      <Navbar />
      <div className="heading">
        <p>Top Results for {props.type}</p>
      </div>
      <div className="allproductcontainer">
        {products.map((product) => (
          <Productcontainer
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Allproductpage;
