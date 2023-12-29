import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import slide1 from "./assets/bannerimages/slide1.webp";
import slide2 from "./assets/bannerimages/Slide3.jpeg";
import slide3 from "./assets/bannerimages/Slide4.jpeg";
import slide4 from "./assets/bannerimages/jordan1.png";
import slide5 from "./assets/bannerimages/spring1.jpeg";
import slide6 from "./assets/bannerimages/Wallpaper.png";
import slide7 from "./assets/bannerimages/Sneaker1.png";
import slide8 from "./assets/bannerimages/Sneaker2.png";

const Banner = () => {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide8}
          max
          width="450px"
          padding="20px"
          display="grid"
          margin="auto"
          alt={slide1}
        />
        <Carousel.Caption>
          <h5>Sneakers for Sale</h5>
          <p>Jordan!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide4} alt={slide2} />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide5} alt={slide3} />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
