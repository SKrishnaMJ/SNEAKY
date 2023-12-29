import React from 'react'
import Navbar
 from './Navbar'
import { Button } from 'react-bootstrap'
import './Procced.css'
import { Link } from 'react-router-dom'

const Proceed = () => {
  return (


    <div>
      <Navbar/>
        <p>PAYMENT PAGE</p>
        <div className='container'>
          <form action="">
            <div className='row'>

              <div className='col'>
                <h3 className='title'>Billing address</h3>
                
                <div className='inputBox'>
                  <span>Full Name :</span>
                  <input type = "text" placeholder='Frank Lampard'></input>
                </div>

                <div className='inputBox'>
                  <span>Email :</span>
                  <input type = "email" placeholder='Franklampard@gmail.com'></input>
                </div>

                <div className='inputBox'>
                  <span>address :</span>
                  <input type = "text" placeholder='Apt - street- Locailty'></input>
                </div>

                <div className='inputBox'>
                  <span>City:</span>
                  <input type = "text" placeholder='Arlington'></input>
                </div>

                <div className='flex'>
                  <div className='inputBox'>
                    <span>State :</span>
                    <input type = "text" placeholder='Texas'></input>
                  </div>
                  <div className='inputBox'>
                  <span>Zip code:</span>
                  <input type = "text" placeholder='92610'></input>
                </div>
                </div>



              </div>

              <div className='col'>
                <h3 className='title'>Payment </h3>

                <div className='inputBox'>
                  <span>Cards Accepted  :</span>
                  <img src="Components/assets/card_img.png"  alt ="Visa/MasterCard"/>
                </div>
                
                <div className='inputBox'>
                  <span>Name on Card :</span>
                  <input type = "text" placeholder='Mr. Frank Lampard'></input>
                </div>


                <div className='inputBox'>
                  <span>credit card number  :</span>
                  <input type = "number" placeholder='12445-222-3333-44'></input>
                </div>

                <div className='inputBox'>
                  <span>exp month </span>
                  <input type = "text" placeholder='September'></input>
                </div>

                <div className='flex'>
                  <div className='inputBox'>
                    <span>exp Year :</span>
                    <input type = "number" placeholder='2023'></input>
                  </div>
                  <div className='inputBox'>
                  <span>cvv:</span>
                  <input type = "text" placeholder='926'></input>
                </div>
                </div>
              </div>
            </div>
            <Link to='/checkout'>
              <button>Proceed to Checkout</button>
            </Link>
          </form>
          
        </div>
        
        </div>
  )
}

export default Proceed