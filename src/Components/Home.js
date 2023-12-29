import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import Products from "./Products.js";
import Banner from "./Banner.js";
import { auth, db } from "../FirebaseConfigs/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProductSlider from "./Some-Product-Components/ProductSlider.js";
import './Home.css'


const Home = () => {
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
  if (loggeduser) {
    console.log(loggeduser);
  }

  return (
    <div>
      <Navbar />
      <div className="welcome">
        <p>Welcome to SNEAKY</p>
      </div>
      <div className="slider-head"><p>Limited Time Deals</p></div>
      <ProductSlider type={'LIFESTYLESHOES'}/>
      <ProductSlider type={'VINTAGESHOES'}/>
      <ProductSlider type={'RUNNINGSHOES'}/>
      <ProductSlider type={'BASKETBALLSHOES'}/>
    </div>
  );
};

export default Home;
