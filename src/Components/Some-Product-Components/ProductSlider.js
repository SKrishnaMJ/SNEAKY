import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sliderproductcard from './Sliderproductcard';
import {
    collection,
    query,
    onSnapshot, getDocs
} from "firebase/firestore";
import { db } from "../../FirebaseConfigs/firebaseConfig";

const ProductSlider = (props) => {

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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
        <Carousel responsive={responsive}>
            {products.map((product)=> 
                (<Sliderproductcard key={product.id} product={product} />)
            )}
        </Carousel>
    </div>
  )
}

export default ProductSlider