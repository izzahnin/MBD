import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import Styles from "./styles/Card.module.css";

export default function MediaCard() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3000/produk");
    setProduct(response.data);
  };
  return (
    <>
      {products.map((produk, index) => (
        <div className={Styles.item_card} key={produk.id}>
          <img className={Styles.images} src={produk.url} alt="item produk"/>
          <h2>{produk.title}</h2>
          <h4>IDR {produk.price}</h4>
          <button className={Styles.btn_buy} >Buy</button>
        </div>
      ))}
    </>
  );
}
