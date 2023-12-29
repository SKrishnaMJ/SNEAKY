import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import PgFOF from "./Components/PgFOF";
import Cart from "./Components/Cart";
import UserProfile from "./Components/UserProfile";
import Addproduct from "./Components/Addproduct";
import Allproductpage from "./Components/Some-Product-Components/Allproductpage";
import Specificproductpage from "./Components/Some-Product-Components/Specificproductpage";
import Proceed from "./Components/Proceed";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/sellproduct" element={<Addproduct />} />
        <Route
          exact
          path="/product-type/vintageshoes"
          element={<Allproductpage type={"VINTAGESHOES"} />}
        />
        <Route
          exact
          path="/product-type/lifestyleshoes"
          element={<Allproductpage type={"LIFESTYLESHOES"} />}
        />
        <Route
          exact
          path="/product-type/runningshoes"
          element={<Allproductpage type={"RUNNINGSHOES"} />}
        />
        <Route
          exact
          path="/product-type/basketballshoes"
          element={<Allproductpage type={"BASKETBALLSHOES"} />}
        />

        <Route path="/product/:type/:id/" element={<Specificproductpage />}/>
        <Route path="/products/:type/:id/" element={<Specificproductpage />}/>
        <Route path="/Proceed" element={<Proceed />}/>

        <Route exact path="/cartdata" element={<Cart />} />


        <Route exact path="*" element={<PgFOF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
