import React from 'react'
import "../App.css";
import ProductList from '../components/ProductList';
import Styles from "../components/styles/global.module.css";
import Card from "../components/Card";

function Products() {
  return (
    <>
    <h1 className="products">All Products</h1>
    <div className={Styles.card_row}>
        <Card />
      </div>
    <ProductList/>1
    {/* <AddProducts/> */}
    </>
  )
}

export default Products;