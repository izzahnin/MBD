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
    const response = await axios.get("http://localhost:5000/products");
    setProduct(response.data);
  };
  return (
    <>
      {products.map((product, index) => (
        <div className={Styles.item_card} key={product.id}>
          <img className={Styles.images} src={product.url} alt="item produk"/>
          <h2>{product.productName}</h2>
          <h4>IDR {product.price}</h4>
          <button className={Styles.btn_buy} >Buy</button>
        </div>
      ))}
    </>
  );
}
