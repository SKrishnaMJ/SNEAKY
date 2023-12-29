import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../FirebaseConfigs/firebaseConfig";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  addoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "./UserProfile.css";
import "./Addproduct.css";

const Addproduct = () => {
  const [producttitle, setProductTitle] = useState("");
  const [producttype, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [customersupport, setCustomerSupport] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productimage, setProductImage] = useState("");
  const[keyspecs, setKeyspec] = useState("");

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

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
  // if (loggeduser) { console.log(loggeduser[0].email);}

  const handleAddProduct = (e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `product-images${producttype.toUpperCase()}/${Date.now()}`
    );
    //console.log(storageRef._location.path);
    uploadBytes(storageRef, productimage).then(() => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, `products-${producttype.toUpperCase()}`), {
          producttitle,
          producttype,
          description,
          brand,
          customersupport,
          price,
          warranty,
          productimage: url,
          keyspecs:keyspecs
        });
      });
    });
  };
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError("please select a valid Image file type(png or jpg");
      }
    } else {
      setImageError("please select your file");
    }
  };

  return (
    <div>
      <Navbar />
      {loggeduser && loggeduser[0].email == "surajkireland@gmail.com" ? (
        <div className="addprod-container">
          <form className="addprod-form" onSubmit={handleAddProduct}>
            <p>Add Data</p>
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}
            <label>Product Title </label>
            <input
              type="text"
              onChange={(e) => {
                setProductTitle(e.target.value);
              }}
              placeholder="Product Title"
            />
            <label>Product Type </label>
            <input
              type="text"
              onChange={(e) => {
                setProductType(e.target.value);
              }}
              placeholder="Product Type"
            />
            <label>Brand </label>
            <input
              type="text"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              placeholder="Brand(Nike.. etc)"
            />
            <label>warranty </label>
            <input
              type="text"
              onChange={(e) => {
                setWarranty(e.target.value);
              }}
              placeholder="Product Warranty"
            />
            <label>Image </label>
            <input onChange={handleProductImg} type="file" />
            {imageError && (
              <>
                <div className="error-msg">{imageError} </div>
              </>
            )}
            <label>Key Specifications</label>
            <textarea onChange = {(e) => setKeyspec(e.target.value)} placeholder="Enter Specifications of shoe"></textarea>
            
            <label>Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product in brief"
            ></textarea>

            <label>Price Without Tax</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Enter Price Without Tax"
            />

            <label>Customer Support</label>
            <input
              onChange={(e) => setCustomerSupport(e.target.value)}
              type="text"
              placeholder="Customer Support Email;, Phone or address"
            />

            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>You are not authorized to sell!</div>
      )}
    </div>
  );
};

export default Addproduct;
