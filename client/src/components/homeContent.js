import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "holderjs";
import "./homeContent.css"
const mainStyle = {
  height: "100vh",
  width: "100%",
};
const carouselCaption = {
  paddingBottom: '100px'
}
function HomeContent() {
  return (
    <Carousel style={mainStyle}>
      <Carousel.Item style={mainStyle}>
        <img
          className="d-block w-100"
          src="holder.js/100px100p?text=Śledzenie Przesyłek&bg=373940"
          alt="Śledzenie Przesyłek"
        />
        <Carousel.Caption style={carouselCaption}>
          <h3>Śledzenie przesyłek wielu firm kurierskich w jednym miejscu</h3>
          <p>Funkcjonalność dostępna od ręki</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={mainStyle}>
        <img
          className="d-block w-100"
          src="holder.js/100px100p?text=Zapisywanie Przesyłek&bg=373940"
          alt="Second slide"
        />

        <Carousel.Caption style={carouselCaption}>
          <h3>Zapomnij o szukaniu długich numerów przesyłek</h3>
          <p>Funkcjonalność tylko dla zalogowanych</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={mainStyle}>
        <img
          className="d-block w-100"
          src="holder.js/100px100p?text=Statystyki&bg=373940"
          alt="Third slide"
        />

        <Carousel.Caption style={carouselCaption}>
          <h3>Statystyki twoje i globalne punktualności usług</h3>
          <p>
            Funkcjonalność tylko dla zalogowanych.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeContent;
