import React from "react";
import "../App.css";
import Styles from "./styles/HeroSection.module.css";

function HeroSection() {
  return (
    <div className={Styles.hero_container}>
      
      <div className={Styles.hero_text}>
        <h6>A House of Authentic Fragnance</h6>
        <h1>
          Smell is a word <br /> Perfume is literature
        </h1>
        <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
        <button type="button" className={Styles.btn_buy_now}>
          Buy Now
        </button>
      </div>
      <div className={Styles.blank}></div>
      {/* <div className='hero-btns'> */}
      {/* <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
          GET STARTED
        </Button>
        <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      {/* </div> */}
    </div>
  );
}

export default HeroSection;
